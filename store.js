// 여러 폰이 같은 방을 보도록 Firebase Realtime Database 에 방을 저장한다.
// 빌드 도구가 없어서 Firebase SDK 는 gstatic CDN 의 모듈 파일을 바로 불러온다.
//
// 데이터 구조 (rooms/{방 코드})
//   v          구조 버전 (지금 1)
//   createdAt  만든 시각 (서버 시간)
//   host       방을 만든 사람의 id
//   stage      지금 정하는 것: "menu" (5단계에서 "place" 식당 투표가 붙는다)
//   members/{id}         { name, joinedAt, online }
//   polls/{종류}          종류 = "menu" (나중에 "place")
//     mode               "roulette" | "vote"
//     items/{후보 id}     { name, emoji, by, at }   (식당이면 주소 같은 칸을 더 넣으면 된다)
//     votes/{사람 id}/{후보 id} = true
//     result             { how, items:[{id,name,emoji}], pick, turn, by, at, spin }
//                        how = "roulette" | "vote"  /  items = 그때의 후보 목록(모든 폰이 같은 룰렛을 그린다)
//                        pick = 뽑힌 칸 번호 / turn = 0~1 사이 값(바늘이 칸 안 어디에 멈출지) / spin = 돌린 번호
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getDatabase, connectDatabaseEmulator, ref, child, get, set, update, remove, push,
  onValue, onDisconnect, runTransaction, serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const cfg = window.APP_CONFIG || {};
const app = initializeApp(cfg.FIREBASE);
const db = getDatabase(app);
if (cfg.FIREBASE_EMULATOR) {
  const [host, port] = cfg.FIREBASE_EMULATOR.split(":");
  connectDatabaseEmulator(db, host, Number(port));
}

const ROOM_TTL = 12 * 60 * 60 * 1000;   // 12시간이 지난 방은 없는 방으로 보고, 코드를 다시 쓴다
const MAX_ITEMS = 30;

const roomRef = (code) => ref(db, "rooms/" + code);
const pollRef = (code, poll) => ref(db, "rooms/" + code + "/polls/" + poll);

// 이 폰을 구분하는 id. 로그인 없이 브라우저에 저장해 둔다 (7단계에서 익명 로그인으로 바꿀 수 있다)
function makeId() {
  const a = new Uint8Array(9);
  crypto.getRandomValues(a);
  return Array.from(a, (b) => b.toString(36).padStart(2, "0")).join("").slice(0, 14);
}
let myId = null;
try { myId = localStorage.getItem("uid"); } catch (e) { /* 저장이 막힌 브라우저 */ }
if (!myId) {
  myId = makeId();
  try { localStorage.setItem("uid", myId); } catch (e) { /* 이번 방문 동안만 쓴다 */ }
}

function fresh(room) {
  return room && typeof room.createdAt === "number" && Date.now() - room.createdAt < ROOM_TTL;
}

function randomCode() {
  return String(1000 + Math.floor(Math.random() * 9000));
}

let presenceOff = null;

// 접속이 끊기면 online 이 false 가 되고, 다시 이어지면 true 로 돌아온다
function trackPresence(code) {
  stopPresence();
  const me = ref(db, "rooms/" + code + "/members/" + myId + "/online");
  presenceOff = onValue(ref(db, ".info/connected"), (snap) => {
    if (snap.val() !== true) return;
    onDisconnect(me).set(false).then(() => set(me, true)).catch(() => {});
  });
}

function stopPresence() {
  if (presenceOff) presenceOff();
  presenceOff = null;
}

async function addMember(code, name) {
  await update(ref(db, "rooms/" + code + "/members/" + myId), {
    name, online: true, joinedAt: serverTimestamp(),
  });
  trackPresence(code);
}

export const Store = {
  get me() { return myId; },

  // 새 방을 만들고 코드를 돌려준다. 쓰는 중인 코드면 다른 코드를 고른다.
  async createRoom(name) {
    for (let tries = 0; tries < 12; tries++) {
      const code = randomCode();
      const res = await runTransaction(roomRef(code), (cur) => {
        if (cur && fresh(cur)) return;   // 누가 쓰는 중: 그만두고 다른 코드
        return {
          v: 1,
          createdAt: Date.now(),
          host: myId,
          stage: "menu",
          polls: { menu: { mode: "roulette" } },
        };
      }, { applyLocally: false });
      if (res.committed) {
        // 위에서는 기기 시간을 넣었다. 서버 시간으로 고쳐서 폰마다 시계가 달라도 같게 한다
        await set(child(roomRef(code), "createdAt"), serverTimestamp());
        await addMember(code, name);
        return code;
      }
    }
    throw new Error("방 코드를 만들지 못했어요");
  },

  // 있는 방에 들어간다. 없거나 오래된 방이면 false
  async joinRoom(code, name) {
    const snap = await get(child(roomRef(code), "createdAt"));
    if (!fresh({ createdAt: snap.val() })) return false;
    await addMember(code, name);
    return true;
  },

  async leaveRoom(code) {
    stopPresence();
    const me = ref(db, "rooms/" + code + "/members/" + myId);
    await onDisconnect(child(me, "online")).cancel().catch(() => {});
    await remove(me);
    await remove(ref(db, "rooms/" + code + "/polls/menu/votes/" + myId));
  },

  async rename(code, name) {
    await set(ref(db, "rooms/" + code + "/members/" + myId + "/name"), name);
  },

  // 방 전체를 지켜본다. 바뀔 때마다 cb(방 데이터 또는 null). 그만 볼 때는 돌려준 함수를 부른다
  watchRoom(code, cb) {
    return onValue(roomRef(code), (snap) => cb(snap.val()), () => cb(null));
  },

  async addItem(code, poll, item) {
    const items = (await get(child(pollRef(code, poll), "items"))).val() || {};
    const key = item.name.replace(/\s+/g, "");
    if (Object.values(items).some((it) => it.name.replace(/\s+/g, "") === key)) return "dup";
    if (Object.keys(items).length >= MAX_ITEMS) return "full";
    await set(push(child(pollRef(code, poll), "items")), {
      name: item.name, emoji: item.emoji || "🍽️", by: myId, at: serverTimestamp(),
    });
    return "ok";
  },

  // 후보를 지우면 그 후보에 넣은 표도 같이 지운다
  async removeItem(code, poll, id, votes) {
    const changes = { ["items/" + id]: null };
    Object.keys(votes || {}).forEach((uid) => {
      if (votes[uid] && votes[uid][id]) changes["votes/" + uid + "/" + id] = null;
    });
    await update(pollRef(code, poll), changes);
  },

  async vote(code, poll, id, on) {
    await set(ref(db, "rooms/" + code + "/polls/" + poll + "/votes/" + myId + "/" + id), on ? true : null);
  },

  async setMode(code, poll, mode) {
    await set(child(pollRef(code, poll), "mode"), mode);
  },

  // 결과를 정해서 모든 폰에 알린다. items 는 그때의 후보 목록 그대로
  async setResult(code, poll, how, items) {
    const result = {
      how,
      items: items.map((it) => ({ id: it.id, name: it.name, emoji: it.emoji || "🍽️" })),
      pick: Math.floor(Math.random() * items.length),
      turn: Math.random(),
      spin: makeId(),
      by: myId,
      at: serverTimestamp(),
    };
    await set(child(pollRef(code, poll), "result"), result);
  },

  // 다시 하기: 결과와 표를 지우고 후보는 남긴다
  async reset(code, poll) {
    await update(pollRef(code, poll), { result: null, votes: null });
  },
};

// 같이 정하기: 방 코드로 여러 폰이 모여 후보 메뉴를 넣고, 룰렛이나 투표로 정한다.
// 서버(store.js)를 못 불러와도 앱의 다른 화면은 그대로 쓸 수 있게 따로 불러온다.
const POLL = "menu";   // 5단계에서 식당 투표("place")를 붙일 때 같은 화면 흐름을 다시 쓴다
const SPIN_MS = 4600;
const WHEEL_COLORS = ["#F9A27A", "#D5B6F5", "#9EC3F5", "#F6A9D9", "#A8E89A", "#FFE45E"];
const NICK_A = ["배고픈", "출출한", "신난", "졸린", "용감한", "느긋한", "씩씩한", "궁금한"];
const NICK_B = ["판다", "고양이", "강아지", "토끼", "펭귄", "다람쥐", "곰", "여우"];
const REDUCE = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const $ = (id) => document.getElementById(id);
const toast = (m) => (window.App ? window.App.toast(m) : console.log(m));

function el(tag, cls, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text !== undefined) e.textContent = text;
  return e;
}

function load(key) {
  try { return localStorage.getItem(key); } catch (e) { return null; }
}
function save(key, value) {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch (e) { /* 저장이 막혀 있어도 계속한다 */ }
}

let Store = null;
const g = {
  code: null,
  room: null,
  unwatch: null,
  lastSpin: null,     // 마지막으로 본 룰렛 번호 (새 번호가 오면 돌린다)
  spinning: false,
  settleTimer: null,
  wheelKey: "",
  wheelRot: 0,
  busy: false,
};

// ---------- 화면 ----------
function show(which) {
  $("g-status").hidden = which !== "status";
  $("g-lobby").hidden = which !== "lobby";
  $("g-room").hidden = which !== "room";
}

function status(text) {
  $("g-status").textContent = text;
  show("status");
}

function nick() {
  const input = $("g-nick");
  let name = input.value.trim().slice(0, 10);
  if (!name) {
    name = NICK_A[Math.floor(Math.random() * NICK_A.length)] + " " + NICK_B[Math.floor(Math.random() * NICK_B.length)];
    input.value = name;
  }
  save("nick", name);
  return name;
}

function menuEmoji(name) {
  const m = MENUS.find((x) => x.name === name);
  return m ? m.emoji : "🍽️";
}

function menuTone(name, i, n) {
  const m = MENUS.find((x) => x.name === name);
  if (m && CATEGORY_TONE[m.category]) return CATEGORY_TONE[m.category];
  let c = WHEEL_COLORS[i % WHEEL_COLORS.length];
  // 마지막 칸과 첫 칸이 같은 색이 되지 않게 한다
  if (n > 1 && i === n - 1 && i % WHEEL_COLORS.length === 0) c = WHEEL_COLORS[2];
  return c;
}

// ---------- 방 들어가기 / 나가기 ----------
async function enter(code) {
  g.code = code;
  g.room = null;
  g.lastSpin = null;
  g.wheelKey = "";
  save("room", code);
  $("g-room-code").textContent = code;
  if (g.unwatch) g.unwatch();
  let first = true;
  g.unwatch = Store.watchRoom(code, (room) => {
    if (g.code !== code) return;
    if (!room) {
      toast("방이 없어졌어요");
      exit();
      return;
    }
    g.room = room;
    render(first);
    first = false;
  });
  show("room");
}

function exit() {
  if (g.unwatch) g.unwatch();
  g.unwatch = null;
  g.code = null;
  g.room = null;
  clearTimeout(g.settleTimer);
  g.spinning = false;
  save("room", null);
  show("lobby");
}

async function guarded(fn) {
  if (g.busy) return;
  g.busy = true;
  try {
    await fn();
  } catch (e) {
    console.error(e);
    toast("연결이 불안정해요. 잠시 뒤 다시 해 주세요");
  } finally {
    g.busy = false;
  }
}

function createRoom() {
  guarded(async () => {
    const name = nick();
    $("g-create").disabled = true;
    try {
      const code = await Store.createRoom(name);
      await enter(code);
    } finally {
      $("g-create").disabled = false;
    }
  });
}

function joinRoom(e) {
  if (e) e.preventDefault();
  const code = $("g-code").value.replace(/\D/g, "");
  if (code.length !== 4) {
    toast("방 코드 4자리를 넣어 주세요");
    $("g-code").focus();
    return;
  }
  guarded(async () => {
    const ok = await Store.joinRoom(code, nick());
    if (!ok) {
      toast("그 코드의 방이 없어요. 코드를 다시 확인해 주세요");
      return;
    }
    $("g-code").value = "";
    await enter(code);
  });
}

function leaveRoom() {
  const code = g.code;
  exit();
  if (code) Store.leaveRoom(code).catch(() => {});
}

async function invite() {
  const url = location.origin + location.pathname + "?room=" + g.code;
  const text = "같이 메뉴 정해요! 방 코드 " + g.code + " (오늘 뭐 먹지?)";
  if (navigator.share) {
    try {
      await navigator.share({ text, url });
      return;
    } catch (e) {
      if (e && e.name === "AbortError") return;
    }
  }
  try {
    await navigator.clipboard.writeText(text + " " + url);
    toast("초대 링크를 복사했어요. 친구에게 붙여넣어 보내세요");
  } catch (e) {
    toast("방 코드 " + g.code + " 를 친구에게 알려 주세요");
  }
}

// ---------- 방 데이터 읽기 ----------
function poll() {
  return (g.room.polls && g.room.polls[POLL]) || {};
}

function members() {
  const all = g.room.members || {};
  return Object.keys(all)
    .filter((id) => all[id] && all[id].name)
    .map((id) => Object.assign({ id }, all[id]))
    .sort((a, b) => (a.joinedAt || 0) - (b.joinedAt || 0));
}

function nameOf(id) {
  const m = g.room.members && g.room.members[id];
  return m && m.name ? m.name : "나간 사람";
}

function items() {
  const all = poll().items || {};
  return Object.keys(all)
    .map((id) => Object.assign({ id }, all[id]))
    .sort((a, b) => (a.at || 0) - (b.at || 0));
}

function tally(list) {
  const votes = poll().votes || {};
  return list.map((it) => {
    const voters = Object.keys(votes).filter((uid) => votes[uid] && votes[uid][it.id]);
    return Object.assign({}, it, { voters, count: voters.length });
  });
}

// ---------- 그리기 ----------
function render(first) {
  const p = poll();
  const list = items();
  const mode = p.mode === "vote" ? "vote" : "roulette";
  const result = p.result || null;

  renderMembers();
  renderItems(list);

  document.querySelectorAll("#g-modes .dim-tab").forEach((b) => {
    b.setAttribute("aria-pressed", String(b.dataset.mode === mode));
    b.disabled = !!result;
  });

  // 결과가 있으면 그때의 후보로 룰렛을 보여 준다 (투표가 동점이어도 룰렛으로 정한다)
  const wheelItems = result ? result.items || [] : list;
  const showWheel = result ? wheelItems.length > 1 : mode === "roulette";
  $("g-roulette").hidden = !showWheel;
  $("g-tie").hidden = !(result && result.how === "vote" && wheelItems.length > 1);
  $("g-spin").hidden = !!result;
  $("g-spin").disabled = list.length < 2;
  $("g-spin").textContent = list.length < 2 ? "후보가 2개 이상이면 돌릴 수 있어요" : "룰렛 돌리기";
  if (showWheel && !g.spinning) drawWheel(wheelItems);

  $("g-vote").hidden = mode !== "vote";
  $("g-close-vote").hidden = !!result;
  if (mode === "vote") renderRanking(list, !!result);

  if (!result) {
    g.lastSpin = null;
    clearTimeout(g.settleTimer);
    g.spinning = false;
    $("g-result").hidden = true;
    return;
  }
  if (result.spin === g.lastSpin) return;
  g.lastSpin = result.spin;
  // 방에 막 들어왔을 때 이미 정해져 있으면 돌리지 않고 바로 보여 준다
  if (first || wheelItems.length < 2 || REDUCE) {
    if (wheelItems.length > 1) spinTo(result, false);
    showResult(result);
  } else {
    spinTo(result, true);
  }
}

function renderMembers() {
  const box = $("g-members");
  box.innerHTML = "";
  members().forEach((m) => {
    const c = el("span", "g-member" + (m.online === false ? " off" : "") + (m.id === Store.me ? " me" : ""));
    c.textContent = (m.id === g.room.host ? "👑 " : "") + m.name + (m.id === Store.me ? " (나)" : "");
    if (m.online === false) c.title = "잠시 나갔어요";
    box.appendChild(c);
  });
}

function renderItems(list) {
  const box = $("g-items");
  box.innerHTML = "";
  $("g-count").textContent = list.length ? list.length + "개" : "";
  $("g-items-empty").hidden = list.length > 0;
  const locked = !!poll().result;
  list.forEach((it) => {
    const row = el("div", "g-item");
    row.style.setProperty("--tone", menuTone(it.name, 0, 1));
    row.append(el("span", "g-item-emoji", it.emoji || "🍽️"));
    const text = el("span", "g-item-text");
    text.append(el("strong", "", it.name), el("small", "", nameOf(it.by)));
    row.append(text);
    if (!locked && (it.by === Store.me || g.room.host === Store.me)) {
      const x = el("button", "g-item-del", "✕");
      x.type = "button";
      x.setAttribute("aria-label", it.name + " 빼기");
      x.addEventListener("click", () => {
        Store.removeItem(g.code, POLL, it.id, poll().votes).catch(() => toast("빼지 못했어요"));
      });
      row.append(x);
    }
    box.appendChild(row);
  });
}

function renderRanking(list, locked) {
  const box = $("g-ranking");
  box.innerHTML = "";
  const rows = tally(list).sort((a, b) => b.count - a.count || (a.at || 0) - (b.at || 0));
  const max = Math.max(1, ...rows.map((r) => r.count));
  const top = rows.length && rows[0].count > 0 ? rows[0].count : -1;
  rows.forEach((r) => {
    const mine = r.voters.includes(Store.me);
    const b = el("button", "g-rank" + (mine ? " mine" : "") + (r.count === top ? " top" : ""));
    b.type = "button";
    b.disabled = locked;
    b.setAttribute("aria-pressed", String(mine));
    b.style.setProperty("--w", (r.count / max) * 100 + "%");
    b.style.setProperty("--tone", menuTone(r.name, 0, 1));
    const head = el("span", "g-rank-head");
    head.append(el("span", "g-rank-name", (r.emoji || "🍽️") + " " + r.name), el("span", "g-rank-count", (mine ? "👍 " : "") + r.count + "표"));
    b.append(el("span", "g-rank-bar"), head);
    if (r.voters.length) b.append(el("span", "g-rank-who", r.voters.map(nameOf).join(", ")));
    b.addEventListener("click", () => {
      Store.vote(g.code, POLL, r.id, !mine).catch(() => toast("표를 넣지 못했어요"));
    });
    box.appendChild(b);
  });
  if (!rows.length) box.appendChild(el("p", "g-hint", "후보를 넣으면 여기서 투표할 수 있어요."));
}

// ---------- 룰렛 ----------
const SVGNS = "http://www.w3.org/2000/svg";

function svg(tag, attrs) {
  const e = document.createElementNS(SVGNS, tag);
  Object.keys(attrs).forEach((k) => e.setAttribute(k, attrs[k]));
  return e;
}

function short(name, n) {
  const max = n > 10 ? 4 : n > 6 ? 5 : 7;
  return name.length > max ? name.slice(0, max - 1) + "…" : name;
}

function drawWheel(list) {
  const key = list.map((it) => it.id + ":" + it.name).join("|");
  if (key === g.wheelKey) return;
  g.wheelKey = key;
  const wheel = $("g-wheel");
  wheel.innerHTML = "";
  const n = list.length;
  if (n === 0) {
    wheel.appendChild(svg("circle", { cx: 0, cy: 0, r: 96, class: "wheel-empty" }));
    const t = svg("text", { x: 0, y: 4, "text-anchor": "middle", class: "wheel-empty-text" });
    t.textContent = "후보를 넣어 주세요";
    wheel.appendChild(t);
    return;
  }
  const R = 96;
  const step = 360 / n;
  list.forEach((it, i) => {
    const color = menuTone(it.name, i, n);
    if (n === 1) {
      wheel.appendChild(svg("circle", { cx: 0, cy: 0, r: R, fill: color }));
    } else {
      // 위쪽(12시)에서 시계 방향으로 칸을 그린다
      const a0 = ((i * step - 90) * Math.PI) / 180;
      const a1 = (((i + 1) * step - 90) * Math.PI) / 180;
      const d = "M0 0 L" + R * Math.cos(a0) + " " + R * Math.sin(a0) +
        " A" + R + " " + R + " 0 " + (step > 180 ? 1 : 0) + " 1 " + R * Math.cos(a1) + " " + R * Math.sin(a1) + " Z";
      wheel.appendChild(svg("path", { d, fill: color, class: "wheel-slice" }));
    }
    const mid = i * step + step / 2;
    // 왼쪽 절반의 글자는 뒤집히지 않게 반대로 돌린다
    const left = mid > 180;
    const gText = svg("g", { transform: "rotate(" + (left ? mid + 90 : mid - 90) + ")" });
    const size = n > 12 ? 7 : n > 8 ? 8.5 : 10;
    const label = svg("text", { x: left ? -88 : 88, y: size * 0.35, "text-anchor": left ? "start" : "end", class: "wheel-label", "font-size": size });
    label.textContent = left ? (it.emoji || "") + " " + short(it.name, n) : short(it.name, n) + " " + (it.emoji || "");
    gText.appendChild(label);
    wheel.appendChild(gText);
  });
  wheel.appendChild(svg("circle", { cx: 0, cy: 0, r: 15, class: "wheel-hub" }));
}

// result.pick 칸이 위쪽 바늘에 오도록 돌린다. 모든 폰이 같은 값으로 계산해서 같은 곳에 멈춘다
function spinTo(result, animate) {
  const n = result.items.length;
  const step = 360 / n;
  const inSlice = 0.15 + 0.7 * (result.turn || 0.5);
  const target = 360 - (result.pick + inSlice) * step;
  const wheel = $("g-wheel");
  g.wheelKey = "";
  drawWheel(result.items);
  $("g-result").hidden = true;
  if (!animate) {
    wheel.style.transition = "none";
    g.wheelRot = target;
    wheel.style.transform = "rotate(" + target + "deg)";
    return;
  }
  // 지금 각도에서 시작해 6바퀴 이상 돌고 멈춘다
  const start = g.wheelRot % 360;
  wheel.style.transition = "none";
  wheel.style.transform = "rotate(" + start + "deg)";
  void wheel.getBoundingClientRect();
  g.wheelRot = start + 360 * 6 + ((target - start) % 360 + 360) % 360;
  wheel.style.transition = "transform " + SPIN_MS + "ms cubic-bezier(0.15, 0.7, 0.1, 1)";
  wheel.style.transform = "rotate(" + g.wheelRot + "deg)";
  g.spinning = true;
  $("g-roulette").scrollIntoView({ behavior: "smooth", block: "center" });
  clearTimeout(g.settleTimer);
  g.settleTimer = setTimeout(() => {
    g.spinning = false;
    showResult(result);
  }, SPIN_MS + 150);
}

function showResult(result) {
  const it = result.items[result.pick] || result.items[0];
  if (!it) return;
  $("g-r-emoji").textContent = it.emoji || "🍽️";
  $("g-r-name").textContent = it.name;
  const who = nameOf(result.by);
  $("g-r-by").textContent = result.how !== "vote" ? who + " 님이 룰렛을 돌렸어요"
    : result.items.length > 1 ? "동점이라 룰렛으로 정했어요 (" + who + " 님이 마감)"
    : "투표 1등이에요 (" + who + " 님이 마감)";
  const box = $("g-result");
  box.style.setProperty("--tone", menuTone(it.name, 0, 1));
  box.hidden = false;
  if (!REDUCE) {
    box.animate(
      [{ transform: "scale(0.8)", opacity: 0 }, { transform: "scale(1.04)", opacity: 1, offset: 0.7 }, { transform: "none" }],
      { duration: 500, easing: "ease-out" }
    );
  }
  box.scrollIntoView({ behavior: REDUCE ? "auto" : "smooth", block: "center" });
}

// ---------- 버튼 ----------
function addItem(name, emoji) {
  name = name.trim().slice(0, 20);
  if (!name || !g.code) return;
  if (poll().result) {
    toast("다시 정하기를 누르면 후보를 더 넣을 수 있어요");
    return;
  }
  guarded(async () => {
    const res = await Store.addItem(g.code, POLL, { name, emoji: emoji || menuEmoji(name) });
    if (res === "dup") toast("이미 있는 메뉴예요");
    else if (res === "full") toast("후보는 30개까지 넣을 수 있어요");
    else $("g-add").value = "";
  });
}

function addRandom() {
  const have = new Set(items().map((it) => it.name));
  const pool = MENUS.filter((m) => !have.has(m.name));
  if (!pool.length) return;
  const m = pool[Math.floor(Math.random() * pool.length)];
  addItem(m.name, m.emoji);
}

function spin() {
  if (g.spinning || poll().result) return;
  const list = items();
  if (list.length < 2) {
    toast("후보를 2개 이상 넣어 주세요");
    return;
  }
  guarded(() => Store.setResult(g.code, POLL, "roulette", list));
}

function closeVote() {
  if (poll().result) return;
  const rows = tally(items());
  const top = Math.max(0, ...rows.map((r) => r.count));
  if (top === 0) {
    toast("아직 아무도 투표하지 않았어요");
    return;
  }
  const winners = rows.filter((r) => r.count === top);
  guarded(() => Store.setResult(g.code, POLL, "vote", winners));
}

function setMode(mode) {
  if (!g.code || poll().result) return;
  Store.setMode(g.code, POLL, mode).catch(() => toast("바꾸지 못했어요"));
}

function again() {
  if (g.spinning) return;
  guarded(() => Store.reset(g.code, POLL));
}

function findPlaces() {
  const result = poll().result;
  if (!result || !window.App) return;
  const it = result.items[result.pick] || result.items[0];
  window.App.showMenu(it.name, it.emoji);
}

// ---------- 시작 ----------
function bind() {
  $("g-create").addEventListener("click", createRoom);
  $("g-join-form").addEventListener("submit", joinRoom);
  $("g-code").addEventListener("input", (e) => { e.target.value = e.target.value.replace(/\D/g, "").slice(0, 4); });
  $("g-invite").addEventListener("click", invite);
  $("g-leave").addEventListener("click", leaveRoom);
  $("g-add-form").addEventListener("submit", (e) => {
    e.preventDefault();
    addItem($("g-add").value);
  });
  $("g-add-random").addEventListener("click", addRandom);
  $("g-modes").addEventListener("click", (e) => {
    const b = e.target.closest(".dim-tab");
    if (b) setMode(b.dataset.mode);
  });
  $("g-spin").addEventListener("click", spin);
  $("g-close-vote").addEventListener("click", closeVote);
  $("g-r-again").addEventListener("click", again);
  $("g-r-places").addEventListener("click", findPlaces);
  $("g-nick").addEventListener("change", () => save("nick", $("g-nick").value.trim().slice(0, 10)));
}

async function start() {
  $("g-nick").value = load("nick") || "";
  bind();

  // 초대 링크(?room=1234)로 열었으면 같이 정하기 탭으로 바로 간다
  const params = new URLSearchParams(location.search);
  const invited = (params.get("room") || "").replace(/\D/g, "").slice(0, 4);
  if (invited) {
    params.delete("room");
    const rest = params.toString();
    history.replaceState(null, "", location.pathname + (rest ? "?" + rest : "") + location.hash);
    if (window.App) window.App.go("group");
  }

  try {
    ({ Store } = await import("./store.js?v=11"));
  } catch (e) {
    console.error(e);
    status("서버에 연결하지 못했어요. 인터넷 연결을 확인하고 새로고침해 주세요.");
    return;
  }

  const saved = load("room");
  const code = invited || saved;
  if (code && code.length === 4) {
    if (invited && !load("nick") && invited !== saved) {
      // 처음 온 친구: 이름부터 정하고 들어가게 한다
      $("g-code").value = invited;
      show("lobby");
      $("g-nick").focus();
      toast("이름을 정하고 들어가기를 눌러 주세요");
      return;
    }
    status("방에 들어가는 중이에요...");
    try {
      if (await Store.joinRoom(code, nick())) {
        await enter(code);
        return;
      }
      toast(invited ? "그 코드의 방이 없어요" : "전에 있던 방이 끝났어요");
    } catch (e) {
      console.error(e);
      toast("방에 들어가지 못했어요. 다시 해 주세요");
      $("g-code").value = code;
    }
    save("room", null);
  }
  show("lobby");
}

start();

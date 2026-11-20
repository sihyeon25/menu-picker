(function () {
  "use strict";

  // ---------- 상태 (저장하지 않음) ----------
  const state = {
    categories: new Set(),
    people: "any",
    spice: "any",
    excluded: new Set(),
    shown: new Set(),   // 이번 방문에서 이미 보여준 메뉴
    current: null,
    spinning: false,
  };

  const $ = (id) => document.getElementById(id);

  // ---------- 추천 로직 (규칙 기반) ----------
  function matches(menu) {
    if (state.excluded.has(menu.name)) return false;
    if (state.categories.size > 0 && !state.categories.has(menu.category)) return false;
    if (state.people === "solo" && !menu.solo) return false;
    if (state.people === "group" && !menu.group) return false;
    if (state.spice === "mild" && menu.spicy > 1) return false;
    if (state.spice === "hot" && menu.spicy < 2) return false;
    return true;
  }

  function getPool() {
    return MENUS.filter(matches);
  }

  function pickOne(pool) {
    let candidates = pool.filter((m) => !state.shown.has(m.name));
    if (candidates.length === 0) {       // 다 보여줬으면 처음부터 다시
      state.shown.clear();
      candidates = pool;
    }
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  // ---------- 화면 전환 ----------
  function show(screen) {
    $("screen-home").hidden = screen !== "home";
    $("screen-result").hidden = screen !== "result";
    window.scrollTo(0, 0);
  }

  function toast(message) {
    const el = $("toast");
    el.textContent = message;
    el.hidden = false;
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => { el.hidden = true; }, 2200);
  }

  // ---------- 조건 칩 ----------
  function buildCategoryChips() {
    const box = $("chips-category");
    CATEGORIES.forEach((name) => {
      const b = document.createElement("button");
      b.className = "chip";
      b.textContent = name;
      b.setAttribute("aria-pressed", "false");
      b.addEventListener("click", () => {
        if (state.categories.has(name)) state.categories.delete(name);
        else state.categories.add(name);
        const on = state.categories.has(name);
        b.classList.toggle("active", on);
        b.setAttribute("aria-pressed", String(on));
      });
      box.appendChild(b);
    });
  }

  function bindSingleChoice(boxId, key) {
    const box = $(boxId);
    box.addEventListener("click", (e) => {
      const b = e.target.closest(".chip");
      if (!b) return;
      state[key] = b.dataset.value;
      box.querySelectorAll(".chip").forEach((c) => {
        const on = c === b;
        c.classList.toggle("active", on);
        c.setAttribute("aria-pressed", String(on));
      });
    });
  }

  function renderExcluded() {
    const box = $("chips-excluded");
    box.innerHTML = "";
    state.excluded.forEach((name) => {
      const b = document.createElement("button");
      b.className = "chip excluded";
      b.textContent = name;
      b.setAttribute("aria-label", name + " 빼기 취소");
      b.addEventListener("click", () => {
        state.excluded.delete(name);
        renderExcluded();
      });
      box.appendChild(b);
    });
  }

  function addExcluded() {
    const input = $("exclude-input");
    const name = input.value.trim();
    if (!name) return;
    if (!MENUS.some((m) => m.name === name)) {
      toast("목록에 없는 음식이에요. 자동완성에서 골라주세요");
      return;
    }
    state.excluded.add(name);
    input.value = "";
    renderExcluded();
  }

  function resetConditions() {
    state.categories.clear();
    state.people = "any";
    state.spice = "any";
    state.excluded.clear();
    document.querySelectorAll("#chips-category .chip").forEach((c) => {
      c.classList.remove("active");
      c.setAttribute("aria-pressed", "false");
    });
    ["chips-people", "chips-spice"].forEach((id) => {
      document.querySelectorAll("#" + id + " .chip").forEach((c) => {
        const on = c.dataset.value === "any";
        c.classList.toggle("active", on);
        c.setAttribute("aria-pressed", String(on));
      });
    });
    renderExcluded();
  }

  // ---------- 룰렛 (슬롯 방식 연출) ----------
  function spinTo(pool) {
    if (state.spinning) return;
    state.spinning = true;

    const final = pickOne(pool);
    state.shown.add(final.name);
    state.current = final;

    const card = $("result-card");
    card.classList.remove("done");
    card.classList.add("spinning");
    $("result-actions").hidden = true;
    $("result-msg").hidden = true;
    $("result-meta").textContent = "";

    const TICKS = 18;
    let i = 0;
    let last = null;

    function tick() {
      let item;
      if (i >= TICKS) {
        item = final;
      } else {
        do {
          item = MENUS[Math.floor(Math.random() * MENUS.length)];
        } while (item === last);
      }
      last = item;
      $("result-emoji").textContent = item.emoji;
      $("result-name").textContent = item.name;

      if (i >= TICKS) {
        finish(final);
        return;
      }
      i += 1;
      setTimeout(tick, 60 + i * i * 0.6);
    }
    tick();
  }

  function spiceLabel(level) {
    return ["안 매워요", "살짝 매워요", "매워요", "아주 매워요"][level] || "";
  }

  function finish(menu) {
    const card = $("result-card");
    card.classList.remove("spinning");
    card.classList.add("done");
    $("result-meta").textContent = menu.category + " · " + spiceLabel(menu.spicy);

    const q = encodeURIComponent("근처 " + menu.name);
    $("btn-kakao").href = "https://map.kakao.com/link/search/" + q;
    $("btn-naver").href = "https://m.map.naver.com/search2/search.naver?query=" + q;

    $("result-actions").hidden = false;
    state.spinning = false;
  }

  function showNoResult() {
    show("result");
    $("result-card").classList.remove("spinning", "done");
    $("result-emoji").textContent = "🤔";
    $("result-name").textContent = "맞는 메뉴가 없어요";
    $("result-meta").textContent = "";
    $("result-actions").hidden = true;
    const msg = $("result-msg");
    msg.textContent = "조건이 너무 까다로워요. 조건을 조금 줄여서 다시 해보세요!";
    msg.hidden = false;
  }

  function start() {
    const pool = getPool();
    if (pool.length === 0) {
      showNoResult();
      return;
    }
    show("result");
    spinTo(pool);
  }

  // ---------- 공유 ----------
  async function share() {
    if (!state.current) return;
    const m = state.current;
    const text = "오늘 메뉴는 \"" + m.name + "\" " + m.emoji + " ! (오늘 뭐 먹지?)";
    const url = /^https?:/.test(location.href) ? location.href : undefined;

    if (navigator.share) {
      try {
        await navigator.share(url ? { text, url } : { text });
        return;
      } catch (e) {
        if (e && e.name === "AbortError") return;  // 사용자가 취소
      }
    }
    try {
      await navigator.clipboard.writeText(url ? text + " " + url : text);
      toast("복사했어요. 붙여넣어서 보내세요");
    } catch (e) {
      toast("공유에 실패했어요");
    }
  }

  // ---------- 시작 ----------
  function init() {
    buildCategoryChips();
    bindSingleChoice("chips-people", "people");
    bindSingleChoice("chips-spice", "spice");

    const list = $("menu-names");
    MENUS.forEach((m) => {
      const o = document.createElement("option");
      o.value = m.name;
      list.appendChild(o);
    });

    $("btn-exclude-add").addEventListener("click", addExcluded);
    $("exclude-input").addEventListener("keydown", (e) => {
      if (e.key === "Enter") addExcluded();
    });

    $("btn-random").addEventListener("click", () => {
      // 조건 없이 전체에서 뽑기 (화면의 조건은 건드리지 않음)
      const saved = {
        c: new Set(state.categories), p: state.people, s: state.spice, x: new Set(state.excluded),
      };
      state.categories.clear(); state.people = "any"; state.spice = "any"; state.excluded.clear();
      state.lastMode = "random";
      start();
      state.categories = saved.c; state.people = saved.p; state.spice = saved.s; state.excluded = saved.x;
    });

    $("btn-filter").addEventListener("click", () => {
      state.lastMode = "filter";
      start();
    });

    $("btn-again").addEventListener("click", () => {
      if (state.lastMode === "random") {
        spinTo(MENUS);
      } else {
        const pool = getPool();
        if (pool.length === 0) showNoResult();
        else spinTo(pool);
      }
    });

    $("btn-share").addEventListener("click", share);
    $("btn-reset").addEventListener("click", resetConditions);
    $("btn-back").addEventListener("click", () => {
      if (state.spinning) return;
      show("home");
    });
  }

  init();
})();

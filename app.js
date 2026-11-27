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
    again: null,        // "다시 뽑기"를 눌렀을 때 실행할 함수
    returnTo: "home",
    area: "",
    spinning: false,
  };

  const $ = (id) => document.getElementById(id);
  const VIEWS = ["home", "result", "browse", "group"];
  const TABS = ["home", "browse", "group"];
  const REDUCE = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function el(tag, cls, text) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  }

  function toast(message) {
    const t = $("toast");
    t.hidden = true;
    void t.offsetWidth;
    t.textContent = message;
    t.hidden = false;
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => { t.hidden = true; }, 2200);
  }

  // ---------- 화면 전환 ----------
  function playEnter(view) {
    Array.from(view.children).forEach((c, i) => c.style.setProperty("--n", Math.min(i, 10)));
    view.classList.remove("enter");
    void view.offsetWidth;
    view.classList.add("enter");
  }

  function go(view) {
    $("confetti").innerHTML = "";   // 화면이 바뀌면 남은 종이가루를 치운다
    $("share-sheet").hidden = true;
    VIEWS.forEach((v) => { $("view-" + v).hidden = v !== view; });
    const tab = view === "result" ? state.returnTo : view;
    document.querySelectorAll(".dock-item").forEach((b) => {
      const on = b.dataset.view === tab;
      b.classList.toggle("active", on);
      b.setAttribute("aria-current", on ? "page" : "false");
    });
    $("dock").style.setProperty("--i", Math.max(0, TABS.indexOf(tab)));
    window.scrollTo(0, 0);
    if (!REDUCE) playEnter($("view-" + view));
  }

  // ---------- 시작 화면 ----------
  function buildSplash() {
    const box = $("splash-logo");
    let n = 0;
    ["오늘", "뭐 먹지?"].forEach((line, li) => {
      if (li > 0) box.appendChild(document.createElement("br"));
      Array.from(line).forEach((ch) => {
        const s = el("span", ch === " " ? "sp" : "", ch === " " ? " " : ch);
        s.style.setProperty("--i", n++);
        box.appendChild(s);
      });
    });
  }

  function runSplash() {
    const splash = $("splash");
    if (REDUCE) {
      splash.remove();
      return;
    }
    let done = false;
    function leave() {
      if (done) return;
      done = true;
      splash.classList.add("leave");
      playEnter($("view-home"));
      setTimeout(() => splash.remove(), 900);
    }
    splash.addEventListener("click", leave);
    setTimeout(leave, 2500);
  }

  // ---------- 라이트 / 다크 ----------
  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "dark" ? "#0c0c0e" : "#ffffff");
  }

  function toggleTheme() {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(next);
    try { localStorage.setItem("theme", next); } catch (e) { /* 저장이 막혀 있어도 화면은 바뀐다 */ }
  }

  // ---------- 인사말 ----------
  function setGreeting() {
    const now = new Date();
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    $("today").textContent = (now.getMonth() + 1) + "월 " + now.getDate() + "일 " + days[now.getDay()] + "요일";
    const h = now.getHours();
    let text = "야식 생각나는 밤이에요";
    if (h >= 5 && h < 10) text = "좋은 아침이에요";
    else if (h >= 10 && h < 14) text = "점심 먹을 시간이에요";
    else if (h >= 14 && h < 17) text = "출출한 오후예요";
    else if (h >= 17 && h < 21) text = "저녁 먹을 시간이에요";
    $("greet").textContent = text;
  }

  // ---------- 추천 (규칙 기반) ----------
  function matches(menu) {
    if (state.excluded.has(menu.name)) return false;
    if (state.categories.size > 0 && !state.categories.has(menu.category)) return false;
    if (state.people === "solo" && !menu.solo) return false;
    if (state.people === "group" && !menu.group) return false;
    if (state.spice === "mild" && menu.spicy > 1) return false;
    if (state.spice === "hot" && menu.spicy < 2) return false;
    return true;
  }

  function pickOne(pool) {
    let candidates = pool.filter((m) => !state.shown.has(m.name));
    if (candidates.length === 0) {
      state.shown.clear();
      candidates = pool;
    }
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  // ---------- 조건 고르기 ----------
  function buildTiles() {
    const box = $("tiles");
    CATEGORIES.forEach((name) => {
      const b = el("button", "tile");
      b.type = "button";
      b.style.setProperty("--tone", CATEGORY_TONE[name]);
      b.setAttribute("aria-pressed", "false");
      b.append(el("span", "te", CATEGORY_EMOJI[name]), el("span", "", name));
      b.addEventListener("click", () => {
        if (state.categories.has(name)) state.categories.delete(name);
        else state.categories.add(name);
        const on = state.categories.has(name);
        b.classList.toggle("on", on);
        b.setAttribute("aria-pressed", String(on));
      });
      box.appendChild(b);
    });
  }

  // 같은 줄의 버튼은 하나만 켜지고, 다시 누르면 꺼진다 (꺼진 상태 = 상관없음)
  function bindToggle(boxId, key) {
    const box = $(boxId);
    box.addEventListener("click", (e) => {
      const b = e.target.closest(".mchip");
      if (!b) return;
      const wasOn = b.getAttribute("aria-pressed") === "true";
      box.querySelectorAll(".mchip").forEach((c) => c.setAttribute("aria-pressed", "false"));
      if (wasOn) {
        state[key] = "any";
      } else {
        b.setAttribute("aria-pressed", "true");
        state[key] = b.dataset.value;
      }
    });
  }

  function renderExcluded() {
    const box = $("chips-excluded");
    box.innerHTML = "";
    state.excluded.forEach((name) => {
      const b = el("button", "chip excluded", name);
      b.type = "button";
      b.setAttribute("aria-label", name + " 빼기 취소");
      b.addEventListener("click", () => {
        state.excluded.delete(name);
        renderExcluded();
      });
      box.appendChild(b);
    });
    $("exclude-count").textContent = state.excluded.size ? "(" + state.excluded.size + "개)" : "";
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

  function toggleFold() {
    const btn = $("btn-exclude-toggle");
    const open = btn.getAttribute("aria-expanded") !== "true";
    btn.setAttribute("aria-expanded", String(open));
    $("exclude-box").classList.toggle("open", open);
  }

  function resetConditions() {
    state.categories.clear();
    state.people = "any";
    state.spice = "any";
    state.excluded.clear();
    document.querySelectorAll(".tile").forEach((t) => {
      t.classList.remove("on");
      t.setAttribute("aria-pressed", "false");
    });
    document.querySelectorAll(".mchip").forEach((c) => c.setAttribute("aria-pressed", "false"));
    renderExcluded();
  }

  // ---------- 결과 화면 ----------
  function setTone(menu) {
    $("result-card").style.setProperty("--tone", CATEGORY_TONE[menu.category] || "#ffb04a");
  }

  function setVisual(menu, withPhoto) {
    $("r-emoji").textContent = menu.emoji;
    const img = $("r-photo");
    img.hidden = true;
    if (withPhoto && menu.photo) {
      img.onload = () => { img.hidden = false; };
      img.onerror = () => { img.hidden = true; };
      img.alt = menu.name;
      img.src = menu.photo;
    }
  }

  function setTags(menu) {
    const box = $("r-tags");
    box.innerHTML = "";
    box.appendChild(el("span", "tag", menu.category));
    box.appendChild(spiceTag(menu.spicy));
    box.appendChild(el("span", "tag", menu.solo && menu.group ? "🙂👥 혼자도 같이도" : menu.solo ? "🙂 혼자 먹기 좋아요" : "👥 같이 먹기 좋아요"));
  }

  // 맵기를 색과 고추 수로 보여준다 (0=민트, 1=노랑, 2=주황, 3=빨강)
  function spiceTag(level) {
    const t = el("span", "tag tag-spice sp" + level);
    t.textContent = (level > 0 ? "🌶️".repeat(level) + " " : "") + SPICE_LABELS[level];
    return t;
  }

  function spiceBadge(level) {
    const b = el("span", "spice-badge sp" + level, "🌶️".repeat(level));
    b.setAttribute("aria-hidden", "true");
    return b;
  }

  // 결과가 확정될 때 종이가루가 터진다
  function burst(tone) {
    if (REDUCE) return;
    const layer = $("confetti");
    const rect = $("result-card").querySelector(".visual").getBoundingClientRect();
    const ox = rect.left + rect.width / 2;
    const oy = rect.top + rect.height / 2;
    const colors = [tone, "#b89bff", "#8c9eff", "#6fd0ff", "#5be3c1", "#ff68c4", "#ffb04a", "#ffffff"];
    for (let i = 0; i < 40; i++) {
      const p = document.createElement("i");
      const w = 6 + Math.random() * 8;
      p.style.width = w + "px";
      p.style.height = w * (0.5 + Math.random() * 0.9) + "px";
      p.style.left = ox + "px";
      p.style.top = oy + "px";
      p.style.background = colors[i % colors.length];
      layer.appendChild(p);
      const angle = Math.random() * Math.PI * 2;
      const dist = 90 + Math.random() * 190;
      const dx = Math.cos(angle) * dist;
      const dy = Math.sin(angle) * dist - 90;
      const rot = (Math.random() - 0.5) * 900;
      const anim = p.animate(
        [
          { transform: "translate(0,0) rotate(0deg)", opacity: 1 },
          { transform: "translate(" + dx + "px," + dy + "px) rotate(" + rot + "deg)", opacity: 1, offset: 0.5 },
          { transform: "translate(" + dx * 1.15 + "px," + (dy + 280) + "px) rotate(" + rot * 1.6 + "deg)", opacity: 0 },
        ],
        { duration: 1100 + Math.random() * 700, easing: "cubic-bezier(0.2, 0.7, 0.4, 1)" }
      );
      anim.onfinish = () => p.remove();
    }
  }

  function settle(menu) {
    const card = $("result-card");
    card.classList.remove("spinning", "done");
    void card.offsetWidth;
    card.classList.add("done");
    setTone(menu);
    $("r-name").textContent = menu.name;
    setVisual(menu, true);
    setTags(menu);
    $("result-after").hidden = false;
    state.spinning = false;
    burst(CATEGORY_TONE[menu.category]);
  }

  function runSpin(final, pool) {
    state.spinning = true;
    const card = $("result-card");
    card.classList.remove("done");
    card.classList.add("spinning");
    $("result-after").hidden = true;
    $("r-photo").hidden = true;
    $("r-tags").innerHTML = "";

    const flick = pool.length > 1 ? pool : MENUS;
    const TICKS = 18;
    let i = 0;
    let last = null;

    function tick() {
      if (i >= TICKS) {
        settle(final);
        return;
      }
      let item;
      do {
        item = flick[Math.floor(Math.random() * flick.length)];
      } while (item === last);
      last = item;
      const emoji = $("r-emoji");
      emoji.textContent = item.emoji;
      $("r-name").textContent = item.name;
      setTone(item);
      if (!REDUCE) {
        emoji.animate(
          [
            { transform: "translateY(-26px) scale(0.8) rotate(-8deg)", opacity: 0.3 },
            { transform: "none", opacity: 1 },
          ],
          { duration: 110 }
        );
      }
      i += 1;
      setTimeout(tick, 60 + i * i * 0.6);
    }
    tick();
  }

  function clearPlaces() {
    $("place-list").innerHTML = "";
    $("place-links").hidden = true;
    $("area-input").value = state.area;
  }

  function showResult(menu, opts) {
    const o = Object.assign({ spin: false, pool: MENUS, again: null, from: "home" }, opts);
    state.current = menu;
    state.again = o.again;
    state.returnTo = o.from;
    state.shown.add(menu.name);
    go("result");
    $("result-msg").hidden = true;
    $("result-actions").hidden = false;
    $("places").hidden = false;
    $("btn-again").hidden = !o.again;
    clearPlaces();
    if (o.spin) runSpin(menu, o.pool);
    else settle(menu);
  }

  function showEmpty() {
    state.current = null;
    state.returnTo = "home";
    go("result");
    const card = $("result-card");
    card.classList.remove("spinning", "done");
    card.style.setProperty("--tone", "#c9c9d1");
    $("r-emoji").textContent = "🤔";
    $("r-photo").hidden = true;
    $("r-name").textContent = "맞는 메뉴가 없어요";
    $("r-tags").innerHTML = "";
    $("result-after").hidden = false;
    $("result-actions").hidden = true;
    $("places").hidden = true;
    const msg = $("result-msg");
    msg.textContent = "조건이 너무 까다로워요. 조건을 조금 줄여서 다시 해보세요.";
    msg.hidden = false;
  }

  // ---------- 뽑기 ----------
  function drawFrom(pool, from) {
    from = from || "home";
    if (pool.length === 0) {
      showEmpty();
      return;
    }
    const menu = pickOne(pool);
    showResult(menu, {
      spin: true,
      pool,
      from,
      again: () => drawFrom(pool, from),
    });
  }

  function drawRandom() {
    drawFrom(MENUS);
  }

  function drawFiltered() {
    drawFrom(MENUS.filter(matches));
  }

  // ---------- 메뉴 둘러보기 ----------
  const browse = {
    dim: "kind",   // 지금 보고 있는 구분 기준
    q: "",
    sel: { kind: new Set(), form: new Set(), flavor: new Set(), mood: new Set() },
  };

  function browseItems() {
    const q = browse.q;
    return MENUS.filter((m) => {
      if (!menuMatchesFilters(m, browse.sel)) return false;
      if (!q) return true;
      const words = [m.name, m.category, m.form].concat(m.tags, m.flavors, m.moods);
      return words.some((w) => w.includes(q));
    });
  }

  // 기준 탭: 종류 / 형태 / 맛 / 상태 (고른 개수를 배지로 보여준다)
  function renderDims() {
    const box = $("browse-dims");
    box.innerHTML = "";
    FILTER_DIMS.forEach((d) => {
      const b = el("button", "dim-tab", d.label);
      b.type = "button";
      b.setAttribute("aria-pressed", String(browse.dim === d.key));
      const n = browse.sel[d.key].size;
      if (n > 0) b.appendChild(el("span", "dim-badge", String(n)));
      b.addEventListener("click", () => {
        browse.dim = d.key;
        renderDims();
        renderOptions();
      });
      box.appendChild(b);
    });
  }

  // 고른 기준의 세부 칩 (같은 기준 안에서는 여러 개를 골라도 "또는")
  function renderOptions() {
    const row = $("browse-cats");
    row.innerHTML = "";
    const dim = FILTER_DIMS.find((d) => d.key === browse.dim);
    const set = browse.sel[dim.key];
    dim.options.forEach((opt) => {
      const b = el("button", "cat-chip", opt);
      b.type = "button";
      b.setAttribute("aria-pressed", String(set.has(opt)));
      if (dim.key === "kind") b.style.setProperty("--tone", CATEGORY_TONE[opt]);
      if (dim.key === "flavor") b.style.setProperty("--tone", FLAVOR_TONE[opt]);
      b.addEventListener("click", () => {
        if (set.has(opt)) set.delete(opt);
        else set.add(opt);
        b.setAttribute("aria-pressed", String(set.has(opt)));
        renderDims();
        renderBrowse();
      });
      row.appendChild(b);
    });
  }

  // 지금 고른 조건 모아 보기 (누르면 해제)
  function renderSummary() {
    const box = $("browse-summary");
    box.innerHTML = "";
    let total = 0;
    FILTER_DIMS.forEach((d) => {
      browse.sel[d.key].forEach((opt) => {
        total += 1;
        const c = el("button", "sum-chip", opt);
        c.type = "button";
        c.setAttribute("aria-label", d.label + " " + opt + " 조건 해제");
        c.addEventListener("click", () => {
          browse.sel[d.key].delete(opt);
          renderDims();
          renderOptions();
          renderBrowse();
        });
        box.appendChild(c);
      });
    });
    if (total > 0) {
      box.insertBefore(el("span", "summary-label", "고른 조건"), box.firstChild);
      const clear = el("button", "sum-clear", "모두 지우기");
      clear.type = "button";
      clear.addEventListener("click", () => {
        FILTER_DIMS.forEach((d) => browse.sel[d.key].clear());
        renderDims();
        renderOptions();
        renderBrowse();
      });
      box.appendChild(clear);
    }
    box.hidden = total === 0;
  }

  function drawFromBrowse() {
    const pool = browseItems();
    if (pool.length === 0) return;
    state.browseY = window.scrollY;
    drawFrom(pool, "browse");
  }

  function renderBrowse() {
    const grid = $("browse-grid");
    grid.innerHTML = "";
    renderSummary();
    const items = browseItems();
    $("browse-count").textContent = items.length + "개";
    $("btn-browse-draw").disabled = items.length === 0;
    $("browse-empty").hidden = items.length > 0;

    items.forEach((m, i) => {
      const card = el("button", "menu-card");
      card.type = "button";
      card.style.setProperty("--tone", CATEGORY_TONE[m.category]);
      card.style.setProperty("--n", Math.min(i, 12));

      const visual = el("span", "mc-visual");
      visual.appendChild(el("span", "mc-emoji", m.emoji));
      if (m.photo) {
        const img = el("img", "mc-photo");
        img.alt = m.name;
        img.loading = "lazy";
        img.src = m.photo;
        img.onerror = () => img.remove();
        visual.appendChild(img);
      }
      if (m.spicy > 0) visual.appendChild(spiceBadge(m.spicy));
      card.append(visual, el("span", "mc-name", m.name), el("span", "mc-meta", m.category + " · " + SPICE_LABELS[m.spicy]));
      card.addEventListener("click", () => {
        state.browseY = window.scrollY;
        showResult(m, { spin: false, from: "browse" });
      });
      grid.appendChild(card);
    });
  }

  function buildBrowse() {
    renderDims();
    renderOptions();
    $("browse-search").addEventListener("input", (e) => {
      browse.q = e.target.value.trim();
      renderBrowse();
    });
    $("btn-browse-draw").addEventListener("click", drawFromBrowse);
    renderBrowse();
  }

  // ---------- 근처 식당 ----------
  function showLinks(area, menuName) {
    const links = Places.mapLinks(area, menuName);
    $("link-kakao").href = links.kakao;
    $("link-naver").href = links.naver;
    $("place-links").hidden = false;
  }

  function renderPlaces(items) {
    const list = $("place-list");
    list.innerHTML = "";
    items.forEach((p) => {
      const a = el("a", "place");
      a.href = p.url;
      a.target = "_blank";
      a.rel = "noopener";
      const head = el("div");
      head.append(el("span", "place-name", p.name), el("span", "place-cat", p.category));
      a.append(head, el("div", "place-addr", p.address));
      list.appendChild(a);
    });
  }

  async function searchPlaces(e) {
    e.preventDefault();
    const menu = state.current;
    if (!menu) return;
    const area = $("area-input").value.trim();
    if (!area) {
      toast("동네 이름을 입력해 주세요");
      $("area-input").focus();
      return;
    }
    state.area = area;
    const list = $("place-list");
    list.innerHTML = "";

    if (!Places.enabled()) {
      list.appendChild(el("p", "place-hint", "지도 앱에서 \"" + area + " " + menu.name + "\" 검색 결과를 볼 수 있어요."));
      showLinks(area, menu.name);
      return;
    }

    list.appendChild(el("p", "place-hint", "찾는 중이에요..."));
    try {
      const items = await Places.search(area, menu.name);
      if (state.current !== menu) return;
      list.innerHTML = "";
      if (items.length === 0) {
        list.appendChild(el("p", "place-hint", "결과가 없어요. 동네 이름을 바꾸거나 더 넓게 입력해 보세요. (예: 강남구)"));
      } else {
        renderPlaces(items);
      }
      showLinks(area, menu.name);
    } catch (err) {
      if (state.current !== menu) return;
      list.innerHTML = "";
      list.appendChild(el("p", "place-hint", "식당 목록을 불러오지 못했어요. 지도 앱에서 대신 찾아볼 수 있어요."));
      showLinks(area, menu.name);
    }
  }

  // ---------- 카드 이미지 공유 ----------
  let cardBlob = null;
  let cardUrl = null;
  let lastFocus = null;

  function closeShare() {
    $("share-sheet").hidden = true;
    if (lastFocus) lastFocus.focus();
  }

  async function openShare() {
    const m = state.current;
    if (!m) return;
    lastFocus = document.activeElement;
    try {
      cardBlob = await Card.make(m);
    } catch (e) {
      cardBlob = null;
    }
    if (!cardBlob) {
      shareText();   // 이미지를 못 만들면 글자로 공유한다
      return;
    }
    if (cardUrl) URL.revokeObjectURL(cardUrl);
    cardUrl = URL.createObjectURL(cardBlob);
    $("share-img").src = cardUrl;
    $("share-sheet").hidden = false;
    $("btn-share-send").focus();
  }

  function shareMessage(m) {
    const url = /^https?:/.test(location.href) ? location.href : "";
    return "오늘 메뉴는 \"" + m.name + "\" " + m.emoji + " ! (오늘 뭐 먹지?)" + (url ? " " + url : "");
  }

  async function sendCard() {
    const m = state.current;
    if (!m || !cardBlob) return;
    // 파일 이름은 영문으로 한다 (한글 이름은 일부 폰·앱이 "지원하지 않는 형식"으로 거부한다)
    const file = new File([cardBlob], "menu-card.png", { type: "image/png" });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      // 글을 같이 보내면 거부하는 앱이 있어서, 안 되면 이미지만 다시 시도한다
      const attempts = [{ files: [file], text: shareMessage(m) }, { files: [file] }];
      for (const data of attempts) {
        try {
          await navigator.share(data);
          return;
        } catch (e) {
          if (e && e.name === "AbortError") return;
        }
      }
    }
    // 이미지 공유를 쓸 수 없을 때(주로 PC): 이미지를 저장하고 글은 복사한다
    const saved = saveCard();
    let copied = false;
    try {
      await navigator.clipboard.writeText(shareMessage(m));
      copied = true;
    } catch (e) { /* 복사가 막혀 있어도 계속한다 */ }
    toast(saved
      ? (copied ? "이미지를 저장하고 글을 복사했어요" : "이미지를 저장했어요")
      : "저장이 안 돼요. 카드를 길게 눌러 저장하세요");
  }

  // 이미지를 파일로 내려받는다. 못 하면 false (카카오톡 같은 앱 안 브라우저 등)
  function saveCard() {
    const m = state.current;
    if (!m || !cardUrl) return false;
    try {
      const a = document.createElement("a");
      a.href = cardUrl;
      a.download = "menu-card.png";
      document.body.appendChild(a);
      a.click();
      a.remove();
      return !/KAKAOTALK|NAVER\(inapp|Instagram|FBAN|FBAV|Line\//i.test(navigator.userAgent);
    } catch (e) {
      return false;
    }
  }

  // ---------- 글로 공유 (이미지를 못 쓸 때) ----------
  async function shareText() {
    const m = state.current;
    if (!m) return;
    const text = "오늘 메뉴는 \"" + m.name + "\" " + m.emoji + " ! (오늘 뭐 먹지?)";
    const url = /^https?:/.test(location.href) ? location.href : undefined;
    if (navigator.share) {
      try {
        await navigator.share(url ? { text, url } : { text });
        return;
      } catch (e) {
        if (e && e.name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(url ? text + " " + url : text);
      toast("복사했어요. 붙여넣어서 보내세요");
    } catch (e) {
      toast("공유하지 못했어요");
    }
  }

  // ---------- 시작 ----------
  function init() {
    applyTheme(document.documentElement.dataset.theme || "light");
    $("btn-theme").addEventListener("click", toggleTheme);
    buildSplash();
    setGreeting();
    buildTiles();
    buildBrowse();
    bindToggle("chips-people", "people");
    bindToggle("chips-spice", "spice");

    const list = $("menu-names");
    MENUS.forEach((m) => {
      const o = document.createElement("option");
      o.value = m.name;
      list.appendChild(o);
    });

    $("btn-exclude-toggle").addEventListener("click", toggleFold);
    $("btn-exclude-add").addEventListener("click", addExcluded);
    $("exclude-input").addEventListener("keydown", (e) => {
      if (e.key === "Enter") addExcluded();
    });

    $("btn-random").addEventListener("click", drawRandom);
    $("btn-filter").addEventListener("click", drawFiltered);
    $("btn-reset").addEventListener("click", resetConditions);
    $("btn-again").addEventListener("click", () => { if (state.again && !state.spinning) state.again(); });
    $("btn-share").addEventListener("click", openShare);
    $("btn-share-send").addEventListener("click", sendCard);
    $("btn-share-save").addEventListener("click", () => {
      toast(saveCard() ? "이미지를 저장했어요" : "저장이 안 돼요. 카드를 길게 눌러 저장하세요");
    });
    $("btn-share-close").addEventListener("click", closeShare);
    $("share-sheet").addEventListener("click", (e) => {
      if (e.target === $("share-sheet")) closeShare();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !$("share-sheet").hidden) closeShare();
    });
    $("place-form").addEventListener("submit", searchPlaces);
    $("btn-back").addEventListener("click", () => {
      if (state.spinning) return;
      const back = state.returnTo;
      go(back);
      // 둘러보던 자리로 돌아간다
      if (back === "browse") window.scrollTo(0, state.browseY || 0);
    });

    document.querySelectorAll(".dock-item").forEach((b) => {
      b.addEventListener("click", () => {
        if (state.spinning) return;
        go(b.dataset.view);
      });
    });

    runSplash();
  }

  init();
})();

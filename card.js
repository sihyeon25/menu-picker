// 결과를 공유용 이미지(PNG)로 그린다. 서버 없이 브라우저 캔버스만 쓴다.
const Card = (function () {
  const W = 1080;
  const H = 1350;
  const FONT = 'Pretendard, "Malgun Gothic", "Apple SD Gothic Neo", sans-serif';
  const EMOJI = '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif';
  const SPICE_COLOR = ["#A8E89A", "#FFE45E", "#F9A27A", "#F2776B"];
  const INK = "#2B2118";
  const MUTED = "#766757";
  const SOFT = "#FFF0E2";

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  // 앱의 8장짜리 꽃 모양 (index.html 의 #flower 와 같은 비율)
  function flower(ctx, cx, cy, size, rotation, fill) {
    const s = size / 100;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rotation);
    ctx.fillStyle = fill;
    for (let i = 0; i < 8; i++) {
      ctx.save();
      ctx.rotate((i * Math.PI) / 4);
      ctx.beginPath();
      ctx.ellipse(0, -31 * s, 13 * s, 19 * s, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    ctx.beginPath();
    ctx.arc(0, 0, 16 * s, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function tagList(menu) {
    const who = menu.solo && menu.group ? "🙂👥 혼자도 같이도" : menu.solo ? "🙂 혼자 먹기 좋아요" : "👥 같이 먹기 좋아요";
    const spice = (menu.spicy > 0 ? "🌶️".repeat(menu.spicy) + " " : "") + SPICE_LABELS[menu.spicy];
    return [
      { text: menu.category, bg: SOFT, fg: INK },
      { text: spice, bg: SPICE_COLOR[menu.spicy], fg: INK },
      { text: who, bg: SOFT, fg: INK },
    ];
  }

  async function make(menu) {
    try {
      await document.fonts.load("800 90px Pretendard");
      await document.fonts.load("700 36px Pretendard");
    } catch (e) {
      /* 글꼴을 못 불러와도 기본 글꼴로 그린다 */
    }

    const tone = CATEGORY_TONE[menu.category] || "#F9A27A";
    const c = document.createElement("canvas");
    c.width = W;
    c.height = H;
    const ctx = c.getContext("2d");
    ctx.textBaseline = "alphabetic";

    // 바탕: 종류 색
    ctx.fillStyle = tone;
    ctx.fillRect(0, 0, W, H);

    // 큰 꽃 두 송이 (반투명 흰색)
    flower(ctx, W * 0.5, 470, 1150, 0.2, "rgba(255,255,255,0.28)");
    flower(ctx, W * 0.95, 90, 380, 0.5, "rgba(255,255,255,0.22)");

    // 이모지
    ctx.textAlign = "center";
    ctx.shadowColor = "rgba(0,0,0,0.14)";
    ctx.shadowOffsetY = 18;
    ctx.shadowBlur = 0;
    ctx.font = "330px " + EMOJI;
    ctx.fillStyle = INK;
    ctx.fillText(menu.emoji, W / 2, 560);
    ctx.shadowColor = "transparent";
    ctx.shadowOffsetY = 0;

    // 아래 흰 카드
    const px = 60, pw = W - 120, py = 680, ph = 580;
    roundRect(ctx, px, py, pw, ph, 64);
    ctx.fillStyle = "#FFFAF4";
    ctx.fill();

    // 메뉴 이름 (길면 글자 크기를 줄인다)
    let size = 150;
    ctx.textAlign = "left";
    ctx.font = "800 " + size + "px " + FONT;
    while (ctx.measureText(menu.name).width > pw - 110 && size > 70) {
      size -= 6;
      ctx.font = "800 " + size + "px " + FONT;
    }
    ctx.fillStyle = INK;
    ctx.fillText(menu.name, px + 55, py + 185);

    // 태그 (줄이 넘치면 아래로 내린다)
    ctx.font = "700 34px " + FONT;
    let tx = px + 55;
    let ty = py + 260;
    tagList(menu).forEach((t) => {
      const tw = ctx.measureText(t.text).width + 44;
      if (tx + tw > px + pw - 40) {
        tx = px + 55;
        ty += 80;
      }
      roundRect(ctx, tx, ty, tw, 62, 31);
      ctx.fillStyle = t.bg;
      ctx.fill();
      ctx.fillStyle = t.fg;
      ctx.fillText(t.text, tx + 22, ty + 43);
      tx += tw + 12;
    });

    // 하단 앱 이름
    ctx.textAlign = "left";
    ctx.fillStyle = MUTED;
    ctx.font = "800 40px " + FONT;
    ctx.fillText("오늘 뭐 먹지?", px + 55, py + ph - 70);
    if (/^https?:/.test(location.href)) {
      ctx.textAlign = "right";
      ctx.font = "600 30px " + FONT;
      ctx.fillText(location.host + location.pathname.replace(/index\.html$/, ""), px + pw - 55, py + ph - 72);
    }

    return new Promise((resolve) => c.toBlob(resolve, "image/png"));
  }

  return { make };
})();

// 메뉴 데이터 (직접 만든 목록). 필드:
// name: 이름 / emoji: 이모지 / category: 종류(한식·중식…) / spicy: 맵기 0~3
// form: 형태(밥·면·빵·고기·기타) / flavors: 맛(느끼한·달콤한·담백한·새콤한)
// moods: 상태(해장·든든·가볍게·기운 나는·스트레스 풀기)
// solo: 혼자 먹기 좋음 / group: 같이 먹기 좋음 / tags: 검색용 단어
// "매운 / 안 매운" 맛은 spicy 숫자에서 계산한다.
const MENUS = [
  // 한식
  { name: "김치찌개", emoji: "🍲", category: "한식", spicy: 2, form: "밥", flavors: [], moods: ["해장", "든든"], solo: true, group: true, tags: ["국물", "밥"] },
  { name: "된장찌개", emoji: "🥘", category: "한식", spicy: 0, form: "밥", flavors: ["담백한"], moods: ["든든"], solo: true, group: true, tags: ["국물", "밥"] },
  { name: "순두부찌개", emoji: "🍲", category: "한식", spicy: 2, form: "밥", flavors: ["담백한"], moods: ["해장", "든든"], solo: true, group: true, tags: ["국물", "밥"] },
  { name: "부대찌개", emoji: "🍲", category: "한식", spicy: 2, form: "밥", flavors: ["느끼한"], moods: ["든든", "스트레스 풀기"], solo: false, group: true, tags: ["국물", "든든"] },
  { name: "감자탕", emoji: "🍖", category: "한식", spicy: 2, form: "고기", flavors: ["느끼한"], moods: ["해장", "든든"], solo: false, group: true, tags: ["국물", "든든"] },
  { name: "갈비탕", emoji: "🍜", category: "한식", spicy: 0, form: "밥", flavors: ["담백한"], moods: ["기운 나는", "해장"], solo: true, group: true, tags: ["국물", "보양"] },
  { name: "삼계탕", emoji: "🐔", category: "한식", spicy: 0, form: "밥", flavors: ["담백한"], moods: ["기운 나는"], solo: true, group: true, tags: ["국물", "보양"] },
  { name: "비빔밥", emoji: "🍚", category: "한식", spicy: 1, form: "밥", flavors: ["담백한"], moods: ["가볍게"], solo: true, group: true, tags: ["밥"] },
  { name: "제육볶음", emoji: "🥓", category: "한식", spicy: 2, form: "고기", flavors: ["달콤한", "느끼한"], moods: ["든든", "스트레스 풀기"], solo: true, group: true, tags: ["밥", "든든"] },
  { name: "불고기", emoji: "🥩", category: "한식", spicy: 0, form: "고기", flavors: ["달콤한"], moods: ["든든"], solo: true, group: true, tags: ["밥"] },
  { name: "삼겹살", emoji: "🥓", category: "한식", spicy: 0, form: "고기", flavors: ["느끼한"], moods: ["든든", "스트레스 풀기"], solo: false, group: true, tags: ["고기", "회식"] },
  { name: "보쌈", emoji: "🍖", category: "한식", spicy: 0, form: "고기", flavors: ["느끼한"], moods: ["든든"], solo: false, group: true, tags: ["고기"] },
  { name: "닭갈비", emoji: "🍗", category: "한식", spicy: 2, form: "고기", flavors: ["달콤한"], moods: ["스트레스 풀기", "든든"], solo: false, group: true, tags: ["고기", "매콤"] },
  { name: "냉면", emoji: "🍜", category: "한식", spicy: 1, form: "면", flavors: ["새콤한", "담백한"], moods: ["가볍게", "해장"], solo: true, group: true, tags: ["면", "시원"] },
  { name: "칼국수", emoji: "🍜", category: "한식", spicy: 0, form: "면", flavors: ["담백한"], moods: ["해장", "든든"], solo: true, group: true, tags: ["면", "국물"] },

  // 중식
  { name: "짜장면", emoji: "🍜", category: "중식", spicy: 0, form: "면", flavors: ["달콤한", "느끼한"], moods: ["든든"], solo: true, group: true, tags: ["면"] },
  { name: "짬뽕", emoji: "🍜", category: "중식", spicy: 2, form: "면", flavors: [], moods: ["해장", "스트레스 풀기"], solo: true, group: true, tags: ["면", "국물"] },
  { name: "볶음밥", emoji: "🍚", category: "중식", spicy: 0, form: "밥", flavors: ["느끼한"], moods: ["든든"], solo: true, group: true, tags: ["밥"] },
  { name: "탕수육", emoji: "🍤", category: "중식", spicy: 0, form: "고기", flavors: ["달콤한", "새콤한", "느끼한"], moods: ["든든"], solo: false, group: true, tags: ["튀김"] },
  { name: "마라탕", emoji: "🌶️", category: "중식", spicy: 3, form: "면", flavors: ["느끼한"], moods: ["스트레스 풀기"], solo: true, group: true, tags: ["국물", "매콤"] },
  { name: "마파두부덮밥", emoji: "🍛", category: "중식", spicy: 2, form: "밥", flavors: [], moods: ["든든"], solo: true, group: false, tags: ["밥"] },

  // 일식
  { name: "초밥", emoji: "🍣", category: "일식", spicy: 0, form: "밥", flavors: ["담백한"], moods: ["가볍게"], solo: true, group: true, tags: ["생선"] },
  { name: "돈카츠", emoji: "🍱", category: "일식", spicy: 0, form: "고기", flavors: ["느끼한"], moods: ["든든"], solo: true, group: true, tags: ["튀김"] },
  { name: "라멘", emoji: "🍜", category: "일식", spicy: 1, form: "면", flavors: ["느끼한"], moods: ["든든", "해장"], solo: true, group: false, tags: ["면", "국물"] },
  { name: "우동", emoji: "🍜", category: "일식", spicy: 0, form: "면", flavors: ["담백한"], moods: ["해장", "가볍게"], solo: true, group: true, tags: ["면", "국물"] },
  { name: "규동", emoji: "🍚", category: "일식", spicy: 0, form: "밥", flavors: ["달콤한"], moods: ["든든"], solo: true, group: false, tags: ["밥"] },
  { name: "연어덮밥", emoji: "🍣", category: "일식", spicy: 0, form: "밥", flavors: ["담백한"], moods: ["가볍게"], solo: true, group: false, tags: ["밥", "생선"] },

  // 양식
  { name: "파스타", emoji: "🍝", category: "양식", spicy: 0, form: "면", flavors: ["느끼한"], moods: ["든든"], solo: true, group: true, tags: ["면"] },
  { name: "피자", emoji: "🍕", category: "양식", spicy: 0, form: "빵", flavors: ["느끼한"], moods: ["스트레스 풀기", "든든"], solo: false, group: true, tags: ["나눠먹기"] },
  { name: "햄버거", emoji: "🍔", category: "양식", spicy: 0, form: "빵", flavors: ["느끼한"], moods: ["든든"], solo: true, group: true, tags: ["간단"] },
  { name: "샌드위치", emoji: "🥪", category: "양식", spicy: 0, form: "빵", flavors: ["담백한"], moods: ["가볍게"], solo: true, group: false, tags: ["간단"] },
  { name: "베이글", emoji: "🥯", category: "양식", spicy: 0, form: "빵", flavors: ["담백한", "달콤한"], moods: ["가볍게"], solo: true, group: false, tags: ["간단", "브런치"] },
  { name: "스테이크", emoji: "🥩", category: "양식", spicy: 0, form: "고기", flavors: ["느끼한"], moods: ["든든", "기운 나는"], solo: false, group: true, tags: ["고기"] },
  { name: "리조또", emoji: "🍚", category: "양식", spicy: 0, form: "밥", flavors: ["느끼한"], moods: ["든든"], solo: true, group: true, tags: ["밥"] },
  { name: "샐러드", emoji: "🥗", category: "양식", spicy: 0, form: "기타", flavors: ["담백한", "새콤한"], moods: ["가볍게"], solo: true, group: false, tags: ["가벼움"] },

  // 분식
  { name: "떡볶이", emoji: "🌶️", category: "분식", spicy: 2, form: "기타", flavors: ["달콤한"], moods: ["스트레스 풀기"], solo: true, group: true, tags: ["매콤"] },
  { name: "김밥", emoji: "🍙", category: "분식", spicy: 0, form: "밥", flavors: ["담백한"], moods: ["가볍게"], solo: true, group: false, tags: ["간단"] },
  { name: "라면", emoji: "🍜", category: "분식", spicy: 2, form: "면", flavors: [], moods: ["해장"], solo: true, group: false, tags: ["면", "국물"] },
  { name: "순대", emoji: "🌭", category: "분식", spicy: 0, form: "기타", flavors: ["담백한"], moods: ["가볍게"], solo: true, group: true, tags: ["간식"] },
  { name: "쫄면", emoji: "🍝", category: "분식", spicy: 2, form: "면", flavors: ["새콤한", "달콤한"], moods: ["스트레스 풀기"], solo: true, group: false, tags: ["면", "매콤"] },
  { name: "토스트", emoji: "🍞", category: "분식", spicy: 0, form: "빵", flavors: ["달콤한"], moods: ["가볍게"], solo: true, group: false, tags: ["간단", "간식"] },
  { name: "핫도그", emoji: "🌭", category: "분식", spicy: 0, form: "빵", flavors: ["달콤한", "느끼한"], moods: ["가볍게"], solo: true, group: true, tags: ["간식"] },

  // 아시안
  { name: "쌀국수", emoji: "🍜", category: "아시안", spicy: 0, form: "면", flavors: ["담백한"], moods: ["해장", "가볍게"], solo: true, group: true, tags: ["면", "국물"] },
  { name: "팟타이", emoji: "🍝", category: "아시안", spicy: 1, form: "면", flavors: ["달콤한", "새콤한"], moods: ["든든"], solo: true, group: true, tags: ["면"] },
  { name: "카레", emoji: "🍛", category: "아시안", spicy: 1, form: "밥", flavors: ["느끼한"], moods: ["든든"], solo: true, group: true, tags: ["밥"] },
  { name: "반미", emoji: "🥖", category: "아시안", spicy: 0, form: "빵", flavors: ["담백한", "새콤한"], moods: ["가볍게"], solo: true, group: false, tags: ["간단"] },
];

const CATEGORIES = ["한식", "중식", "일식", "양식", "분식", "아시안"];
const SPICE_LABELS = ["안 매워요", "살짝 매워요", "매워요", "아주 매워요"];

// 앱의 색: 쿨톤(보라·남색·하늘·민트)이 중심이고, 주황과 분홍은 포인트로만 쓴다.
const CATEGORY_TONE = {
  한식: "#ffb04a",
  중식: "#b89bff",
  일식: "#6fd0ff",
  양식: "#ff68c4",
  분식: "#5be3c1",
  아시안: "#8c9eff",
};

// 맛 구분의 색: 보는 순간 알 수 있게 맛과 어울리는 색을 쓴다.
const FLAVOR_TONE = {
  "매운": "#ff5a5a",
  "안 매운": "#5be3c1",
  "느끼한": "#ffd65a",
  "달콤한": "#ff68c4",
  "담백한": "#6fd0ff",
  "새콤한": "#b6e35b",
};

// 종류 타일에 쓰는 대표 이모지
const CATEGORY_EMOJI = {
  한식: "🍚",
  중식: "🥟",
  일식: "🍣",
  양식: "🍝",
  분식: "🍢",
  아시안: "🍜",
};

// 찾아볼 때 고를 수 있는 구분 기준. 같은 기준 안에서는 "또는", 기준끼리는 "그리고"(교집합)로 묶는다.
const FILTER_DIMS = [
  { key: "kind", label: "종류", options: CATEGORIES },
  { key: "form", label: "형태", options: ["밥", "면", "빵", "고기", "기타"] },
  { key: "flavor", label: "맛", options: ["매운", "안 매운", "느끼한", "달콤한", "담백한", "새콤한"] },
  { key: "mood", label: "상태", options: ["해장", "든든", "가볍게", "기운 나는", "스트레스 풀기"] },
];

function menuHasOption(menu, key, option) {
  switch (key) {
    case "kind": return menu.category === option;
    case "form": return menu.form === option;
    case "mood": return menu.moods.includes(option);
    case "flavor":
      if (option === "매운") return menu.spicy >= 2;
      if (option === "안 매운") return menu.spicy <= 1;
      return menu.flavors.includes(option);
    default: return false;
  }
}

// selected: { kind: Set, form: Set, flavor: Set, mood: Set }
function menuMatchesFilters(menu, selected) {
  return FILTER_DIMS.every((d) => {
    const set = selected[d.key];
    if (!set || set.size === 0) return true;
    return Array.from(set).some((opt) => menuHasOption(menu, d.key, opt));
  });
}

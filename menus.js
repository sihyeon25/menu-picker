// 메뉴 데이터 (직접 만든 목록). 필드:
// name: 이름 / emoji: 이모지 / category: 종류 / spicy: 맵기 0~3
// solo: 혼자 먹기 좋음 / group: 같이 먹기 좋음 / tags: 참고용 태그
const MENUS = [
  // 한식
  { name: "김치찌개", emoji: "🍲", category: "한식", spicy: 2, solo: true, group: true, tags: ["국물", "밥"] },
  { name: "된장찌개", emoji: "🥘", category: "한식", spicy: 0, solo: true, group: true, tags: ["국물", "밥"] },
  { name: "순두부찌개", emoji: "🍲", category: "한식", spicy: 2, solo: true, group: true, tags: ["국물", "밥"] },
  { name: "부대찌개", emoji: "🍲", category: "한식", spicy: 2, solo: false, group: true, tags: ["국물", "든든"] },
  { name: "감자탕", emoji: "🍖", category: "한식", spicy: 2, solo: false, group: true, tags: ["국물", "든든"] },
  { name: "갈비탕", emoji: "🍜", category: "한식", spicy: 0, solo: true, group: true, tags: ["국물", "보양"] },
  { name: "삼계탕", emoji: "🐔", category: "한식", spicy: 0, solo: true, group: true, tags: ["국물", "보양"] },
  { name: "비빔밥", emoji: "🍚", category: "한식", spicy: 1, solo: true, group: true, tags: ["밥"] },
  { name: "제육볶음", emoji: "🥓", category: "한식", spicy: 2, solo: true, group: true, tags: ["밥", "든든"] },
  { name: "불고기", emoji: "🥩", category: "한식", spicy: 0, solo: true, group: true, tags: ["밥"] },
  { name: "삼겹살", emoji: "🥓", category: "한식", spicy: 0, solo: false, group: true, tags: ["고기", "회식"] },
  { name: "보쌈", emoji: "🍖", category: "한식", spicy: 0, solo: false, group: true, tags: ["고기"] },
  { name: "닭갈비", emoji: "🍗", category: "한식", spicy: 2, solo: false, group: true, tags: ["고기", "매콤"] },
  { name: "냉면", emoji: "🍜", category: "한식", spicy: 1, solo: true, group: true, tags: ["면", "시원"] },
  { name: "칼국수", emoji: "🍜", category: "한식", spicy: 0, solo: true, group: true, tags: ["면", "국물"] },

  // 중식
  { name: "짜장면", emoji: "🍜", category: "중식", spicy: 0, solo: true, group: true, tags: ["면"] },
  { name: "짬뽕", emoji: "🍜", category: "중식", spicy: 2, solo: true, group: true, tags: ["면", "국물"] },
  { name: "볶음밥", emoji: "🍚", category: "중식", spicy: 0, solo: true, group: true, tags: ["밥"] },
  { name: "탕수육", emoji: "🍤", category: "중식", spicy: 0, solo: false, group: true, tags: ["튀김"] },
  { name: "마라탕", emoji: "🌶️", category: "중식", spicy: 3, solo: true, group: true, tags: ["국물", "매콤"] },
  { name: "마파두부덮밥", emoji: "🍛", category: "중식", spicy: 2, solo: true, group: false, tags: ["밥"] },

  // 일식
  { name: "초밥", emoji: "🍣", category: "일식", spicy: 0, solo: true, group: true, tags: ["생선"] },
  { name: "돈카츠", emoji: "🍱", category: "일식", spicy: 0, solo: true, group: true, tags: ["튀김"] },
  { name: "라멘", emoji: "🍜", category: "일식", spicy: 1, solo: true, group: false, tags: ["면", "국물"] },
  { name: "우동", emoji: "🍜", category: "일식", spicy: 0, solo: true, group: true, tags: ["면", "국물"] },
  { name: "규동", emoji: "🍚", category: "일식", spicy: 0, solo: true, group: false, tags: ["밥"] },
  { name: "연어덮밥", emoji: "🍣", category: "일식", spicy: 0, solo: true, group: false, tags: ["밥", "생선"] },

  // 양식
  { name: "파스타", emoji: "🍝", category: "양식", spicy: 0, solo: true, group: true, tags: ["면"] },
  { name: "피자", emoji: "🍕", category: "양식", spicy: 0, solo: false, group: true, tags: ["나눠먹기"] },
  { name: "햄버거", emoji: "🍔", category: "양식", spicy: 0, solo: true, group: true, tags: ["간단"] },
  { name: "스테이크", emoji: "🥩", category: "양식", spicy: 0, solo: false, group: true, tags: ["고기"] },
  { name: "리조또", emoji: "🍚", category: "양식", spicy: 0, solo: true, group: true, tags: ["밥"] },
  { name: "샐러드", emoji: "🥗", category: "양식", spicy: 0, solo: true, group: false, tags: ["가벼움"] },

  // 분식
  { name: "떡볶이", emoji: "🌶️", category: "분식", spicy: 2, solo: true, group: true, tags: ["매콤"] },
  { name: "김밥", emoji: "🍙", category: "분식", spicy: 0, solo: true, group: false, tags: ["간단"] },
  { name: "라면", emoji: "🍜", category: "분식", spicy: 2, solo: true, group: false, tags: ["면", "국물"] },
  { name: "순대", emoji: "🌭", category: "분식", spicy: 0, solo: true, group: true, tags: ["간식"] },
  { name: "쫄면", emoji: "🍝", category: "분식", spicy: 2, solo: true, group: false, tags: ["면", "매콤"] },

  // 아시안
  { name: "쌀국수", emoji: "🍜", category: "아시안", spicy: 0, solo: true, group: true, tags: ["면", "국물"] },
  { name: "팟타이", emoji: "🍝", category: "아시안", spicy: 1, solo: true, group: true, tags: ["면"] },
  { name: "카레", emoji: "🍛", category: "아시안", spicy: 1, solo: true, group: true, tags: ["밥"] },
  { name: "반미", emoji: "🥖", category: "아시안", spicy: 0, solo: true, group: false, tags: ["간단"] },
];

const CATEGORIES = ["한식", "중식", "일식", "양식", "분식", "아시안"];

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
  { name: "나시고랭", emoji: "🍛", category: "아시안", spicy: 1, form: "밥", flavors: ["달콤한"], moods: ["든든"], solo: true, group: true, tags: ["밥"] },
  { name: "미고랭", emoji: "🍜", category: "아시안", spicy: 2, form: "면", flavors: ["달콤한"], moods: ["든든"], solo: true, group: true, tags: ["면"] },
  { name: "똠얌꿍", emoji: "🍲", category: "아시안", spicy: 2, form: "기타", flavors: ["새콤한"], moods: ["해장", "가볍게"], solo: true, group: true, tags: ["국물", "해산물"] },
  { name: "월남쌈", emoji: "🥬", category: "아시안", spicy: 0, form: "기타", flavors: ["새콤한", "담백한"], moods: ["가볍게"], solo: true, group: true, tags: ["채소", "건강"] },
  { name: "분짜", emoji: "🍜", category: "아시안", spicy: 0, form: "면", flavors: ["새콤한", "달콤한"], moods: ["가볍게"], solo: true, group: true, tags: ["면"] },
  { name: "커리와 난", emoji: "🍛", category: "아시안", spicy: 1, form: "빵", flavors: ["느끼한"], moods: ["든든"], solo: true, group: true, tags: ["커리"] },
  { name: "탄두리치킨", emoji: "🍗", category: "아시안", spicy: 1, form: "고기", flavors: ["담백한"], moods: ["든든", "기운 나는"], solo: false, group: true, tags: ["고기"] },
  { name: "케밥", emoji: "🥙", category: "아시안", spicy: 0, form: "빵", flavors: ["느끼한"], moods: ["든든"], solo: true, group: false, tags: ["고기", "간단"] },
  { name: "팟카파오", emoji: "🍛", category: "아시안", spicy: 2, form: "밥", flavors: [], moods: ["든든", "스트레스 풀기"], solo: true, group: false, tags: ["밥"] },

  // 한식 추가
  { name: "설렁탕", emoji: "🍲", category: "한식", spicy: 0, form: "밥", flavors: ["담백한"], moods: ["기운 나는", "해장"], solo: true, group: true, tags: ["국물", "보양"] },
  { name: "육개장", emoji: "🍲", category: "한식", spicy: 2, form: "밥", flavors: [], moods: ["해장", "든든"], solo: true, group: true, tags: ["국물"] },
  { name: "곰탕", emoji: "🍲", category: "한식", spicy: 0, form: "밥", flavors: ["담백한"], moods: ["기운 나는", "해장"], solo: true, group: true, tags: ["국물", "보양"] },
  { name: "김치볶음밥", emoji: "🍚", category: "한식", spicy: 1, form: "밥", flavors: [], moods: ["든든"], solo: true, group: false, tags: ["밥"] },
  { name: "쌈밥", emoji: "🥬", category: "한식", spicy: 0, form: "밥", flavors: ["담백한"], moods: ["가볍게"], solo: true, group: true, tags: ["밥", "채소"] },
  { name: "족발", emoji: "🍖", category: "한식", spicy: 0, form: "고기", flavors: ["느끼한"], moods: ["스트레스 풀기", "든든"], solo: false, group: true, tags: ["고기", "야식"] },
  { name: "갈비찜", emoji: "🍖", category: "한식", spicy: 0, form: "고기", flavors: ["달콤한"], moods: ["든든", "기운 나는"], solo: false, group: true, tags: ["고기"] },
  { name: "낙지볶음", emoji: "🐙", category: "한식", spicy: 3, form: "기타", flavors: ["달콤한"], moods: ["스트레스 풀기"], solo: true, group: true, tags: ["해산물", "매콤"] },
  { name: "해물파전", emoji: "🥞", category: "한식", spicy: 0, form: "기타", flavors: ["느끼한"], moods: ["스트레스 풀기"], solo: false, group: true, tags: ["전", "해산물"] },
  { name: "비빔국수", emoji: "🍜", category: "한식", spicy: 2, form: "면", flavors: ["새콤한", "달콤한"], moods: ["가볍게"], solo: true, group: false, tags: ["면"] },
  { name: "잔치국수", emoji: "🍜", category: "한식", spicy: 0, form: "면", flavors: ["담백한"], moods: ["가볍게", "해장"], solo: true, group: true, tags: ["면", "국물"] },
  { name: "수제비", emoji: "🍲", category: "한식", spicy: 0, form: "면", flavors: ["담백한"], moods: ["해장", "든든"], solo: true, group: true, tags: ["면", "국물"] },
  { name: "순댓국", emoji: "🍲", category: "한식", spicy: 0, form: "밥", flavors: ["담백한"], moods: ["해장", "든든"], solo: true, group: true, tags: ["국물"] },
  { name: "돼지국밥", emoji: "🍲", category: "한식", spicy: 0, form: "밥", flavors: ["담백한"], moods: ["해장", "든든"], solo: true, group: true, tags: ["국물"] },
  { name: "닭볶음탕", emoji: "🍗", category: "한식", spicy: 2, form: "고기", flavors: ["달콤한"], moods: ["든든", "스트레스 풀기"], solo: false, group: true, tags: ["고기", "국물"] },
  { name: "곱창", emoji: "🥩", category: "한식", spicy: 1, form: "고기", flavors: ["느끼한"], moods: ["스트레스 풀기"], solo: false, group: true, tags: ["고기", "야식"] },
  { name: "막국수", emoji: "🍜", category: "한식", spicy: 1, form: "면", flavors: ["새콤한", "담백한"], moods: ["가볍게"], solo: true, group: true, tags: ["면", "시원"] },
  { name: "만두", emoji: "🥟", category: "한식", spicy: 0, form: "기타", flavors: ["담백한"], moods: ["가볍게"], solo: true, group: true, tags: ["간식"] },
  { name: "김치찜", emoji: "🍲", category: "한식", spicy: 2, form: "고기", flavors: [], moods: ["든든", "해장"], solo: true, group: true, tags: ["밥", "든든"] },

  // 중식 추가
  { name: "깐풍기", emoji: "🍗", category: "중식", spicy: 1, form: "고기", flavors: ["달콤한", "새콤한"], moods: ["든든"], solo: false, group: true, tags: ["튀김"] },
  { name: "꿔바로우", emoji: "🍖", category: "중식", spicy: 0, form: "고기", flavors: ["달콤한", "새콤한", "느끼한"], moods: ["든든"], solo: false, group: true, tags: ["튀김"] },
  { name: "훠궈", emoji: "🍲", category: "중식", spicy: 2, form: "기타", flavors: ["느끼한"], moods: ["스트레스 풀기", "든든"], solo: false, group: true, tags: ["국물"] },
  { name: "양장피", emoji: "🥗", category: "중식", spicy: 0, form: "기타", flavors: ["새콤한"], moods: ["가볍게"], solo: false, group: true, tags: ["냉채"] },
  { name: "딤섬", emoji: "🥟", category: "중식", spicy: 0, form: "기타", flavors: ["담백한"], moods: ["가볍게"], solo: true, group: true, tags: ["간식"] },
  { name: "우육면", emoji: "🍜", category: "중식", spicy: 1, form: "면", flavors: ["담백한"], moods: ["든든", "해장"], solo: true, group: false, tags: ["면", "국물"] },
  { name: "군만두", emoji: "🥟", category: "중식", spicy: 0, form: "기타", flavors: ["느끼한"], moods: ["가볍게"], solo: true, group: true, tags: ["튀김", "간식"] },

  // 일식 추가
  { name: "소바", emoji: "🍜", category: "일식", spicy: 0, form: "면", flavors: ["담백한"], moods: ["가볍게"], solo: true, group: true, tags: ["면", "시원"] },
  { name: "가츠동", emoji: "🍱", category: "일식", spicy: 0, form: "밥", flavors: ["달콤한", "느끼한"], moods: ["든든"], solo: true, group: false, tags: ["밥", "튀김"] },
  { name: "텐동", emoji: "🍤", category: "일식", spicy: 0, form: "밥", flavors: ["느끼한", "달콤한"], moods: ["든든"], solo: true, group: false, tags: ["밥", "튀김"] },
  { name: "오므라이스", emoji: "🍳", category: "일식", spicy: 0, form: "밥", flavors: ["느끼한", "달콤한"], moods: ["든든"], solo: true, group: true, tags: ["밥"] },
  { name: "샤브샤브", emoji: "🍲", category: "일식", spicy: 0, form: "고기", flavors: ["담백한"], moods: ["가볍게", "기운 나는"], solo: false, group: true, tags: ["국물"] },
  { name: "타코야키", emoji: "🐙", category: "일식", spicy: 0, form: "기타", flavors: ["달콤한", "느끼한"], moods: ["가볍게"], solo: true, group: true, tags: ["간식"] },
  { name: "오코노미야키", emoji: "🥞", category: "일식", spicy: 0, form: "기타", flavors: ["달콤한", "느끼한"], moods: ["든든"], solo: false, group: true, tags: ["전"] },
  { name: "장어덮밥", emoji: "🍱", category: "일식", spicy: 0, form: "밥", flavors: ["달콤한"], moods: ["기운 나는", "든든"], solo: true, group: false, tags: ["밥", "보양"] },

  // 양식 추가
  { name: "치킨", emoji: "🍗", category: "양식", spicy: 0, form: "고기", flavors: ["느끼한"], moods: ["스트레스 풀기", "든든"], solo: false, group: true, tags: ["튀김", "야식"] },
  { name: "폭립", emoji: "🍖", category: "양식", spicy: 0, form: "고기", flavors: ["달콤한", "느끼한"], moods: ["든든"], solo: false, group: true, tags: ["고기"] },
  { name: "라자냐", emoji: "🍝", category: "양식", spicy: 0, form: "면", flavors: ["느끼한"], moods: ["든든"], solo: true, group: true, tags: ["면", "치즈"] },
  { name: "타코", emoji: "🌮", category: "양식", spicy: 1, form: "기타", flavors: ["새콤한"], moods: ["가볍게"], solo: true, group: true, tags: ["멕시칸"] },
  { name: "부리또", emoji: "🌯", category: "양식", spicy: 1, form: "기타", flavors: ["느끼한"], moods: ["든든"], solo: true, group: false, tags: ["멕시칸"] },
  { name: "프렌치토스트", emoji: "🍞", category: "양식", spicy: 0, form: "빵", flavors: ["달콤한"], moods: ["가볍게"], solo: true, group: false, tags: ["브런치", "디저트"] },
  { name: "와플", emoji: "🧇", category: "양식", spicy: 0, form: "빵", flavors: ["달콤한"], moods: ["가볍게"], solo: true, group: true, tags: ["디저트", "간식"] },
  { name: "팬케이크", emoji: "🥞", category: "양식", spicy: 0, form: "빵", flavors: ["달콤한"], moods: ["가볍게"], solo: true, group: true, tags: ["브런치", "디저트"] },
  { name: "그라탕", emoji: "🧀", category: "양식", spicy: 0, form: "밥", flavors: ["느끼한"], moods: ["든든"], solo: true, group: true, tags: ["치즈"] },
  { name: "크림수프", emoji: "🥣", category: "양식", spicy: 0, form: "기타", flavors: ["느끼한", "담백한"], moods: ["가볍게"], solo: true, group: false, tags: ["국물"] },
  { name: "오믈렛", emoji: "🍳", category: "양식", spicy: 0, form: "기타", flavors: ["담백한"], moods: ["가볍게"], solo: true, group: false, tags: ["브런치"] },
  { name: "피시앤칩스", emoji: "🐟", category: "양식", spicy: 0, form: "기타", flavors: ["느끼한"], moods: ["스트레스 풀기"], solo: true, group: true, tags: ["튀김"] },
  { name: "감바스", emoji: "🦐", category: "양식", spicy: 1, form: "기타", flavors: ["느끼한"], moods: ["스트레스 풀기"], solo: false, group: true, tags: ["해산물", "안주"] },

  // 분식 추가
  { name: "어묵", emoji: "🍢", category: "분식", spicy: 0, form: "기타", flavors: ["담백한"], moods: ["가볍게"], solo: true, group: true, tags: ["국물", "간식"] },
  { name: "튀김", emoji: "🍤", category: "분식", spicy: 0, form: "기타", flavors: ["느끼한"], moods: ["스트레스 풀기"], solo: true, group: true, tags: ["튀김", "간식"] },
  { name: "라볶이", emoji: "🍜", category: "분식", spicy: 2, form: "면", flavors: ["달콤한"], moods: ["스트레스 풀기"], solo: true, group: true, tags: ["면", "매콤"] },
  { name: "주먹밥", emoji: "🍙", category: "분식", spicy: 0, form: "밥", flavors: ["담백한"], moods: ["가볍게"], solo: true, group: false, tags: ["간단"] },
  { name: "떡꼬치", emoji: "🍢", category: "분식", spicy: 1, form: "기타", flavors: ["달콤한"], moods: ["가볍게"], solo: true, group: true, tags: ["간식"] },
  { name: "비빔면", emoji: "🍜", category: "분식", spicy: 2, form: "면", flavors: ["새콤한", "달콤한"], moods: ["가볍게"], solo: true, group: false, tags: ["면", "새콤"] },
  { name: "호떡", emoji: "🥞", category: "분식", spicy: 0, form: "기타", flavors: ["달콤한"], moods: ["가볍게"], solo: true, group: true, tags: ["간식", "디저트"] },
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

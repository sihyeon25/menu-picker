// 사진은 위키미디어 커먼즈의 자유 이용 사진입니다. 출처와 라이선스는 앱의 '사진 출처'에서 볼 수 있습니다.
// (scripts: 위키백과 대표 이미지를 모아 사람이 눈으로 확인한 것)
const PHOTOS = {
 "김치찌개": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Korean_stew_dish_-_Kimchi-jjigae_Kimchi_Stew_2019_%2801%29.jpg/500px-Korean_stew_dish_-_Kimchi-jjigae_Kimchi_Stew_2019_%2801%29.jpg",
  "author": "한국농수산식품유통공사",
  "license": "KOGL Type 1",
  "licenseUrl": "http://www.kogl.or.kr/info/licenseType1.do",
  "page": "https://commons.wikimedia.org/wiki/File:Korean_stew_dish_-_Kimchi-jjigae_Kimchi_Stew_2019_%2801%29.jpg"
 },
 "된장찌개": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Doenjang_jjigae.jpg/500px-Doenjang_jjigae.jpg",
  "author": "User ZenKimchi on en.wikipedia",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Doenjang_jjigae.jpg"
 },
 "순두부찌개": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Korean.food-Sundubu.jjigae-01.jpg/500px-Korean.food-Sundubu.jjigae-01.jpg",
  "author": "titanium22 (a flickr user)",
  "license": "CC BY-SA 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Korean.food-Sundubu.jjigae-01.jpg"
 },
 "부대찌개": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Budae_jjigae_%2828587380901%29.jpg/500px-Budae_jjigae_%2828587380901%29.jpg",
  "author": "T.Tseng",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Budae_jjigae_%2828587380901%29.jpg"
 },
 "감자탕": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Gamja-tang_5.jpg/500px-Gamja-tang_5.jpg",
  "author": "travel oriented",
  "license": "CC BY-SA 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Gamja-tang_5.jpg"
 },
 "갈비탕": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Galbitang_%EA%B0%88%EB%B9%84%ED%83%95_beeniru.jpg/500px-Galbitang_%EA%B0%88%EB%B9%84%ED%83%95_beeniru.jpg",
  "author": "Beeniru",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Galbitang_%EA%B0%88%EB%B9%84%ED%83%95_beeniru.jpg"
 },
 "삼계탕": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Samgye-tang_2.jpg/500px-Samgye-tang_2.jpg",
  "author": "wizdata",
  "license": "CC0",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Samgye-tang_2.jpg"
 },
 "비빔밥": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Dolsot-bibimbap.jpg/500px-Dolsot-bibimbap.jpg",
  "author": "Sous Chef",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Dolsot-bibimbap.jpg"
 },
 "제육볶음": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/%EC%A0%9C%EC%9C%A1_%EB%B3%B6%EC%9D%8C.jpg/500px-%EC%A0%9C%EC%9C%A1_%EB%B3%B6%EC%9D%8C.jpg",
  "author": "메이",
  "license": "CC BY-SA 1.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/1.0",
  "page": "https://commons.wikimedia.org/wiki/File:%EC%A0%9C%EC%9C%A1_%EB%B3%B6%EC%9D%8C.jpg"
 },
 "불고기": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Bulgogi_2.jpg/500px-Bulgogi_2.jpg",
  "author": "국립국어원",
  "license": "CC BY-SA 2.0 kr",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0/kr/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Bulgogi_2.jpg"
 },
 "삼겹살": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Samgyeopsal-gui.jpg/500px-Samgyeopsal-gui.jpg",
  "author": "jinsoo jang",
  "license": "CC0",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Samgyeopsal-gui.jpg"
 },
 "보쌈": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/KOCIS_BOSSAM%2C_napa_wraps_with_pork_%284618280268%29.jpg/500px-KOCIS_BOSSAM%2C_napa_wraps_with_pork_%284618280268%29.jpg",
  "author": "Korea.net / Korean Culture and Information Service",
  "license": "CC BY-SA 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:KOCIS_BOSSAM%2C_napa_wraps_with_pork_%284618280268%29.jpg"
 },
 "닭갈비": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Korean_cuisine-Dakgalbi-01.jpg/500px-Korean_cuisine-Dakgalbi-01.jpg",
  "author": "by shizu k (shezzz) at Flickr",
  "license": "CC BY-SA 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Korean_cuisine-Dakgalbi-01.jpg"
 },
 "냉면": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Dongmu_Bapsang_02.jpg/500px-Dongmu_Bapsang_02.jpg",
  "author": "korea.net",
  "license": "CC BY-SA 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Dongmu_Bapsang_02.jpg"
 },
 "칼국수": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Haemul-kal-guksu.jpg/500px-Haemul-kal-guksu.jpg",
  "author": "행복한 초록개구리",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Haemul-kal-guksu.jpg"
 },
 "짜장면": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Jajangmyeon.jpg/500px-Jajangmyeon.jpg",
  "author": "국립국어원",
  "license": "CC BY-SA 2.0 kr",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0/kr/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Jajangmyeon.jpg"
 },
 "짬뽕": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Jjampong.JPG/500px-Jjampong.JPG",
  "author": "Alfpooh",
  "license": "Public domain",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Jjampong.JPG"
 },
 "볶음밥": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Koh_Mak%2C_Thailand%2C_Fried_rice_with_seafood%2C_Thai_fried_rice.jpg/500px-Koh_Mak%2C_Thailand%2C_Fried_rice_with_seafood%2C_Thai_fried_rice.jpg",
  "author": "Vyacheslav Argenberg",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Koh_Mak%2C_Thailand%2C_Fried_rice_with_seafood%2C_Thai_fried_rice.jpg"
 },
 "탕수육": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Tangsuyuk_%28Korean_Chinese_sweet_and_sour_pork%29.jpg/500px-Tangsuyuk_%28Korean_Chinese_sweet_and_sour_pork%29.jpg",
  "author": "용스토리",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Tangsuyuk_%28Korean_Chinese_sweet_and_sour_pork%29.jpg"
 },
 "마라탕": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Malatang_from_South_Korea.jpg/500px-Malatang_from_South_Korea.jpg",
  "author": "오모군",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Malatang_from_South_Korea.jpg"
 },
 "마파두부덮밥": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Billyfoodmabodofu3.jpg/500px-Billyfoodmabodofu3.jpg",
  "author": "Archon6812",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Billyfoodmabodofu3.jpg"
 },
 "초밥": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Sushi_platter.jpg/500px-Sushi_platter.jpg",
  "author": "chidorian from Japan",
  "license": "CC BY-SA 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Sushi_platter.jpg"
 },
 "돈카츠": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tonkatsu_of_Kimukatsu.jpg/500px-Tonkatsu_of_Kimukatsu.jpg",
  "author": "Minseong Kim",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Tonkatsu_of_Kimukatsu.jpg"
 },
 "라멘": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Shoyu_ramen%2C_at_Kasukabe_Station_%282014.05.05%29_1.jpg/500px-Shoyu_ramen%2C_at_Kasukabe_Station_%282014.05.05%29_1.jpg",
  "author": "Lombroso",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Shoyu_ramen%2C_at_Kasukabe_Station_%282014.05.05%29_1.jpg"
 },
 "우동": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Kakeudon.jpg/500px-Kakeudon.jpg",
  "author": "Lusheeta at Japanese Wikipedia",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Kakeudon.jpg"
 },
 "규동": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Gyuu-don_003.jpg/500px-Gyuu-don_003.jpg",
  "author": "Ocdp",
  "license": "CC0",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Gyuu-don_003.jpg"
 },
 "파스타": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Espaguetis_carbonara.jpg/500px-Espaguetis_carbonara.jpg",
  "author": "Javier Somoza",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Espaguetis_carbonara.jpg"
 },
 "피자": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Pizza-3007395.jpg/500px-Pizza-3007395.jpg",
  "author": "igorovsyannykov",
  "license": "CC0",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Pizza-3007395.jpg"
 },
 "햄버거": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/RedDot_Burger.jpg/500px-RedDot_Burger.jpg",
  "author": "Hongreddotbrewhouse",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:RedDot_Burger.jpg"
 },
 "샌드위치": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Bologna_sandwich.jpg/500px-Bologna_sandwich.jpg",
  "author": "Diderot's dreams",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Bologna_sandwich.jpg"
 },
 "베이글": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Bagel.jpg/500px-Bagel.jpg",
  "author": "작성자 미상",
  "license": "Public domain",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Bagel.jpg"
 },
 "스테이크": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Beef_fillet_steak_with_mushrooms.jpg/500px-Beef_fillet_steak_with_mushrooms.jpg",
  "author": "Archie MacDonald52",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Beef_fillet_steak_with_mushrooms.jpg"
 },
 "리조또": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Risotto_Alla_Marinara.jpg/500px-Risotto_Alla_Marinara.jpg",
  "author": "작성자 미상",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Risotto_Alla_Marinara.jpg"
 },
 "샐러드": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Salad_platter.jpg/500px-Salad_platter.jpg",
  "author": "fir0002",
  "license": "GFDL 1.2",
  "licenseUrl": "http://www.gnu.org/licenses/old-licenses/fdl-1.2.html",
  "page": "https://commons.wikimedia.org/wiki/File:Salad_platter.jpg"
 },
 "떡볶이": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Tteokbokki.JPG/500px-Tteokbokki.JPG",
  "author": "Popo le Chien",
  "license": "CC0",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Tteokbokki.JPG"
 },
 "김밥": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Gimbap_%28pixabay%29.jpg/500px-Gimbap_%28pixabay%29.jpg",
  "author": "changupn",
  "license": "CC0",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Gimbap_%28pixabay%29.jpg"
 },
 "라면": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/2016_Indomie_Mi_Goreng_Rendang_NL_01.jpg/500px-2016_Indomie_Mi_Goreng_Rendang_NL_01.jpg",
  "author": "Takeaway",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:2016_Indomie_Mi_Goreng_Rendang_NL_01.jpg"
 },
 "순대": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Korean.food-Sundae-01.jpg/500px-Korean.food-Sundae-01.jpg",
  "author": "ayustety (a flickr user)",
  "license": "CC BY-SA 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Korean.food-Sundae-01.jpg"
 },
 "쫄면": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Jjolmyeon_2.jpg/500px-Jjolmyeon_2.jpg",
  "author": "국립국어원",
  "license": "CC BY-SA 2.0 kr",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0/kr/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Jjolmyeon_2.jpg"
 },
 "토스트": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Gilgeori_toast_3.jpg/500px-Gilgeori_toast_3.jpg",
  "author": "gildedgingerbread",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Gilgeori_toast_3.jpg"
 },
 "핫도그": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Hot_dog_with_mustard.png/500px-Hot_dog_with_mustard.png",
  "author": "Czar, original photographed by Renee Comet",
  "license": "Public domain",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Hot_dog_with_mustard.png"
 },
 "쌀국수": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Bowl_of_Meatball_pho.jpg/500px-Bowl_of_Meatball_pho.jpg",
  "author": "SerraKnightz",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Bowl_of_Meatball_pho.jpg"
 },
 "팟타이": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Phat_Thai_kung_Chang_Khien_street_stall.jpg/500px-Phat_Thai_kung_Chang_Khien_street_stall.jpg",
  "author": "Takeaway",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Phat_Thai_kung_Chang_Khien_street_stall.jpg"
 },
 "카레": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Goryokaku_Tower_Hakodate_Hokkaido_Japan16s.jpg/500px-Goryokaku_Tower_Hakodate_Hokkaido_Japan16s.jpg",
  "author": "663highland",
  "license": "CC BY 2.5",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.5",
  "page": "https://commons.wikimedia.org/wiki/File:Goryokaku_Tower_Hakodate_Hokkaido_Japan16s.jpg"
 },
 "반미": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/B%C3%A1nh_m%C3%AC_th%E1%BB%8Bt_n%C6%B0%E1%BB%9Bng.png/500px-B%C3%A1nh_m%C3%AC_th%E1%BB%8Bt_n%C6%B0%E1%BB%9Bng.png",
  "author": "nsaum75¡שיחת!‎",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:B%C3%A1nh_m%C3%AC_th%E1%BB%8Bt_n%C6%B0%E1%BB%9Bng.png"
 },
 "나시고랭": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Nasi_goreng_indonesia.jpg/500px-Nasi_goreng_indonesia.jpg",
  "author": "Helito",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Nasi_goreng_indonesia.jpg"
 },
 "미고랭": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Mi_Goreng_GM.jpg/500px-Mi_Goreng_GM.jpg",
  "author": "Gunawan Kartapranata",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Mi_Goreng_GM.jpg"
 },
 "똠얌꿍": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Tom_yam_kung_1.jpg/500px-Tom_yam_kung_1.jpg",
  "author": "Vee Satayamas",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Tom_yam_kung_1.jpg"
 },
 "월남쌈": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Sommerrolle_mit_Hoisin-Sauce_170305_AW.jpg/500px-Sommerrolle_mit_Hoisin-Sauce_170305_AW.jpg",
  "author": "Alice Wiegand",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Sommerrolle_mit_Hoisin-Sauce_170305_AW.jpg"
 },
 "분짜": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Bun_cha.jpg/500px-Bun_cha.jpg",
  "author": "tuhang",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Bun_cha.jpg"
 },
 "커리와 난": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Annapurna_Naan.jpg/500px-Annapurna_Naan.jpg",
  "author": "snowpea&bokchoi",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Annapurna_Naan.jpg"
 },
 "탄두리치킨": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Chickentandoori.jpg/500px-Chickentandoori.jpg",
  "author": "kspoddar",
  "license": "CC BY-SA 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Chickentandoori.jpg"
 },
 "케밥": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Lula_kebab_2.jpg/500px-Lula_kebab_2.jpg",
  "author": "Lesya Dolyk",
  "license": "CC BY-SA 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Lula_kebab_2.jpg"
 },
 "팟카파오": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Basil_fried_crispy_pork_with_rice_-_Chiang_Mai_-_2017-07-11_%28002%29.jpg/500px-Basil_fried_crispy_pork_with_rice_-_Chiang_Mai_-_2017-07-11_%28002%29.jpg",
  "author": "Iudexvivorum",
  "license": "CC0",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Basil_fried_crispy_pork_with_rice_-_Chiang_Mai_-_2017-07-11_%28002%29.jpg"
 },
 "설렁탕": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Seolleongtang2024.jpg/500px-Seolleongtang2024.jpg",
  "author": "Kimhs5400",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Seolleongtang2024.jpg"
 },
 "육개장": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Korean_soup-Yukgaejang-01.jpg/500px-Korean_soup-Yukgaejang-01.jpg",
  "author": "live",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Korean_soup-Yukgaejang-01.jpg"
 },
 "곰탕": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Kkori-gomtang.jpg/500px-Kkori-gomtang.jpg",
  "author": "굿바이 조미료",
  "license": "CC BY 2.0 kr",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0/kr/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Kkori-gomtang.jpg"
 },
 "김치볶음밥": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Kimchi-bokkeum-bap.jpg/500px-Kimchi-bokkeum-bap.jpg",
  "author": "국립국어원",
  "license": "CC BY-SA 2.0 kr",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0/kr/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Kimchi-bokkeum-bap.jpg"
 },
 "쌈밥": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Ssam_vegetables_and_ssamjang.jpg/500px-Ssam_vegetables_and_ssamjang.jpg",
  "author": "wizdata",
  "license": "CC0",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Ssam_vegetables_and_ssamjang.jpg"
 },
 "족발": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Korean.food-Jokbal-01.jpg/500px-Korean.food-Jokbal-01.jpg",
  "author": "by ayustety",
  "license": "CC BY-SA 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Korean.food-Jokbal-01.jpg"
 },
 "갈비찜": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Korean_cuisine-Galbijjim-06.jpg/500px-Korean_cuisine-Galbijjim-06.jpg",
  "author": "by Richy! at flickr",
  "license": "CC BY-SA 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Korean_cuisine-Galbijjim-06.jpg"
 },
 "낙지볶음": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Korean_cuisine-Nakji_bokkeum-01.jpg/500px-Korean_cuisine-Nakji_bokkeum-01.jpg",
  "author": "Beng Han Ho",
  "license": "CC BY-SA 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Korean_cuisine-Nakji_bokkeum-01.jpg"
 },
 "해물파전": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Korean_pancake-Pajeon-06.jpg/500px-Korean_pancake-Pajeon-06.jpg",
  "author": "Maggie",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Korean_pancake-Pajeon-06.jpg"
 },
 "비빔국수": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Bibim-guksu.jpg/500px-Bibim-guksu.jpg",
  "author": "JeongHO Suh (daecheonnet)",
  "license": "CC0",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Bibim-guksu.jpg"
 },
 "잔치국수": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Janchiguksu.jpg/500px-Janchiguksu.jpg",
  "author": "?boy from Seoul, Korea",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Janchiguksu.jpg"
 },
 "수제비": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Sujebi.jpg/500px-Sujebi.jpg",
  "author": "방신애",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Sujebi.jpg"
 },
 "순댓국": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Sundae-guk.jpg/500px-Sundae-guk.jpg",
  "author": "국립국어원",
  "license": "CC BY-SA 2.0 kr",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0/kr/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Sundae-guk.jpg"
 },
 "돼지국밥": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/%EB%8F%BC%EC%A7%80%EA%B5%AD%EB%B0%A5.jpg/500px-%EB%8F%BC%EC%A7%80%EA%B5%AD%EB%B0%A5.jpg",
  "author": "Leefect",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:%EB%8F%BC%EC%A7%80%EA%B5%AD%EB%B0%A5.jpg"
 },
 "닭볶음탕": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Korean.food-Dakbokemtang-01.jpg/500px-Korean.food-Dakbokemtang-01.jpg",
  "author": "stuart_spivack (a flickr user)",
  "license": "CC BY-SA 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Korean.food-Dakbokemtang-01.jpg"
 },
 "곱창": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Korean.food-Gobchang.bokkem-01.jpg/500px-Korean.food-Gobchang.bokkem-01.jpg",
  "author": "keizie",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Korean.food-Gobchang.bokkem-01.jpg"
 },
 "막국수": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Mulmakguksu_20220430_001.jpg/500px-Mulmakguksu_20220430_001.jpg",
  "author": "Mobius6",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Mulmakguksu_20220430_001.jpg"
 },
 "만두": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/%EB%A7%8C%EB%91%90.jpg/500px-%EB%A7%8C%EB%91%90.jpg",
  "author": "Raven9722",
  "license": "CC0",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:%EB%A7%8C%EB%91%90.jpg"
 },
 "김치찜": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/%EA%B9%80%EC%B9%98%EC%B0%9C.jpg/500px-%EA%B9%80%EC%B9%98%EC%B0%9C.jpg",
  "author": "밤하늘의 수정",
  "license": "CC BY-SA 2.0 kr",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0/kr/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:%EA%B9%80%EC%B9%98%EC%B0%9C.jpg"
 },
 "깐풍기": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Kkanpunggi.jpg/500px-Kkanpunggi.jpg",
  "author": "erin",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Kkanpunggi.jpg"
 },
 "꿔바로우": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Gu%C5%8Db%C4%81or%C3%B2u.jpg/500px-Gu%C5%8Db%C4%81or%C3%B2u.jpg",
  "author": "chengzhu",
  "license": "CC0",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Gu%C5%8Db%C4%81or%C3%B2u.jpg"
 },
 "훠궈": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Day177lilybday.JPG/500px-Day177lilybday.JPG",
  "author": "Chensiyuan at English Wikipedia",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Day177lilybday.JPG"
 },
 "양장피": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Yangjangpi.jpg/500px-Yangjangpi.jpg",
  "author": "춘천막국수",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Yangjangpi.jpg"
 },
 "딤섬": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Dim_sum.jpg/500px-Dim_sum.jpg",
  "author": "ProjectManhattan",
  "license": "Public domain",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Dim_sum.jpg"
 },
 "우육면": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Taiwanese_Beef_Noodle_Soup.jpg/500px-Taiwanese_Beef_Noodle_Soup.jpg",
  "author": "Jjj84206",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Taiwanese_Beef_Noodle_Soup.jpg"
 },
 "소바": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/%E4%B8%80%E8%88%AC%E7%9A%84%E3%81%AA%E3%81%96%E3%82%8B%E8%95%8E%E9%BA%A6.jpg/500px-%E4%B8%80%E8%88%AC%E7%9A%84%E3%81%AA%E3%81%96%E3%82%8B%E8%95%8E%E9%BA%A6.jpg",
  "author": "加茂川の民2",
  "license": "CC0",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:%E4%B8%80%E8%88%AC%E7%9A%84%E3%81%AA%E3%81%96%E3%82%8B%E8%95%8E%E9%BA%A6.jpg"
 },
 "가츠동": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Katsudon_001.jpg/500px-Katsudon_001.jpg",
  "author": "Ocdp",
  "license": "CC0",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Katsudon_001.jpg"
 },
 "텐동": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Tendon_by_udono_in_Tokyo.jpg/500px-Tendon_by_udono_in_Tokyo.jpg",
  "author": "udono from Tokyo",
  "license": "CC BY-SA 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Tendon_by_udono_in_Tokyo.jpg"
 },
 "오므라이스": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Omurice_by_Taimeiken.jpg/500px-Omurice_by_Taimeiken.jpg",
  "author": "Kanesue",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Omurice_by_Taimeiken.jpg"
 },
 "샤브샤브": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Shabu-shabu-01.jpg/500px-Shabu-shabu-01.jpg",
  "author": "jimg944",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Shabu-shabu-01.jpg"
 },
 "타코야키": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Takoyaki_by_yomi955.jpg/500px-Takoyaki_by_yomi955.jpg",
  "author": "heiwa4126",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Takoyaki_by_yomi955.jpg"
 },
 "오코노미야키": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Okonomiyaki_001.jpg/500px-Okonomiyaki_001.jpg",
  "author": "ume-y",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Okonomiyaki_001.jpg"
 },
 "장어덮밥": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Tokyo_Chikuyotei_Unadon01s2100.jpg/500px-Tokyo_Chikuyotei_Unadon01s2100.jpg",
  "author": "663highland",
  "license": "CC BY 2.5",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.5",
  "page": "https://commons.wikimedia.org/wiki/File:Tokyo_Chikuyotei_Unadon01s2100.jpg"
 },
 "치킨": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Fried-Chicken-Set.jpg/500px-Fried-Chicken-Set.jpg",
  "author": "Evan-Amos",
  "license": "CC0",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Fried-Chicken-Set.jpg"
 },
 "폭립": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Spareribs_20160506_182617113.jpg/500px-Spareribs_20160506_182617113.jpg",
  "author": "Edo de Roo",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Spareribs_20160506_182617113.jpg"
 },
 "라자냐": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Lasagne_-_stonesoup.jpg/500px-Lasagne_-_stonesoup.jpg",
  "author": "jules / stonesoup",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Lasagne_-_stonesoup.jpg"
 },
 "타코": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg/500px-001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg",
  "author": "Larry Miller",
  "license": "CC BY-SA 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg"
 },
 "부리또": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Burrito_with_rice.jpg/500px-Burrito_with_rice.jpg",
  "author": "Lauren Topor from Phoenix",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Burrito_with_rice.jpg"
 },
 "프렌치토스트": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/FrenchToast.JPG/500px-FrenchToast.JPG",
  "author": "Jonathunder",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:FrenchToast.JPG"
 },
 "와플": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Waffles_with_Strawberries.jpg/500px-Waffles_with_Strawberries.jpg",
  "author": "Parkerman & Christie from San Diego, USA",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Waffles_with_Strawberries.jpg"
 },
 "팬케이크": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Blueberry_pancakes_%283%29.jpg/500px-Blueberry_pancakes_%283%29.jpg",
  "author": "Janine from Mililani, Hawaii, United States",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Blueberry_pancakes_%283%29.jpg"
 },
 "그라탕": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Macaronigratin.jpg/500px-Macaronigratin.jpg",
  "author": "Kuha455405",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Macaronigratin.jpg"
 },
 "크림수프": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Cream_mushroom_soup_3.jpg/500px-Cream_mushroom_soup_3.jpg",
  "author": "Redeemer|Vodesnet",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Cream_mushroom_soup_3.jpg"
 },
 "오믈렛": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/FoodOmelete.jpg/500px-FoodOmelete.jpg",
  "author": "Renee Comet (photographer)",
  "license": "Public domain",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:FoodOmelete.jpg"
 },
 "피시앤칩스": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Fish_and_chips_blackpool.jpg/500px-Fish_and_chips_blackpool.jpg",
  "author": "Matthias Meckel",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Fish_and_chips_blackpool.jpg"
 },
 "감바스": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Gambas_al_ajillo.jpg/500px-Gambas_al_ajillo.jpg",
  "author": "Javier Lastras from España/Spain",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Gambas_al_ajillo.jpg"
 },
 "어묵": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Assorted_Eomuk.jpg/500px-Assorted_Eomuk.jpg",
  "author": "Pibiy",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Assorted_Eomuk.jpg"
 },
 "라볶이": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Ra-bokki.jpg/500px-Ra-bokki.jpg",
  "author": "farmtv",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Ra-bokki.jpg"
 },
 "주먹밥": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Jumeok-bap.jpg/500px-Jumeok-bap.jpg",
  "author": "Chloe Lim",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Jumeok-bap.jpg"
 },
 "떡꼬치": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Tteok-kkochi.jpg/500px-Tteok-kkochi.jpg",
  "author": "Chloe Lim",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Tteok-kkochi.jpg"
 },
 "호떡": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Hotteok.jpg/500px-Hotteok.jpg",
  "author": "Korea.net / Korean Culture and Information Service",
  "license": "CC BY-SA 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Hotteok.jpg"
 }
};

MENUS.forEach((m) => {
  const p = PHOTOS[m.name];
  if (p) {
    m.photo = p.src;
    m.credit = p;
  }
});

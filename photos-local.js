// images/ 폴더에 직접 넣은 사진입니다. tools/make_local_photos.py 가 만듭니다.
const LOCAL_PHOTOS = {};

MENUS.forEach((m) => {
  const f = LOCAL_PHOTOS[m.name];
  if (f) {
    m.photo = f;
    m.credit = { author: "직접 제공한 사진", license: "자체 사진", licenseUrl: "", page: "" };
  }
});

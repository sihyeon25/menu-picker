"""images/ 폴더의 사진을 앱에 연결한다.

사용법
  1) 사진 파일 이름을 메뉴 이름으로 해서 images/ 폴더에 넣는다. 예: images/김치찌개.jpg
     (jpg, jpeg, png, webp 가능. 가로 800~1200px 정도가 알맞다.)
  2) 프로젝트 폴더에서 python tools/make_local_photos.py 를 실행한다.
  3) photos-local.js 가 새로 만들어진다. 커밋하고 push하면 반영된다.

images/ 의 사진은 위키미디어에서 가져온 사진(photos.js)보다 우선한다.
"""
import json
import os
import re
import sys

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
menus = open(os.path.join(root, "menus.js"), encoding="utf-8").read()
names = set(re.findall(r'\{ name: "([^"]+)"', menus))
ext = (".jpg", ".jpeg", ".png", ".webp")

found, unknown = {}, []
folder = os.path.join(root, "images")
for f in sorted(os.listdir(folder)) if os.path.isdir(folder) else []:
    stem, e = os.path.splitext(f)
    if e.lower() not in ext:
        continue
    if stem in names:
        found[stem] = "images/" + f
    else:
        unknown.append(f)

js = ("// images/ 폴더에 직접 넣은 사진입니다. tools/make_local_photos.py 가 만듭니다.\n"
      "const LOCAL_PHOTOS = " + json.dumps(found, ensure_ascii=False, indent=1) + ";\n\n"
      "MENUS.forEach((m) => {\n  const f = LOCAL_PHOTOS[m.name];\n  if (f) {\n    m.photo = f;\n"
      "    m.credit = { author: \"직접 제공한 사진\", license: \"자체 사진\", licenseUrl: \"\", page: \"\" };\n  }\n});\n")
open(os.path.join(root, "photos-local.js"), "w", encoding="utf-8", newline="\n").write(js)
print("연결한 사진: %d장" % len(found))
if unknown:
    print("메뉴 이름과 맞지 않아 건너뜀:", ", ".join(unknown))
missing = sorted(n for n in names if n not in found)
print("아직 직접 넣은 사진이 없는 메뉴: %d개" % len(missing))

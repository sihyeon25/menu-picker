// 근처 식당 검색 (카카오 지도 웹 SDK, 키워드 검색)
// APP_CONFIG.KAKAO_JS_KEY 가 없으면 enabled() 가 false 이고, 앱은 지도 앱 링크로 대체한다.
const Places = (function () {
  let loading = null;

  function enabled() {
    return Boolean(window.APP_CONFIG && window.APP_CONFIG.KAKAO_JS_KEY);
  }

  function load() {
    if (loading) return loading;
    loading = new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src =
        "https://dapi.kakao.com/v2/maps/sdk.js?appkey=" +
        encodeURIComponent(window.APP_CONFIG.KAKAO_JS_KEY) +
        "&libraries=services&autoload=false";
      s.onload = () => {
        try {
          window.kakao.maps.load(resolve);
        } catch (e) {
          reject(e);
        }
      };
      s.onerror = () => {
        loading = null;
        reject(new Error("sdk-load-failed"));
      };
      document.head.appendChild(s);
    });
    return loading;
  }

  // 반환: [{ name, category, address, phone, url }]  (결과 없으면 빈 배열)
  async function search(area, menuName) {
    await load();
    const { kakao } = window;
    return new Promise((resolve, reject) => {
      const ps = new kakao.maps.services.Places();
      ps.keywordSearch(
        area + " " + menuName,
        (data, status) => {
          if (status === kakao.maps.services.Status.OK) {
            resolve(
              data.slice(0, 5).map((d) => ({
                name: d.place_name,
                category: (d.category_name || "").split(" > ").pop(),
                address: d.road_address_name || d.address_name || "",
                phone: d.phone || "",
                url: d.place_url,
              }))
            );
          } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
            resolve([]);
          } else {
            reject(new Error("search-failed"));
          }
        },
        { category_group_code: "FD6", size: 5 }
      );
    });
  }

  function mapLinks(area, menuName) {
    const q = encodeURIComponent((area || "근처") + " " + menuName);
    return {
      kakao: "https://map.kakao.com/link/search/" + q,
      naver: "https://m.map.naver.com/search2/search.naver?query=" + q,
    };
  }

  return { enabled, search, mapLinks };
})();

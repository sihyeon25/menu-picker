// 앱 설정. 아래 키는 도메인 제한으로 보호되는 공개용 키라 코드에 들어가도 됩니다.
window.APP_CONFIG = {
  // 카카오 개발자 사이트의 JavaScript 키. 비어 있으면 지도 앱 링크로 대체됩니다.
  KAKAO_JS_KEY: "7364a2e2d2497a640471722319b41f50",

  // 같이 정하기 방을 저장하는 Firebase (웹 앱 설정값이라 공개돼도 된다. 접근은 보안 규칙으로 막는다)
  FIREBASE: {
    apiKey: "AIzaSyBQFvH6hs8Xs0u6ItRdUhK3e4Q3CjzML7o",
    authDomain: "menupicker-5a1c2.firebaseapp.com",
    databaseURL: "https://menupicker-5a1c2-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "menupicker-5a1c2",
    storageBucket: "menupicker-5a1c2.firebasestorage.app",
    messagingSenderId: "625793542300",
    appId: "1:625793542300:web:77bfe3fd4b45cdb323e559",
  },
};

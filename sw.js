// 앱 설치(홈 화면 추가) 조건을 맞추기 위한 최소한의 서비스 워커예요.
// 캐싱은 하지 않고, 모든 요청은 평소처럼 네트워크로 갑니다.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());
self.addEventListener('fetch', () => {}); // 아무것도 안 함 = 브라우저 기본 동작

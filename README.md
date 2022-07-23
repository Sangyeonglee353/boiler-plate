# Boiler-plate
- 사이트 생성시 기본적으로 사용되는 기능 실습

## 사용 언어
- JavaScript

## 사용 프레임워크 및 라이브러리
1. 프레임워크
 - express.js: 백엔드 프레임워크 중 하나로 기본적인 라우팅을 목적으로 사용됨   
 ex. Next.js, (Java)Spring, (Python)Django...

2. 라이브러리 
 - mongoose: Mongo DB의 schema 생성 및 DB 연결을 위함
 - nodemon: 서버 가동 중 내용 수정시 자동으로 반영되도록 하기 위함
 - body-parser: express()로 사이트의 body에 작성된 값을 읽어내기 위함
 - bcrypt: 비밀번호 암호화
 - jsonwebtoken: 토큰 생성
 - cookie-parser: 쿠키에 데이터 저장하기 위함
 - axios: 비동기 전송
 - http-proxy-middleware: CORS 이슈 해결
 - concurrently: server와 client를 동시에 시작
 - redux
 - react-redux
 - redux-promise
 - redux-thunk

3. 확장 프로그램
 - Redux DevTools
 
## React_src 폴더 구성
 - _actions: Redux
 - _reducers: Redux
 - components
    - views
        - LandingPage: 첫 페이지
        - LoginPage: 로그인 페이지
        - NavBar: 내비게이션 바
        - RegisterPage: 회원가입 페이지
 - App.js: Routing 관리
 - Config.js: 환경 변수 정의
 - hoc: Higher Order Component
 - utils: 여러 군데에서 쓰일 수 있는 것들을 모아둠

## React CSS Framework
 - Material UI
 - React Bootstrap
 - Semantic UI
 - Ant Design
 - Materialize
 ...

## 참고 강의
- 인프런_따라하며 배우는 노드, 리액트 시리즈 - 기본 강의
# kkutu.kr 분석

조사일: 2026-06-09
대상: https://kkutu.kr/

이 문서는 공개 페이지, 브라우저에서 관찰 가능한 사용자 흐름, 정적 번들 문자열을 기준으로 정리했다.
서버 내부 구현은 확인할 수 없으므로 `확인`과 `추정`을 구분한다.

## 핵심 요약

- 첫 진입은 랜딩이지만, 핵심 CTA는 바로 게임 로비로 보내는 `게임 시작!`이다.
- 로그인 없이도 `/play`에서 `손님####` 게스트로 로비에 진입할 수 있다.
- 로그인은 필수 진입 장벽이 아니라 채팅, 친구, 계정 기능 확장을 위한 후속 유도 장치다.
- 실시간 게임/로비 상태는 WebSocket 기반 커스텀 packet 프로토콜로 동기화한다.
- REST API는 계정, 퀘스트, 낱말집, 검색, 상점, 친구 등 보조 기능에 사용한다.

## 사용자 흐름

### 1. 랜딩

URL: `/`

주요 요소:

- `게임 시작!` CTA
- 우측 상단 로그인
- 네이버 라운지, 디스코드 외부 링크
- 이용 약관, 운영 정책, 개인정보 처리방침
- 버전 표기: `v3.8.1#27651d0`

특징:

- 끝말잇기 단어를 배경 장식으로 사용해 게임 정체성을 바로 전달한다.
- 버튼 수를 줄이고 `게임 시작!`을 가장 크게 노출한다.
- 랜딩에서 가입/로그인보다 플레이 시작을 우선한다.

### 2. 게스트 로비 진입

`게임 시작!` 클릭 시 `/play`로 이동한다.

관찰된 상태:

- 닉네임은 `손님####` 형식으로 자동 생성된다.
- 상단/중앙에 빠른 시작 CTA가 있다.
- 좌측 메뉴에 순위전, 친선전, 튜토리얼, 낱말집, 낱말 사전, 글자 구슬, 보관함이 있다.
- 우측에는 광고, 커뮤니티 링크, 접속한 친구 영역, 로그인 유도 CTA가 있다.
- 채팅 입력은 게스트 상태에서 비활성화된다.
- 공지 모달이 로비 진입 시 표시된다.

의미:

- 핵심 게임 체험은 로그인 전에도 열어 둔다.
- 소셜/계정 기반 기능은 제한해 자연스럽게 로그인 이유를 만든다.
- 로비는 단순 목록이 아니라 공지, 친구, 채팅, 커뮤니티, 빠른 시작을 함께 담는 허브다.

### 3. 로그인

`로그인` 클릭 시 `/account/sign-in`으로 이동한다.

번들에서 확인된 OAuth 제공자:

- 달달소
- 네이버
- 카카오
- 구글

로그인 화면에는 약관 동의 고지가 함께 배치된다.

### 4. 매치/방 흐름

번들 문자열 기준 주요 packet 흐름:

- `REQUEST_QUICK_START_STATUS`
- `SYNC_QUICK_START_STATUS`
- `SYNC_GAME_ROOMS`
- `CREATE_RANKED_GAME_ROOM`
- `CREATE_NORMAL_GAME_ROOM`
- `JOIN_GAME_ROOM`
- `SYNC_GAME_ROOM`
- `CHAT`
- `QUICK_START`
- `SYNC_MATCH_QUEUE`
- `MATCH_QUEUE_SETTLED`
- `MATCH_QUEUE_STARTED`
- `REQUEST_GAME_ROOM_STATUS`
- `RESPONSE_GAME_ROOM_STATUS`

예상 흐름:

1. `/play` 진입 후 WebSocket 연결
2. 로비 상태, 방 목록, 빠른 시작 상태 동기화
3. 빠른 시작 또는 방 생성/입장
4. 매치 서버 포트 수신
5. 별도 WebSocket으로 매치 연결
6. 준비, 시작, 턴 진행, 결과 동기화

### 5. 빠른 시작 동작 관찰

`/play` 로비에서 `빠른 시작 2개 유형` 버튼을 클릭했다.

관찰된 단계:

1. 버튼이 비활성화된다.
2. 로비 중앙에 `상대 찾는 중` 상태와 경과 타이머가 표시된다.
3. `취소` 버튼이 함께 표시되어 매칭 대기를 취소할 수 있다.
4. 상대가 잡히면 `잠시 후 경기를 시작합니다!` 문구와 숫자 카운트다운이 표시된다.
5. URL은 계속 `/play`로 유지되고, 화면만 매치 UI로 전환된다.

매치 화면에서 관찰된 상태:

- 매치 유형: `친선전`
- 게임 유형: `한국어 끝말잇기`
- 구성: `2 / 2` 플레이어
- 라운드 설정: `3 라운드 / 90초`
- 좌측/상단에 미션 목록과 진행도 표시
- 중앙에 현재 제시 글자와 남은 턴 시간 표시
- 상대 차례일 때 `내 차례가 오기 전에 낱말을 입력해 보세요!` 예측 입력창 표시
- 참가자 점수/순위/팀 순위 표시
- 활성 낱말집 목록 패널 표시
- 게스트 상태에서는 경기 참가자 채팅 입력도 비활성화
- 하단에 ping, 버전 정보 표시

의미:

- 빠른 시작은 별도 페이지 이동보다 로비 내부 scene 전환에 가깝다.
- 매칭 대기 중 취소 가능성을 명확히 보여준다.
- 매칭 성공 후에는 짧은 카운트다운을 통해 리소스 로딩과 심리적 준비 시간을 준다.
- 실제 게임 UI는 현재 음절, 턴 타이머, 미션, 점수판, 입력창을 한 화면에 압축한다.
- 상대 턴에도 예측 입력을 허용해 대기 시간을 능동적으로 만든다.

### 6. 경기 진행 화면 관찰

빠른 시작으로 진입한 경기 진행 화면을 관찰했다.

관찰된 경기 조건:

- 매치 유형: `친선전`
- 게임 유형: `한국어 끝말잇기`
- 참가자: `2 / 2`
- 라운드 설정: `3 라운드 / 90초`
- 게스트 상태: 채팅 입력 비활성화

주요 화면 구조:

- 상단/좌측: 미션 목록과 미션 진행도
- 중앙: 현재 낱말, 남은 턴 시간, 입력 영역
- 중앙 하단: 사용된 낱말 기록과 사전 뜻
- 우측/하단: 참가자 목록, 점수, 선두 표시, 팀 순위
- 보조 패널: 활성 낱말집 목록, 경기 참가자 채팅방, ping, 버전 정보

관찰 예시:

- 현재 낱말: `감감무소식`
- 현재 상태: `내 차례!`
- 입력창: 내 차례에는 활성화
- 점수판: 상대 `531점`, 내 게스트 `165점`
- 사전 정보: 품사와 뜻을 함께 표시

의미:

- 경기 화면은 현재 턴 판단에 필요한 정보를 한 화면에 밀도 있게 배치한다.
- 미션 진행도, 현재 낱말, 뜻, 점수, 남은 시간을 동시에 보여줘 플레이 판단을 빠르게 돕는다.
- 단어의 사전 뜻을 즉시 노출해 유저가 낱말 사용 결과를 납득할 수 있게 한다.
- 게스트라도 경기는 진행할 수 있지만, 경기 참가자 채팅은 로그인 유도 장치로 제한한다.
- 점수판에 선두와 남은 시간/점수를 같이 표시해 경쟁 상태를 계속 인지시킨다.

## 네트워크 흐름

브라우저에서 이미 열린 WebSocket frame payload는 소급 캡처하지 못했다.
다만 브라우저 시작과 동시에 CDP `Network.webSocketFrameSent` / `Network.webSocketFrameReceived` 이벤트를 구독하면 이후 payload는 확인할 수 있다.
아래 내용은 현재 화면 관찰, `/play` 번들에 포함된 WebSocket client, packet enum, handler 코드, 2026-06-10 실측 WebSocket frame을 기준으로 정리했다.

실측 조건:

- Chrome을 새 persistent context로 실행했다.
- `https://kkutu.kr/` 이동 전에 CDP `Network.enable`과 WebSocket frame listener를 등록했다.
- `게임 시작` 클릭 후 게스트로 자동 입장했다.
- 공지 모달을 닫고 `빠른 시작`을 클릭해 실제 경기까지 진입했다.
- 캡처된 소켓은 로비 `wss://kkutu.kr/w60000?...`, 매치 `wss://kkutu.kr/w60004?...`였다.

### WebSocket 연결

WebSocket URL 생성 로직:

```ts
https 환경: wss://${location.hostname}/w${port}?version=...
http 환경:  ws://${location.hostname}:${port}?version=...
```

연결은 크게 두 종류로 나뉜다.

- 로비/방 연결: `/play` 진입 후 로비, 방 목록, 채팅방, 빠른 시작 상태를 동기화한다.
- 매치 연결: 매칭 성사 후 받은 match port로 별도 WebSocket을 열고 실제 경기 상태를 동기화한다.

### Packet 직렬화

확인된 직렬화 방식:

```ts
send(packet) {
  socket.send(JSON.stringify(packet));
}

onMessage(event) {
  const packet = JSON.parse(event.data);
}
```

특이점:

- `bigint`는 `"123n"` 같은 문자열로 변환해 전송하고, 수신 시 다시 `BigInt`로 복원한다.
- ping은 JSON packet이 아니라 문자열 `"p"`를 직접 보내고, 같은 문자열 응답으로 왕복 시간을 측정한다.
- Sentry breadcrumb에 WebSocket packet을 남기는 코드가 있다.

### 요청/응답 패턴

client는 `sendAndReceive()` 패턴을 사용한다.

```ts
sendAndReceive(requestPacket, expectedPacketType, predicate?)
```

동작:

1. 요청 packet type 기준으로 disposable handler를 등록한다.
2. WebSocket으로 요청 packet을 보낸다.
3. 수신 packet type이 기대값과 맞고 predicate를 통과하면 Promise를 resolve한다.
4. 일반 broadcast packet은 각 client handler가 store를 갱신한다.

### 빠른 시작 흐름

실측 payload와 확인된 packet 기준 흐름:

1. `/play` 진입
2. 로비 WebSocket 연결: `wss://kkutu.kr/w60000?version=v3.8.1%2327651d0`
3. server -> `SYNC_ROOM_LIST`
4. server -> `SYNC_FEATURE`
5. server -> `SYNC_USER`
6. client -> `PING`
7. client -> `REQUEST_QUICK_START_STATUS`
8. server -> `SYNC_QUICK_START_STATUS`
9. 빠른 시작 클릭
10. client -> `QUICK_START`
11. server -> `SYNC_MATCH_QUEUE`
12. server -> `MATCH_QUEUE_SETTLED`
13. server -> `MATCH_QUEUE_STARTED { port, room }`
14. client가 match port를 저장하고 매치 전환 시작

실측 주요 payload:

```json
{"t":79,"s":{"idList":["NORMAL_WORD_CHAIN_KO","NORMAL_WORD_CHAIN_KO_MANNER"]}}
{"t":80,"v":{"recentPlayed":{},"idList":["NORMAL_WORD_CHAIN_KO","NORMAL_WORD_CHAIN_KO_MANNER"]},"x":null}
{"t":82}
{"t":83,"p":60004,"r":{"q":"NORMAL_WORD_CHAIN_KO","s":"playing","o":{"type":"wordChainKo","capacity":2,"flavors":["item"],"roundCount":3,"roundTime":90,"visible":false}}}
```

실측 packet type 매핑:

- `t:79`: `QUICK_START`
- `t:80`: `SYNC_MATCH_QUEUE`
- `t:82`: `MATCH_QUEUE_SETTLED`
- `t:83`: `MATCH_QUEUE_STARTED`

UI 대응:

- `SYNC_MATCH_QUEUE`: `상대 찾는 중` 상태 표시
- `MATCH_QUEUE_SETTLED`: `잠시 후 경기를 시작합니다!` 카운트다운 표시
- `MATCH_QUEUE_STARTED`: 매치 서버 포트 수신 후 경기 화면 전환

초기 진입 payload:

```json
{"t":5,"u":{"i":"g/...", "n":null, "l":1, "f":{"quickStart":{"idList":["NORMAL_WORD_CHAIN_KO","NORMAL_WORD_CHAIN_KO_MANNER"]}}},"x":false}
{"t":6}
{"t":8,"d":[]}
```

해석:

- 게스트 입장은 `게임 시작` 이후 자동으로 이뤄진다.
- `SYNC_USER` payload에 게스트 id, 기본 코스튬, quickStart 기본 `idList`가 포함된다.
- `QUICK_START` 요청은 선택된 빠른 시작 유형 목록을 그대로 보낸다.

### 매치 연결 흐름

실측 payload와 확인된 packet 기준 흐름:

1. match port로 새 WebSocket 연결: `wss://kkutu.kr/w60004?version=v3.8.1%2327651d0`
2. client -> `READY`
3. server -> `READIED`
4. server -> `SYNC_MATCH`
5. server -> `ROUND_STANDBY`
6. server -> `ROUND_STARTED`
7. server -> `TURN_STARTED`

실측 주요 payload:

```json
{"t":26}
{"t":43}
{"t":44,"a":{"t":"wordChainKo","p":["g/...","g/..."],"R":[null,null,null],"T":0},"m":1781054617753}
{"t":25,"W":[],"w":[]}
{"t":46,"i":2,"a":{"R":["수",null,null],"c":["수"]}}
{"t":48,"i":2,"a":{"c":["수"],"T":90000},"p":false}
```

실측 packet type 매핑:

- `t:26`: `READY`
- `t:43`: `READIED`
- `t:44`: `SYNC_MATCH`
- `t:25`: 낱말집/단어장 동기화 계열로 보임
- `t:46`: `ROUND_STANDBY`
- `t:48`: `ROUND_STARTED` 또는 턴 시작 직전 상태 동기화

추가 관찰:

- 매치 연결 뒤에도 로비 WebSocket은 유지되고 방 상태 broadcast를 계속 받는다.
- 매치 WebSocket에서는 JSON packet 외에 문자열 `"p"` ping/pong이 주기적으로 오간다.
- `ROUND_STANDBY`에서 초성/시작 글자에 해당하는 `R`, `c` 값이 먼저 내려온다.
- `ROUND_STARTED` 계열 payload에서 라운드 제한 시간 `T: 90000`과 미션 목록 `m`이 함께 내려온다.
- Chrome DevTools 전체 로그 기준 `R`은 현재 경기에서 새로 제시된 시작 글자 히스토리로 보인다. 예를 들어 `["몽","일","패"]` 이후 `["몽","일","패","은"]`처럼 누적된다.
- `SYNC_MATCH`의 `p` 배열은 플레이어 순서이고, `ROUND_STARTED` 계열 payload의 `a.i`는 현재 턴 플레이어 index로 보인다.

상태 갱신:

- `SYNC_MATCH`: automaton, 서버 시간, 턴/라운드 만료 시각 동기화
- `ROUND_STANDBY`: 정답/턴 상태 초기화, 라운드 준비
- `ROUND_STARTED`: 라운드 시작, 라운드 제한 시간 설정
- `TURN_STARTED`: 현재 턴 플레이어, 턴 제한 시간, 아이템/실패 상태 초기화

### 입력/턴 흐름

확인된 packet 기준:

- 내 턴 단어 제출: client -> `TURN_PASS`
- 성공 응답: server -> `TURN_ENDED` 또는 `ANSWER_HIT`
- 실패 응답: server -> `TURN_PASS_FAILED`
- 상대 턴 예측 입력: client -> `PREDICTION_SEND`
- 예측 응답: server -> `PREDICTION_SENT`
- 기권/포기 계열: client -> `WAIVE`, server -> `WAIVED`

입력 처리 특징:

- `Enter`가 제출 단축키다.
- 입력값은 trim, lowercase 처리 후 최대 낱말 길이로 잘라 전송한다.
- input, keydown, compositionend, focus, blur 이벤트를 별도 stamp로 WebSocket에 보낸다.
- 이 stamp는 일반 JSON packet이 아니라 `i...`, `/Key`, `!composition`, `f+`, `f-` 같은 짧은 문자열로 보인다.
- 신뢰되지 않은 입력/키보드 이벤트는 `JANUS` packet으로 별도 보고한다.

Chrome DevTools 전체 로그에서 추가 확인한 입력 packet:

```text
client -> {"t":49,"i":"가가가"}
server -> {"t":52,"i":"가가가","r":9}

client -> {"t":49,"i":"미생"}
server -> {"t":52,"i":"미생","r":0}

server -> {"t":53,"r":{"i":"몽상가",...},"a":{"c":["가"],"s":{...}}}
server -> {"t":53,"r":null,"w":["깔깔","깔때기","깔창"],"a":{"s":{...}}}
```

확인된 사실:

- `i...` 문자열 frame은 키 입력, 조합, 자동완성/예측 입력 상태를 실시간으로 보낸다.
- 수동 입력 로그에서는 한 글자 입력/조합 변화마다 `iㄱ`, `i가`, `i각`, `i가`처럼 입력 상태가 계속 전송됐다.
- 최종 단어 제출은 JSON packet `{"t":49,"i":"단어"}`로 전송된다.
- 시작 글자와 맞지 않는 단어도 최종 제출 packet으로 서버에 전송된다. 예를 들어 제시어가 `우`일 때 `미생` 제출이 `{"t":49,"i":"미생"}`로 전송됐다.
- `t:52`는 제출된 문자열을 서버가 받았음을 알리는 중간 응답 또는 실패 전 상태 응답으로 보인다. `몽쉘`, `가가가`, `미생`, `깔맞춤`처럼 최종 인정되지 않은 입력에서도 관찰됐다.
- `t:53`에서 `r`이 사전 정보 객체면 단어 인정, `r:null`이면 실패/패널티 확정이다.
- `t:53 r:null`에는 유효 단어 후보 `w`와 점수 변화가 함께 내려온다.

추정:

- `t:52.r` 값은 실패 사유 또는 입력 상태 code일 가능성이 있다. 예시로 `미생`은 `r:0`, `가가가`/`깔맞춤`은 `r:9`, `깔록`은 `r:1`이었다.
- 클라이언트의 시작 글자 검사는 최종 보안 경계가 아니며, 서버가 시작 글자 불일치와 사전 미등재를 모두 authoritative하게 판정한다.
- 시작 글자와 맞지 않는 단어도 서버로 보내는 이유는 상대방 입력 시도/오입력/실패 상태를 다른 플레이어 화면에 동기화하기 위한 설계일 가능성이 있다.

### 힌트 흐름

상대 턴일 때 입력창에 단어 후보를 넣으면 힌트로 전달할 수 있다.

확인된 packet:

```text
client -> {"t":55,"v":"몽타주"}
server -> {"t":56,"a":{"h":[["g/...", "몽타주"]]},"b":"g/..."}
```

확인된 사실:

- `t:55`는 힌트/예측 단어 전송이다.
- `t:56`은 힌트 반영 broadcast다.
- `a.h`에는 `[playerId, hintText]` 쌍이 들어간다.
- `b`는 힌트를 보낸 플레이어 id로 보인다.

### 없는 단어 입력 검증

실측 조건:

- 조사일: 2026-06-12
- `게임 시작` -> `빠른 시작` -> 실제 매치 진입 순서로 진행했다.
- 로비 WebSocket은 `wss://kkutu.kr/w60000?...`, 매치 WebSocket은 `wss://kkutu.kr/w60003?...`였다.
- 매치 유형은 `NORMAL_WORD_CHAIN_KO_MANNER`, 게임 유형은 `wordChainKo`였다.
- 서버가 제시한 시작 글자는 `벌`이었다.
- 입력창에 존재하지 않는 말로 보이는 `벌없는말`을 입력하고 `Enter`를 눌렀다.

확인된 사실:

```text
server -> {"t":46,"i":2,"a":{"R":["벌",null,null],"c":["벌"],...}}
server -> {"t":48,"a":{"c":["벌"],"T":90000,...},"p":false}
client -> i벌없는말
server -> {"t":53,"r":null,"w":["벌집","벌레","벌벌"],"a":{"s":{"g/...":{"X":-100,...}}}}
```

- 프론트엔드는 `벌`로 시작하는 `벌없는말` 입력을 막지 않았다.
- 입력값은 JSON packet이 아니라 매치 WebSocket의 문자열 frame `i벌없는말`로 서버에 전송됐다.
- 서버는 `t:53` 응답에서 `r:null`을 내려보냈고, 함께 추천/대체 단어로 보이는 `w:["벌집","벌레","벌벌"]`를 내려보냈다.
- 같은 응답에서 내 점수 상태가 `X:-100`으로 변경됐다.
- 입력 직후 Sentry 로그에는 `Malicious autocompletion` 경고가 남았다. payload에는 입력값 `벌없는말`과 게스트 user id가 포함됐다.
- 이 실험은 자동화로 입력창 값을 채운 케이스라 일반 키 입력과 흐름이 달랐다. 수동 DevTools 로그에서는 최종 제출이 `{"t":49,"i":"..."}` JSON packet으로 확인됐다.

추정:

- 끝말 시작 글자 조건은 프론트엔드에서도 일부 판단할 수 있지만, 실제 단어 존재 여부는 서버가 최종 판정한다.
- `i...` frame은 입력 중 자동완성/예측/현재 입력 상태를 서버에 보내는 stamp로 보이고, `Enter` 제출 시에도 같은 prefix로 최종 입력값이 전송된다.
- 일반 수동 입력에서 `Enter` 제출은 `t:49`로 전송되고, `i...` frame은 제출 전 입력 상태 전송에 가깝다.
- `t:53`은 단어 제출 결과를 나타내는 응답으로 보이며, `r:null`은 단어 검증 실패, `w`는 서버가 제안하는 유효 단어 후보로 보인다.
- `Malicious autocompletion` 로그는 없는 말 입력 자체보다, 키 입력/조합 frame이 자연스럽게 누적되지 않은 상태에서 완성 문자열이 한 번에 입력되는 흐름을 감지하는 방어/진단 장치로 보인다.
- 따라서 우리 구현에서도 클라이언트는 빠른 UX를 위해 시작 글자, 길이, 입력 가능 턴 정도만 검증하고, 사전 존재 여부와 점수/패널티 판정은 서버 주도적 방식으로 처리하는 편이 맞다.

### 채팅 흐름

확인된 packet 기준:

- client -> `CHAT`
- server -> `CHATTED`
- server -> `SYNC_CHAT_ROOM`
- server -> `UNSYNC_CHAT_ROOM`

게스트 상태에서는 입력창이 비활성화되어 실제 `CHAT` 전송까지는 진행되지 않는다.

### 종료/복구 흐름

확인된 packet:

- `ROUND_ENDED`
- `FINISHED`
- `RECONNECTED`
- `PLAYER_ABSCONDED`
- `MIDWAY_SPECTATED`

추정:

- 라운드 종료 시 BGM 정지, time-over 사운드, 정답/힌트 표시가 이어진다.
- 경기 종료 시 결과 화면 상태로 전환한다.
- 연결이 끊기거나 중간 관전/재접속 상황에서는 기존 room/match 상태를 다시 동기화한다.

### 구현 참고

우리 프로젝트에서도 WebSocket을 다음처럼 나누는 것이 좋다.

- `LobbySocket`: 로비, 방 목록, 빠른 시작, 친구/채팅방 상태
- `MatchSocket`: 실제 경기 automaton, 라운드, 턴, 입력, 결과
- `PacketClient`: `send`, `sendAndReceive`, `subscribe`, `ping`, `close` 제공
- `PacketStore`: disposable response handler와 broadcast handler를 분리

## 애니메이션/화면 전환

번들 문자열 기준으로 `framer-motion`, `gsap`, `anime.js`, `react-spring` 같은 범용 JS 애니메이션 라이브러리 흔적은 뚜렷하지 않았다.
대신 Rive와 CSS transition/keyframes를 많이 사용한다.

### 확인된 요소

- `@rive-app/webgl2` v2.35.3
- CSS `transition-*` 클래스 다수
- CSS `animate-*`, `animate-duration-*`, `animate-fill-*` 클래스 다수
- `kf-[from]`, `kf-[to]`, `kf-[20%]` 같은 keyframe 유틸리티
- `starting:*` 클래스
- React/Next View Transition 관련 내부 코드

### 추정 구조

- 큰 화면 흐름은 React 상태로 제어한다.
- `/play` URL은 유지한 채 `lobby`, `matching`, `countdown`, `match` 같은 scene 상태를 바꾼다.
- scene 상태가 바뀌면 컴포넌트 mount/unmount와 CSS transition/keyframes가 실행된다.
- 캐릭터, 보상, 일부 고급 효과는 Rive 애니메이션을 사용한다.
- 사운드 재생 타이밍과 CSS 애니메이션 타이밍을 맞춰 전환이 더 부드럽게 느껴진다.

### 화면이 매끄럽게 보이는 이유

- URL 이동보다 한 페이지 내부 scene 전환을 사용한다.
- 전환 전 카운트다운과 로딩 단계를 둬 리소스 준비 시간을 UX 일부로 만든다.
- `opacity`, `transform`, `scale`, `filter`, `padding` 같은 GPU 친화적인 속성을 주로 전환한다.
- 상태가 바뀌는 단위를 작게 나눠 UI 전체가 한 번에 깜빡이지 않는다.
- 사운드, 숫자 카운트다운, 버튼 비활성화, 배경 전환이 같은 흐름으로 맞물린다.

### 우리 프로젝트 적용안

초기에는 Framer Motion 같은 범용 라이브러리보다 CSS 기반 전환으로 시작한다.

- scene 상태: `idle`, `matching`, `settled`, `countdown`, `transitioning`, `playing`
- CSS 전환: opacity, transform, scale, translate 중심
- 공통 유틸: `Fade`, `ScaleIn`, `SlideIn`, `SceneTransition`
- 게임 효과: 정답, 턴 시작, 라운드 종료, 점수 상승만 별도 keyframes
- 캐릭터/보상 같은 고급 애니메이션이 필요해질 때 Rive 도입 검토

Rive를 도입할 경우:

- `shared/ui/rive-animation` 같은 인프라 래퍼만 `shared`에 둔다.
- 특정 캐릭터/게임 효과는 사용하는 page 또는 feature 안에 둔다.
- 필수 게임 진행 정보는 Rive에만 의존하지 말고 DOM 텍스트로도 표현한다.

## 기술 스택

### 확인됨

- Next.js App Router
- React 19 계열
- Turbopack chunk
- nginx/1.24.0 on Ubuntu
- PWA manifest
- Zustand
- Immer
- Sentry
- Umami
- Google Ads / gtag
- Daum/Kakao 광고 스크립트
- PortOne 브라우저 SDK
- WebSocket

### WebSocket 구조

번들에서 확인된 URL 생성 로직:

```ts
https 환경: wss://${location.hostname}/w${port}?version=...
http 환경:  ws://${location.hostname}:${port}?version=...
```

특징:

- 로비와 매치를 모두 WebSocket으로 처리한다.
- `PacketType` enum 기반으로 송수신 packet을 구분한다.
- ping 메시지와 round-trip 측정 로직이 있다.
- packet handler를 store에 등록해 특정 응답을 기다리는 `sendAndReceive` 패턴을 사용한다.

### REST API

번들에서 확인된 주요 API 경로:

- `/api/account/*`
- `/api/account/sign-out`
- `/api/account/nickname`
- `/api/account/preference`
- `/api/account/profile`
- `/api/account/notification`
- `/api/friend`
- `/api/quest`
- `/api/quest/change`
- `/api/word/search`
- `/api/wordbook`
- `/api/wordbook/search`
- `/api/wordbook/subscriptions`
- `/api/shop`
- `/api/catalog`
- `/api/external/idv`
- `/api/external/pay`

역할 분리:

- WebSocket: 로비, 방, 채팅, 매치, 실시간 상태
- REST: 계정 설정, 알림, 퀘스트, 낱말집, 검색, 결제/본인확인

## UX 참고점

### 가져올 점

- 로그인 전 플레이 허용
- 자동 게스트 닉네임 생성
- 빠른 시작을 첫 화면의 가장 강한 CTA로 배치
- 매칭 대기 상태에서 경과 시간, 취소 버튼, 시작 카운트다운을 단계별로 표시
- 상대 턴에도 예측 입력을 열어 대기 시간을 플레이 일부로 만든 점
- 단어 제출 후 사전 뜻과 품사를 바로 보여줘 결과 납득을 돕는 점
- 미션 진행도, 턴 타이머, 점수판을 동시에 보여줘 경기 판단을 빠르게 만든 점
- 로비에서 공지, 채팅, 친구, 방 목록, 커뮤니티를 함께 노출
- 실시간 연결 상태를 명확히 보여주고 재연결 액션 제공
- 버전 정보를 화면에 노출해 배포 상태 파악 가능하게 함

### 개선해서 가져올 점

- `게임 시작!`은 heading/div 클릭이 아니라 `button` 또는 `a`로 구현한다.
- 로그인도 접근성 트리에서 명확한 link/button으로 잡히게 한다.
- 공지 모달은 첫 진입 몰입을 방해할 수 있으므로 닫힘 상태를 저장한다.
- 광고 영역은 레이아웃을 흔들지 않도록 고정 슬롯으로 둔다.
- 게스트 제한 사유는 입력 placeholder나 disabled reason으로 분명히 보여준다.
- 매칭 시작 후 실제 매치로 넘어가기 전 취소 가능 시간을 명확히 정의한다.

## 우리 프로젝트 적용안

초기에는 `pages` 중심으로 시작하고, 재사용이 확인될 때만 아래 레이어로 내린다.

### 라우트

- `app/page.tsx` -> `src/pages/home`
- `app/play/page.tsx` -> `src/pages/play`
- `app/account/sign-in/page.tsx` -> `src/pages/sign-in`

### FSD 배치 초안

초기 구현:

- `src/pages/home`: 랜딩, 게임 시작 CTA
- `src/pages/play`: 로비 조합, 게스트 로비, 방 목록, 채팅 패널, 빠른 시작
- `src/pages/sign-in`: 로그인 provider 선택
- `src/shared/api`: REST client, WebSocket client base
- `src/shared/auth`: 세션/게스트 식별자
- `src/shared/config`: route constants, env constants
- `src/shared/ui`: 버튼, 모달, 토스트, 패널 등 순수 UI

재사용이 확인되면 추출:

- `entities/user`: 로그인 유저/게스트 유저 모델
- `entities/room`: 방 모델, 방 상태 표시
- `entities/match`: 매치 상태, 턴/라운드 모델
- `entities/word`: 단어/낱말집 모델
- `features/quick-start`: 빠른 시작 요청/취소
- `features/create-room`: 방 생성
- `features/join-room`: 방 입장
- `features/chat`: 채팅 전송/수신
- `features/sign-in`: OAuth 로그인 액션
- `widgets/lobby-sidebar`: 메뉴/프로필/친구 요약
- `widgets/lobby-main`: 빠른 시작, 공지, 방 목록
- `widgets/chat-panel`: 채팅 UI

## 개발 우선순위

1. 홈에서 게스트로 `/play` 진입
2. 게스트 닉네임 생성 및 표시
3. WebSocket 연결 상태 표시
4. 로비 화면 골격: 빠른 시작, 방 목록, 채팅 패널
5. 빠른 시작 대기/취소/카운트다운 상태
6. 빠른 시작 packet/API 연결
7. 방 생성/입장
8. 게임 방 내부 준비/시작
9. 턴 진행 UI와 입력 검증
10. 제출된 낱말 기록과 사전 뜻 표시
11. 미션 진행도와 점수판
12. 로그인 도입
13. 친구, 알림, 낱말집, 상점 같은 확장 기능

## 설계 메모

- 실시간 이벤트는 packet schema를 먼저 고정하는 것이 중요하다.
- 로비 WebSocket과 매치 WebSocket을 분리하면 상태 복잡도를 줄일 수 있다.
- WebSocket client는 `send`, `sendAndReceive`, `subscribe`, `ping` 정도의 작은 API로 시작한다.
- packet handler는 전역 store에 직접 흩뿌리기보다 feature/page model에서 등록/해제한다.
- 게스트와 로그인 유저는 같은 `User` 모델로 다루되 권한만 분리한다.
- 빠른 시작은 `idle`, `matching`, `settled`, `countdown`, `transitioning`, `playing` 정도의 상태 머신으로 다루면 UI 전환이 단순해진다.
- 경기 화면은 `turn`, `wordHistory`, `missions`, `scoreboard`, `dictionaryEntry` 상태를 분리해 업데이트 단위를 작게 잡는다.

## 참고 링크

- kkutu.kr: https://kkutu.kr/
- 플레이 로비: https://kkutu.kr/play
- 로그인: https://kkutu.kr/account/sign-in
- 네이버 라운지: https://game.naver.com/lounge/kkutu
- 디스코드: https://discord.gg/daldalso-809809541385682964

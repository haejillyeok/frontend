# LLM Wiki Template

> 참고: https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f

선별한 원천 자료를 바탕으로 LLM이 유지하는 위키를 만들기 위한 재사용 가능한 템플릿.

원천 자료는 불변으로 두고, LLM이 구조화된 마크다운 위키를 유지하게 하며, `AGENTS.md`를 운영 스키마로 사용한다.

## 구조

- `raw/`는 사용자가 제공한 원천 자료를 위한 공간이다.
- `wiki/`는 LLM이 유지하는 지식을 위한 공간이다.
- `tools/`는 선택 사항이며, 검색이나 자동화가 필요해질 때까지 비워둬도 된다.

```text
.
├── AGENTS.md             # LLM Wiki 운영 스키마와 워크플로
├── README.md
├── raw/                  # 사용자가 선별한 불변 원천 자료
│   ├── README.md         # 원천 자료 관리 규칙
│   ├── assets/           # 이미지, 스크린샷, PDF, 첨부파일
│   └── sources/          # 기사, 노트, 녹취록, 내보내기 파일
├── tools/                # 선택적 헬퍼 스크립트와 로컬 검색 도구
│   └── README.md         # 도구 추가 기준과 예시
└── wiki/                 # LLM이 생성하고 유지하는 위키 본문
    ├── _templates/       # 위키 페이지 유형별 작성 템플릿
    ├── concepts/         # 아이디어, 이론, 용어, 패턴
    ├── entities/         # 사람, 조직, 제품, 장소 등 명명된 대상
    ├── questions/        # 오래 보존할 질문과 답변
    ├── sources/          # 원천 자료별 요약
    ├── syntheses/        # 여러 원천을 엮은 분석과 종합
    ├── index.md          # 위키 콘텐츠 카탈로그
    ├── log.md            # 위키 작업 기록
    ├── README.md         # 위키 디렉터리 안내
    └── overview.md       # 위키의 최상위 종합
```

## 빠른 시작

1. 원천 문서를 `raw/sources/`에 추가한다.
2. LLM 에이전트에게 `AGENTS.md`를 기준으로 원천 자료를 위키에 반영하라고 요청한다.
3. 생성된 위키를 `wiki/index.md`에서 탐색한다.
4. 오래 보존할 분석은 `wiki/syntheses/` 또는 `wiki/questions/`에 남긴다.

## 워크플로 요청 예시

### ingest

새 원천 자료를 위키에 반영할 때 사용한다.

권장 방식은 원천을 먼저 `raw/sources/`에 저장한 뒤 ingest를 요청하는 것이다.

```text
raw/sources/practical-react-query.md를 AGENTS.md의 ingest 워크플로에 따라 위키에 반영해줘.
TanStack Query의 핵심 개념은 wiki/concepts/에, 관련 인물이나 프로젝트는 wiki/entities/에 정리해줘.
```

`raw/sources/practical-react-query.md`에는 원문 링크와 수집일을 함께 남긴다.

```md
# Practical React Query

Source: https://tkdodo.eu/blog/practical-react-query
Author: Dominik Dorfmeister (TkDodo)
Captured: 2026-06-18

원문 본문 또는 주요 발췌/메모
```

빠르게 확인할 때는 링크만 주고 ingest를 요청할 수도 있다.

```text
다음 글을 읽고 AGENTS.md의 ingest 워크플로에 따라 위키에 반영해줘.

https://tkdodo.eu/blog/practical-react-query

이 글은 TanStack Query를 이해하기 위한 원천 자료로 다루고,
핵심 개념은 wiki/concepts/에, 관련 인물이나 프로젝트는 wiki/entities/에 정리해줘.
```

### query

이미 정리된 위키를 바탕으로 질문에 답하거나, 보존할 만한 답변을 남길 때 사용한다.

```text
AGENTS.md의 query 워크플로에 따라 "이 프로젝트의 핵심 설계 원칙은 무엇인가?"에 답해줘.
답변에 사용한 위키 페이지를 링크로 인용하고, 오래 보존할 가치가 있으면 wiki/questions/에 저장해줘.
```

위키에 근거가 없는 질문이라면 바로 답을 지어내지 말고, 추가할 원천 후보를 찾도록 요청한다.

```text
AGENTS.md의 query 워크플로에 따라 "TanStack Query에서 staleTime과 gcTime은 어떻게 다르게 써야 하나?"에 답해줘.
위키에 근거가 없으면 웹에서 신뢰할 만한 자료를 찾아보고,
그 자료를 raw/sources/에 추가할 후보로 정리해줘.
```

### lint

위키의 누락, 모순, 오래된 주장, 고아 페이지를 점검할 때 사용한다.

```text
AGENTS.md의 lint 워크플로에 따라 wiki/ 상태를 점검해줘.
모순, 고아 페이지, 누락된 교차 참조, 추가 원천 자료가 필요한 부분을 찾아서 정리해줘.
의미 있는 점검 결과는 log.md에 기록해줘.
```

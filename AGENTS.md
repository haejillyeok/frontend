## 프로젝트 개요

- 이 프로젝트는 WebSocket을 활용한 끝말잇기 게임 웹 프론트엔드다.
- 일반 앱 개발 작업은 Next.js App Router와 Feature-Sliced Design 구조를 기준으로 진행한다.
- 루트 `app/`은 Next.js 라우팅 전용이고, `src/app/`은 FSD app layer다.
- LLM Wiki 관련 작업은 `llm-wiki/` 내부에서만 진행하고, `llm-wiki/AGENTS.md`의 지침을 따른다.
- `llm-wiki/raw/`는 위키 원천 자료 레이어이므로, 사용자가 명시적으로 요청하지 않는 한 수정하지 않는다.

## 작업 기준

- FSD 구조로 작업할 때는 `docs/fsd-architecture.md`를 따른다.
- 커밋을 만들 때는 `docs/commit-convention.md`를 따른다.

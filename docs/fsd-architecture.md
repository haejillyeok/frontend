# Feature-Sliced Design Architecture

이 프로젝트는 Next.js App Router와 Feature-Sliced Design을 함께 사용한다.

참고: [Usage with Next.js - App Router](https://fsd.how/docs/guides/tech/with-nextjs/#app-router)

## 기본 구조

- 루트 `app/`은 Next.js App Router 전용이다.
- 루트 `pages/`는 비어 있는 Pages Router placeholder다.
- `src/app/`은 FSD app layer다.
- `src/pages/`는 FSD pages layer다.
- `widgets/`, `features/`, `entities/`, `shared/`는 실제 필요가 생길 때 만든다.

## 라우팅 규칙

루트 `app/*` route 파일은 가능한 한 얇게 유지한다. 페이지 UI, 상태, API
호출, page-specific logic은 `src/pages/{slice}`에 둔다.

```ts
export { HomePage as default } from "@/pages/home";
```

## Public API

FSD slice 외부에서는 slice의 `index.ts`만 import한다.

```ts
import { HomePage } from "@/pages/home";
```

slice 내부의 `ui/`, `model/`, `api/`, `lib/` 파일을 외부에서 직접 import하지
않는다.

## 최소 레이어 원칙

코드는 사용되는 곳에 먼저 둔다. 현재 한 페이지에서만 쓰이는 UI나 로직은
`src/pages/{slice}`에 유지하고, 여러 곳에서 실제 재사용될 때만 더 낮은
레이어로 추출한다.

## LLM Wiki

FSD 구조 변경은 프로젝트 아키텍처 규칙이므로 `AGENTS.md`와 `docs/`에 기록한다.
LLM Wiki는 개인 지식 보존이 필요할 때만 별도로 업데이트한다.

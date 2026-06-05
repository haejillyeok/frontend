# 프론트엔드 스타일링 정책

## 요약

현재 UI 스타일링은 PaperCSS를 우선 사용하고 Tailwind를 보조로 사용한다. 단, PaperCSS는 임시로 채택한 라이브러리이므로 직접 의존을 제한한다.

## 정의

이 프로젝트의 프론트엔드 스타일링 정책은 PaperCSS의 기본 UI 표현을 활용하되, 반복되는 UI를 전용 컴포넌트로 감싸 PaperCSS 교체 비용을 낮추는 기준이다.

## 핵심 사항

- 현재 UI 스타일링은 PaperCSS를 우선 사용한다.
- Tailwind는 레이아웃, 간격, 반응형 보정처럼 PaperCSS가 담당하지 않는 영역에 제한적으로 사용한다.
- `shadow`, `border`, `button`, `paper`처럼 PaperCSS와 Tailwind가 충돌할 수 있는 표현 스타일은 PaperCSS 기준을 우선한다.
- PaperCSS 내부 Google Fonts `@import` 규칙을 지키기 위해 전역 CSS에서는 PaperCSS를 Tailwind보다 먼저 불러온다.
- import 순서만으로 PaperCSS 우선순위를 만들지 않고, 충돌하는 표현 스타일은 전역 보정 CSS나 전용 UI 컴포넌트 내부 구현으로 PaperCSS 기준을 유지한다.
- PaperCSS는 임시 라이브러리이므로 페이지나 기능 코드가 PaperCSS 클래스에 과하게 직접 의존하지 않게 한다.
- 반복되는 UI나 충돌 가능성이 있는 PaperCSS 클래스는 전용 UI 컴포넌트로 만들고, PaperCSS 클래스는 그 컴포넌트 내부에 모은다.
- 나중에 PaperCSS를 제거하거나 교체할 때 컴포넌트 내부만 바꾸는 것을 목표로 한다.

## 결정 기록

- Tailwind를 먼저 import하고 PaperCSS를 나중에 import하면 PaperCSS 스타일이 더 높은 우선순위를 갖지만, PaperCSS 내부 Google Fonts `@import`가 Tailwind가 생성한 규칙 뒤에 위치한다.
- 이 경우 빌드에서 `@import rules must precede all rules aside from @charset and @layer statements` 경고나 에러가 발생할 수 있다.
- 따라서 전역 CSS에서는 PaperCSS를 먼저 import하고, 충돌하는 표현 스타일만 별도 보정 CSS나 전용 UI 컴포넌트로 PaperCSS 기준을 유지한다.

## 관련 원천 자료

- 추가 예정.

## 관련 엔티티

- 추가 예정.

## 열린 질문

- PaperCSS 기반 전용 UI 컴포넌트를 둘 디렉터리 구조는 아직 정하지 않았다.

# 로그

위키 활동을 시간순으로 기록하는 추가 전용 로그다.

항목은 다음 형식을 사용한다.

```md
## [YYYY-MM-DD] ingest | 원천 자료 제목

- 원천 자료: `raw/sources/source-file.md`
- 업데이트: [[source-page]], [[concept-page]]
- 메모: 변경된 내용의 짧은 요약.
```

## [2026-06-05] setup | 초기 템플릿 구조

- 기본 LLM Wiki 구조를 만들었다.
- 원천 자료, 위키, 템플릿, 도구 디렉터리를 추가했다.

## [2026-06-05] update | 프론트엔드 스타일링 정책

- 업데이트: [[frontend-styling-policy]], [[index]]
- 메모: 임시 UI CSS 라이브러리 우선 사용과 직접 의존 제한 원칙을 추가했다.

## [2026-06-09] update | 프론트엔드 스타일링 정책

- 업데이트: [[frontend-styling-policy]], [[index]]
- 메모: 스타일링 정책을 Tailwind 기준으로 갱신하고 외부 UI CSS 프레임워크 직접 의존 흔적을 제거했다.

## [2026-06-09] update | shadcn/ui 스타일링 기준

- 업데이트: [[frontend-styling-policy]], [[index]]
- 메모: shadcn/ui를 공용 UI 컴포넌트의 기본 스타일링 라이브러리로 사용할 계획을 추가했다.

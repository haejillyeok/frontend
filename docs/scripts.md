# Scripts

프로젝트에서 자주 쓰는 npm script 사용법을 정리한다.

## 이미지 WebP 변환

non-WebP 이미지를 WebP 파일로 변환한다.

```bash
pnpm image:webp -- <input-path> [output-path] [--quality N]
```

스크립트 파일에는 `#!/usr/bin/env node` shebang이 있어서 터미널에서 직접 실행할 수도 있다.

```bash
./scripts/convert-image-to-webp.mjs <input-path> [output-path] [--quality N]
```

`output-path`를 생략하면 입력 파일과 같은 디렉터리에 같은 파일명으로 `.webp` 파일을 만든다.

```bash
pnpm image:webp -- src/pages/home/ui/hero-bg.png
# src/pages/home/ui/hero-bg.webp 생성
```

출력 경로를 직접 지정할 수도 있다.

```bash
pnpm image:webp -- src/pages/home/ui/hero-bg.png src/pages/home/ui/hero-bg.webp
```

기본 품질은 `85`다. `--quality`는 `1`부터 `100`까지의 정수만 허용한다.

```bash
pnpm image:webp -- src/pages/home/ui/hero-bg.png --quality 90
```

출력 파일이 이미 있으면 덮어쓰지 않고 파일명에 숫자를 붙여 새 파일을 만든다.

예를 들어 `hero-bg.webp`가 이미 있으면 `hero-bg (1).webp`를 만들고, 그 파일도 있으면 `hero-bg (2).webp`를 만든다.

제약:

- 입력 파일은 `.webp`가 아니어야 한다.
- 입력 확장자는 `.jpeg`, `.jpg`, `.png` 중 하나여야 한다.
- 애니메이션 이미지(`.apng`, `.gif`)는 지원하지 않는다.
- 출력 경로는 `.webp`로 끝나야 한다.
- 출력 디렉터리가 없으면 자동으로 생성한다.
- 기존 출력 파일은 덮어쓰지 않는다.

변환이 끝나면 원본 크기, 출력 크기, 절감률을 출력한다.

## API 클라이언트 생성

OpenAPI 스키마에서 API 클라이언트를 생성한다.

```bash
pnpm api:generate
```

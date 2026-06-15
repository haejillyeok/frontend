# Fonts

이 프로젝트의 웹폰트는 `public/fonts/`에 둔다. `public/`은 Next.js 정적 파일
영역이며 FSD layer에 포함되지 않는다.

## Galmuri v2.40.3

위치: `public/fonts/Galmuri-v2.40.3/`

Galmuri는 픽셀 스타일 한글 UI에 쓰기 위한 웹폰트다. 현재는 브라우저 배포에
필요한 `.woff2` 파일만 남긴다.

| File | Font family | 용도 |
| --- | --- | --- |
| `Galmuri7.woff2` | `Galmuri7` | 작은 픽셀 텍스트 |
| `Galmuri9.woff2` | `Galmuri9` | 작은 UI 텍스트 |
| `Galmuri11.woff2` | `Galmuri11` | 기본 본문, 게임 UI |
| `Galmuri11-Bold.woff2` | `Galmuri11` | `font-weight: 700` 강조 텍스트 |
| `Galmuri11-Condensed.woff2` | `Galmuri11` | 좁은 폭이 필요한 텍스트 |
| `Galmuri14.woff2` | `Galmuri14` | 큰 제목, 픽셀 타이틀 |
| `GalmuriMono7.woff2` | `GalmuriMono7` | 작은 고정폭 숫자/코드 |
| `GalmuriMono9.woff2` | `GalmuriMono9` | 점수판, 타이머, 자리 맞춤 UI |
| `GalmuriMono11.woff2` | `GalmuriMono11` | 큰 고정폭 숫자/코드 |

일반 `Galmuri` 계열은 글자별 폭이 다르다. 문장, 버튼, 제목처럼 자연스러운
조판이 필요한 곳에 쓴다.

`GalmuriMono` 계열은 영문/숫자 폭이 고정된다. 점수, 타이머, 코드, 표처럼
자릿수 정렬이 중요한 곳에 쓴다.

## Solmoe KimDaeGeon

위치: `public/fonts/font_kdg/`

솔뫼 김대건체는 Light와 Medium 두 굵기를 사용한다. 앱에서 쓰는 OTF 기반
`.woff2` 변환본만 보관한다.

| File | 용도 |
| --- | --- |
| `solmoe-kimdaegeon-otf-light.woff2` | `font-weight: 300` |
| `solmoe-kimdaegeon-otf-medium.woff2` | `font-weight: 500` |

## Next.js 사용 기준

폰트 적용은 `next/font/local`로 관리한다. `public/` 아래 파일을 직접 URL로
참조하는 `@font-face`를 전역 CSS에 추가하지 않는다.

현재 활성 Tailwind 유틸리티는 다음과 같다.

| Class | Source | 용도 |
| --- | --- | --- |
| `font-galmuri` | `Galmuri11.woff2`, `Galmuri11-Bold.woff2` | 일반 Galmuri11 텍스트 |
| `font-galmuri-condensed` | `Galmuri11-Condensed.woff2` | 좁은 폭 Galmuri11 텍스트 |
| `font-kimdaegeon` | `solmoe-kimdaegeon-otf-light.woff2`, `solmoe-kimdaegeon-otf-medium.woff2` | 기본 본문 폰트 |

```tsx
<p className="font-galmuri font-normal">기본 갈무리</p>
<p className="font-galmuri font-bold">굵은 갈무리</p>
<p className="font-galmuri-condensed">좁은 갈무리</p>
<p className="font-kimdaegeon font-light">김대건 Light</p>
<p className="font-kimdaegeon font-medium">김대건 Medium</p>
```

프로젝트 기본 폰트는 `font-kimdaegeon font-light`다. `body`에 적용해 전체 앱에
상속한다.

`font-galmuri`는 `font-bold`와 함께 쓰면 `Galmuri11-Bold.woff2`를 사용한다.
`font-black`은 대응하는 900 weight 파일이 없으므로 쓰지 않는다.

`font-galmuri-condensed`는 400 weight만 있다. `font-bold`와 함께 쓰면 브라우저가
굵기를 합성할 수 있으므로 좁은 폭 텍스트는 기본 weight로 사용한다.

`font-kimdaegeon`은 300, 500 weight만 있다. `font-bold`, `font-black`은 대응
파일이 없으므로 쓰지 않는다.

## 관리 기준

- `.woff2`는 웹 배포용으로 유지한다.
- `.ttf`, `.bdf`, `.ttc`는 브라우저 배포에 필수는 아니므로 커밋하지 않는다.
- `.DS_Store`는 macOS 메타파일이므로 커밋하지 않는다.
- `galmuri.css`는 원본 참고용이다. 앱에서는 import하지 않는다.
- `LICENSE.txt`는 Galmuri 폰트 라이선스 고지이므로 폰트 파일과 함께 유지한다.

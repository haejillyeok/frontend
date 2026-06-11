# 해질녘 컬러 팔레트

`ComingSoonPage`의 해질 무드를 서비스 전반에서 재사용하기 위한 기본 팔레트다.
검은 밤색, 청보라, 붉은 석양, 노란 잔광, 종이빛 텍스트를 중심으로 잡는다.

## Core Tokens

| Token | Hex | Tailwind class | Role |
| --- | --- | --- | --- |
| Gloaming Ink | `#171925` | `hae-ink` | 기본 배경, 최상위 밤색 |
| Blue Hour | `#202844` | `hae-blue-hour` | 섹션 배경, 깊이감 |
| Dusk Plum | `#3f2c47` | `hae-plum` | 전환 영역, 패널 표면 |
| Horizon Ember | `#f26b38` | `hae-ember` | 주요 CTA, 강조 상태 |
| Last Gold | `#ffd166` | `hae-gold` | 선택, 하이라이트, 포커스 |
| Moon Paper | `#f8f3ea` | `hae-paper` | 어두운 배경 위 본문 텍스트 |

## Support Token

| Token | Hex | Tailwind class | Role |
| --- | --- | --- | --- |
| Open Mint | `#78c6a3` | `hae-mint` | 접속, 성공, 열림 상태 |

`hae-mint`는 브랜드 주색이 아니라 상태색이다. 큰 면적에는 쓰지 않는다.

## Usage

- 기본 화면은 `hae-ink` 또는 `hae-blue-hour` 위에 `hae-paper` 텍스트를 둔다.
- 주요 행동은 `hae-ember`, 선택된 상태와 키보드 포커스는 `hae-gold`를 우선한다.
- `hae-plum`은 카드보다 섹션 전환, 사이드 패널, 모달 배경에 더 잘 맞는다.
- 밝은 화면이 필요하면 `hae-paper`를 배경으로 쓰고, 텍스트는 `hae-ink`로 둔다.
- 석양 무드는 `--hae-gradient-sunset`을 쓰되, 한 화면에서 한 번만 사용한다.

## Signature

브랜드의 기억점은 `해넘이 경계선`이다. 보라에서 주황으로 부드럽게 가다가
72~73% 지점에서 밤색으로 급격히 떨어지는 그래디언트가 준비중 페이지의 정서를
가장 잘 보존한다. 이 급격한 경계는 평범한 보라-주황 그래디언트로 흐려지지 않게
서비스 메인 화면에서도 한 곳에만 강하게 쓴다.

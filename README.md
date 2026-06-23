# 🦷 JH의 덴탈시냅스

임상 치과 레퍼런스를 한곳에 모은 **확장형 노트 허브**입니다. 메인(`index.html`)이 허브이고,
각 주제는 **하위 페이지**로 분리되어 계속 추가됩니다. 공용 디자인(`assets/theme.css`)과
다크모드(`assets/theme.js`, 사이트 전역 동기화)를 모든 페이지가 공유합니다.

> 기준: 국내 처방 관행 + 국제 가이드라인 · 언어: 한국어 · 개인 임상 노트

## 페이지 구성
| 페이지 | 파일 | 내용 |
|---|---|---|
| 🏠 **메인 허브** | `index.html` | JH의 덴탈시냅스 — 노트 카드 그리드 + 검색. 하위 페이지 진입점 |
| 💊 **치과 약물·처방 가이드** | `drug-guide.html` | 술식·상황별 처방 프로토콜(21종), 약물 카탈로그(14분류), 페니실린 알러지 대체, 소아 용량, 의사결정 맵(Mermaid), 응급, **구강내과 복약지도**, 신경손상 스테로이드 Tapering |
| 🦴 **MRONJ 임상권고안 2025** | `mronj.html` | 약물관련 악골괴사 **원문 기반 상세** — **약물별 한눈 정리** + 진단·병인·위험요인·예방/휴약(BP·데노수맙)·병기·보존/수술·테리파라타이드·재발·의사결정. 근거등급 뱃지([권고]/[전문가 의견]/[근거 제한]) (Korean MRONJ Position Paper 2025) |

## 열람 방법
- **온라인**: 저장소가 GitHub Pages로 배포되면 루트 주소로 접속 시 메인 허브(`index.html`)가 열립니다.
- **로컬**:
  ```bash
  python3 -m http.server 8000
  # http://localhost:8000/  → 메인 허브
  ```
- 약물 가이드의 다이어그램은 [Mermaid](https://mermaid.js.org/) CDN을 사용하므로 최초 렌더 시 인터넷이 필요합니다(텍스트 콘텐츠는 오프라인 동작).

## 새 하위 페이지 추가 (확장 방법)
1. `새페이지.html` 생성 — `<head>`에 공용 테마 연결:
   ```html
   <link rel="stylesheet" href="assets/theme.css" />
   <!-- ...본문... -->
   <script src="assets/theme.js"></script>
   ```
   헤더에 `index.html`로 돌아가는 `.crumb` 링크와 `#theme` 토글 버튼을 두면 사이트와 일관됩니다.
2. `index.html`의 `notes` 배열에 한 줄 추가하면 허브 카드가 자동 생성됩니다:
   ```js
   { title:'제목', href:'새페이지.html', icon:'🦷', accent:'#0f6e8c', tag:'분류',
     desc:'한 줄 설명', keywords:'검색 키워드' },
   ```

## 파일 구조
```
index.html          # 메인 허브 (덴탈시냅스)
drug-guide.html     # 하위: 약물·처방 가이드
mronj.html          # 하위: MRONJ 임상권고안 2025
assets/theme.css    # 디자인 시스템(토큰: 타입 스케일·시맨틱 색·간격·컴포넌트·반응형 표)
assets/theme.js     # 공용 다크모드(전역 'dds-theme' 동기화)
assets/charts.js    # 경량 SVG 차트(범위막대·타임라인·심각도·계단·피라미드)
assets/icons.svg    # 커스텀 아이콘 스프라이트(<use href="assets/icons.svg#i-...">)
assets/favicon.svg  # 시냅스 로고 마크
```
디자인은 `theme.css`의 CSS 토큰으로 통일(인디고 브랜드 + 상태색), 다크모드 자동 대응. 정량 데이터는 `charts.js`로 표 대신 시각화.

## ⚠️ 면책 고지
본 노트는 **개인 정리 목적**이며 식약처 허가사항·최신 가이드라인·개별 임상판단을 대체하지 않습니다.
처방·시술 전 **원전과 환자 상태(연령·체중·신/간 기능·병력·복용약)**를 반드시 확인하십시오.

## 출처(요약)
ADA Oral Health Topics · ADA 2019/2024 가이드 · AHA 2021 IE 예방 · AAPD Reference Manual ·
NeuPSIG 2015(Lancet Neurol) · 약업신문 · **Korean MRONJ Position Paper 2025 (onjcohort.org)** ·
식약처/health.kr · 대한치과의사협회·치의신보. 각 페이지 하단/내부 참고문헌 참조.

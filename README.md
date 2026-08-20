# 🦷 JH의 덴탈시냅스

치과 임상에서 자주 부딪히는 판단을 **약물·질환·술식·응급·진단 흐름**으로 연결한 확장형 개인 레퍼런스입니다.
메인 `index.html`이 시각형 허브이며, 각 주제는 독립 HTML 노트로 계속 확장됩니다.

> 기준: 국내 임상 맥락 + 국제 가이드라인 · 언어: 한국어 · 용도: 개인 임상 정리

## 2026-08 시각화 업데이트

- 메인 허브를 단순 카드 목록에서 **임상 지식 대시보드**로 개편
- 전체 검색 + 분야별 필터(약물·안전 / 임플란트·보철 / 진단·코드 / 전신질환)
- 신규 노트 스포트라이트와 자주 쓰는 임상 바로가기 추가
- 카드에 업데이트 연도·깊이·분류·NEW 상태 표시
- 모바일·태블릿 반응형, 키보드 검색(`/`, `Esc`), 다크모드 유지
- 공용 시각화 레이어 `assets/visual.css` 추가

## 페이지 구성

| 페이지 | 파일 | 내용 |
|---|---|---|
| 🏠 **메인 허브** | `index.html` | 9개 임상 노트를 검색·필터·바로가기로 탐색하는 시각형 대시보드 |
| 🦷 **임플란트 주위질환·합병증** | `peri-implant.html` | **신규** — 건강/점막염/주위염 진단, 기준 탐침·방사선, 위험평가, 예방, 비수술·수술, 기계적 합병증, SPIC 유지관리, 차팅 템플릿 |
| 💊 **치과 약물·처방 가이드** | `drug-guide.html` | 술식·상황별 처방 프로토콜, 약물 카탈로그, 알레르기 대체, 소아 용량, 응급·구강내과 복약지도 |
| 🦴 **MRONJ 임상권고안 2025** | `mronj.html` | 약물관련 악골괴사 — 진단·위험요인·예방/휴약·병기·보존/수술·재발·의사결정 |
| 🫦 **교합학 (Occlusion)** | `occlusion.html` | CR/MIP·하악운동·교합 양식·교합기·임플란트 교합·TMD·스플린트·선택삭제 |
| 💎 **최소삭제 라미네이트** | `veneer.html` | 적응증·삭제 연속선·재료·제작·접착 경로·브랜드·장기 근거 |
| 🩸 **항혈전제 환자 치과치료** | `antithrombotic.html` | 항혈소판제·Warfarin·DOAC의 시술 위험분류·중단/조정·국소 지혈·상호작용 |
| 📖 **KCD 치과 코드 뷰어** | `kcd.html` | K00–K14 및 관련 외상·기형·임플란트 합병증·보철 상태 코드 474개 검색·복사 |
| 🚨 **치과 진료 중 응급상황 대응** | `emergency.html` | 실신·아나필락시스·흉통·천식·저혈당·경련·기도폐쇄의 P-A-B-C-D, 약물, BLS |
| 🩺 **전신질환자 치과관리** | `systemic.html` | 심혈관·당뇨·투석·간·임신·내분비·항암·면역억제를 4축 위험으로 평가 |

## 신규 노트: 임플란트 주위질환·합병증

`peri-implant.html`은 텍스트 요약을 넘어 다음 요소를 한 페이지에 통합합니다.

- 건강–점막염–주위염 **3상태 단면 도식**
- 입력 소견에 반응하는 **교육용 진단 퀵체크**
- 기준 탐침·방사선 **추적 타임라인**과 6점 탐침 맵
- 환자·전신·보철·부위 요인의 **위험도 매트릭스**
- 점막염과 주위염의 **단계별 치료 경로**
- 비수술 종결 목표와 보조치료 **근거 강도 보드**
- 결손 형태별 접근/절제·재건·제거 **수술 선택 도식**
- 생물학적 질환과 나사 풀림·파절·잔여 시멘트 등 **기계적 합병증 감별**
- 위험별 3–6개월 SPIC 유지관리 타임라인
- 진료실 차팅 템플릿 원클릭 복사, 인쇄 최적화

### 핵심 근거

- Herrera D, et al. *J Clin Periodontol.* 2023 — EFP S3 prevention/treatment guideline
- Renvert S, et al. *J Clin Periodontol.* 2018 — case definitions and diagnostic considerations
- Berglundh T, et al. *J Clin Periodontol.* 2018 — 2017 World Workshop consensus
- AO/AAP 2024 Consensus Conference (published 2025) — summary report and clinical flowcharts
- Korean Academy of Periodontology narrative review, 2024

세부 DOI와 구현 자료는 `peri-implant.html` 하단 참고문헌에 수록했습니다.

## 파일 구조

```text
index.html             # 메인 시각형 허브
peri-implant.html      # 신규: 임플란트 주위질환·합병증
drug-guide.html        # 약물·처방
mronj.html             # MRONJ 2025
occlusion.html         # 교합학
veneer.html            # 라미네이트
antithrombotic.html    # 항혈전제
kcd.html               # KCD 코드 뷰어
emergency.html         # 응급상황
systemic.html          # 전신질환자 관리
assets/theme.css       # 공용 디자인 시스템
assets/visual.css      # 대시보드·임상 도식·치료 흐름·인쇄 시각화
assets/theme.js        # 공용 다크모드
assets/charts.js       # 경량 SVG 차트
assets/icons.svg       # 커스텀 아이콘 스프라이트
assets/favicon.svg     # 시냅스 로고
```

## 열람

```bash
python3 -m http.server 8000
# http://localhost:8000/
```

정적 HTML/CSS/JavaScript만으로 동작합니다. 일부 기존 노트의 Mermaid 다이어그램은 CDN 렌더링을 사용합니다.

## 새 노트 추가

1. 새 HTML에서 공용 스타일을 연결합니다.

```html
<link rel="stylesheet" href="assets/theme.css?v=4" />
<link rel="stylesheet" href="assets/visual.css?v=1" />
<script src="assets/theme.js"></script>
```

2. `index.html`의 `notes` 배열에 메타데이터를 추가합니다.

```js
{
  title: '새 노트',
  href: 'new-note.html',
  icon: 'i-book',
  accent: '#0f766e',
  tag: '분류',
  category: 'diagnosis',
  year: '2026',
  depth: '상세 정리',
  desc: '한 줄 설명',
  keywords: '검색 키워드'
}
```

## 면책

본 저장소는 개인 학습·임상 정리 목적이며 최신 가이드라인, 허가사항, 전문의 협진과 환자별 임상판단을 대체하지 않습니다. 처방·수술·침습 처치 전 환자의 연령·체중·장기기능·병력·복용약·치료 목표와 원전을 확인하십시오.

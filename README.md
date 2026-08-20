# 🦷 JH의 덴탈시냅스

임상 치과 레퍼런스를 한곳에 모은 **확장형 노트 허브**입니다. 메인(`index.html`)이 허브이고, 각 주제는 독립 하위 페이지로 분리해 계속 추가합니다.

> 기준: 국내 임상 환경 + 국제 가이드라인 · 언어: 한국어 · 개인 임상 노트

## 페이지 구성

| 페이지 | 파일 | 내용 |
|---|---|---|
| 🏠 **메인 허브** | `index.html` | 빠른 진입, 분야 필터, 통합 검색을 제공하는 임상 노트 허브 |
| 💊 **치과 약물·처방 가이드** | `drug-guide.html` | 술식·상황별 처방 프로토콜, 약물 카탈로그, 알레르기 대체, 소아 용량, 응급·구강내과 복약지도 |
| 🦴 **MRONJ 임상권고안 2025** | `mronj.html` | 약물관련 악골괴사의 진단·위험요인·예방/휴약·병기·보존/수술·재발·의사결정 |
| 🫦 **교합학 (Occlusion)** | `occlusion.html` | CR/MIP·하악운동·교합 양식·교합기·임플란트 교합·TMD·스플린트·교합조정 |
| 🦷 **측두하악장애와 저작근장애** | `tmd-mmd.html` | DC/TMD 기반 감별, 자가관리·약물·교합장치·운동·물리치료·주사·관절 술식 |
| 🦷 **임플란트 주위질환 · 합병증** | `peri-implant.html` | **텍스트 중심 임상 핸드북**. 건강·점막염·주위염 진단, 기준 탐침·방사선, 감별진단, 위험요인, 예방, 비수술·수술 치료, 보철·기계적 합병증, SPIC 유지관리, 차팅 템플릿 |
| 🧬 **PDRN 치과 임상 총정리** | `pdrn.html` | PDRN·PN 기전, 국내 치과 활용, TMD·임플란트·치주·발치·MRONJ 근거와 안전 |
| 🛠️ **현대 발치술과 발치 기구** | `extraction.html` | elevator·forceps부터 periotome·축방향 견인·piezosurgery·잔존치근·관상절제술 |
| 💎 **라미네이트 (베니어)** | `veneer.html` | 무삭제·최소삭제 베니어의 적응증·삭제·재료·제작·접착·브랜드·장기 근거 |
| 🩸 **항혈전제 환자 치과치료** | `antithrombotic.html` | 항혈소판제·Warfarin·DOAC 환자의 시술 출혈위험, 약물 조정, 국소 지혈과 상호작용 |
| 📖 **KCD 치과 코드 뷰어** | `kcd.html` | 치과 관련 KCD 코드 계층 검색·복사·교차참조 |
| 🚨 **치과 진료 중 응급상황 대응** | `emergency.html` | 실신·쇼크·아나필락시스·흉통·천식·저혈당·경련·기도폐쇄의 첫 대응, 응급약물, BLS |
| 🎗️ **암 치료 환자의 치과진료** | `cancer-care.html` | 암 수술·항암·방사선 전후 발치·임플란트, CBC 판단, ORN·MRONJ, 협진 기준 |
| 🩺 **전신질환자 치과관리** | `systemic.html` | 심혈관·당뇨·신장·간·임신·내분비·항암·면역억제 환자의 치과관리 |

## 임플란트 주위질환 노트 편집 원칙

`peri-implant.html`은 잘못된 해부학적·임상적 인상을 줄 수 있는 자체 SVG 도식과 인터랙티브 시각화를 사용하지 않습니다.

- 진단 기준과 감별은 텍스트·표·체크리스트로 명확하게 기술
- 한 번의 PD나 방사선 한 장보다 **기준 대비 변화**를 강조
- 생물학적 질환과 보철·기계적 합병증을 분리해서 평가
- 특정 기구·보조제보다 원인조절과 청결 가능한 구조를 우선
- 실제 이미지가 필요할 경우 별도의 검증된 이미지 애셋을 사용하는 방향으로 확장

## 열람 방법

- **온라인**: GitHub Pages 배포 시 루트 주소의 `index.html`이 메인 허브입니다.
- **로컬**:
  ```bash
  python3 -m http.server 8000
  # http://localhost:8000/
  ```
- 약물 가이드의 일부 다이어그램은 Mermaid CDN을 사용합니다.

## 새 하위 페이지 추가

1. 새 HTML 파일을 만들고 공용 테마를 연결합니다.
   ```html
   <link rel="stylesheet" href="assets/theme.css" />
   <script src="assets/theme.js"></script>
   ```
2. `index.html`의 `notes` 배열에 메타데이터를 추가하면 메인 허브에 노출됩니다.

## 파일 구조

```text
index.html          # 메인 허브
drug-guide.html     # 약물·처방
mronj.html          # MRONJ
occlusion.html      # 교합학
tmd-mmd.html        # TMD·MMD
peri-implant.html   # 임플란트 주위질환·합병증 — 텍스트 중심
pdrn.html           # PDRN
extraction.html     # 발치술·기구
veneer.html         # 라미네이트
antithrombotic.html # 항혈전제
kcd.html            # KCD 코드
emergency.html      # 응급상황
cancer-care.html    # 암 치료 환자
systemic.html       # 전신질환
assets/theme.css    # 공용 디자인 시스템
assets/theme.js     # 다크모드·모바일 목차·읽기 진행도
assets/charts.js    # 기존 노트에서 사용하는 경량 차트
assets/icons.svg    # 공용 아이콘 스프라이트
assets/favicon.svg  # 사이트 아이콘
```

## 면책 고지

본 노트는 **개인 정리 및 임상 보조 목적**이며 식약처 허가사항·최신 가이드라인·개별 임상판단을 대체하지 않습니다. 처방·시술 전 원전과 환자 상태를 확인하십시오.

## 주요 출처

ADA Oral Health Topics · AHA · AAPD · Korean MRONJ Position Paper 2025 · 2017 World Workshop · EFP S3 Peri-implant Guideline · AO/AAP Consensus · Korean Academy of Periodontology · 식약처/health.kr · 대한치과의사협회·치의신보. 각 페이지의 참고문헌을 우선합니다.

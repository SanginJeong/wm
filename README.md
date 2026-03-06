<div align="center">

# 🛍️ WONDERMALL

**AI-Powered Fashion & Lifestyle E-Commerce · Frontend Only**

[![Version](https://img.shields.io/badge/version-2.0.0-6c63ff?style=flat-square)](.)
[![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)](.)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript)](.)
[![pnpm](https://img.shields.io/badge/pnpm-monorepo-f69220?style=flat-square&logo=pnpm)](.)
[![Playwright](https://img.shields.io/badge/tested_with-Playwright-45ba4b?style=flat-square&logo=playwright)](.)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](.)

_오픈 API 연동 기반 · Web 전용 ·_

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Environment Variables](#-environment-variables)
- [Architecture](#-architecture)
- [User Flow](#-user-flow)
- [Conventions](#-conventions)
- [Roadmap](#-roadmap)

---

## 🎯 Overview

WONDERMALL은 **백엔드 없이 오픈 API 연동만으로 운영**하는 프론트엔드 전용 패션 커머스 플랫폼입니다.  
별도 앱 없이 PWA 하나로 모바일/데스크탑을 모두 커버합니다.

### 🔌 연동 오픈 API

| 분류 | API                                 | 용도                    |
| ---- | ----------------------------------- | ----------------------- |
| 상품 | Fake Store API → Shopify Storefront | 상품 목록·상세          |
| 결제 | 토스페이먼츠                        | 카드·간편결제·할부      |
| 인증 | 카카오·구글 OAuth                   | 소셜 로그인             |
| 검색 | Algolia                             | 자동완성·필터·정렬      |
| 배송 | 스마트택배 API                      | 운송장 기반 실시간 추적 |

---

## 🛠 Tech Stack

### Core

|               | 기술           | 버전 | 비고                |
| ------------- | -------------- | ---- | ------------------- |
| 패키지 매니저 | **pnpm**       | 9+   | Monorepo workspace  |
| 언어          | **TypeScript** | 5    | strict mode         |
| 번들러        | **Vite**       | 6    | 빠른 HMR            |
| 프레임워크    | **React**      | 19   | Concurrent Features |

### UI / Styling

|            | 기술              | 비고                                        |
| ---------- | ----------------- | ------------------------------------------- |
| 컴포넌트   | **MUI (Material UI)** | Emotion 기반 컴포넌트 라이브러리        |
| 스타일     | **Emotion**       | CSS-in-JS (MUI 스타일 엔진과 동일)          |
| 애니메이션 | **Framer Motion** | 페이지 전환·카드 인터랙션                   |

### State & Data Fetching

|                 | 기술                  | 역할                               |
| --------------- | --------------------- | ---------------------------------- |
| 서버 상태       | **TanStack Query v5** | API 캐싱·동기화·`useInfiniteQuery` |
| 클라이언트 상태 | **Zustand**           | 장바구니·인증·UI 전역 상태         |
| 폼              | **React Hook Form**   | 비제어 폼 핸들링                   |
| 유효성 검증     | **Zod**               | 스키마 정의 + TS 타입 추론         |

### Networking

|      | 기술      | 비고                           |
| ---- | --------- | ------------------------------ |
| HTTP | **axios** | 인터셉터로 토큰 주입·에러 처리 |

### Routing & Performance

|        | 기술                  | 비고                           |
| ------ | --------------------- | ------------------------------ |
| 라우터 | **React Router v7**   | Data API 패턴 활용             |
| 가상화 | **@tanstack/virtual** | 상품 목록 50개+ 렌더링 최적화  |
| 날짜   | **date-fns**          | 배송 예정일·프로모션 기간 처리 |

### Testing

|     | 기술           | 범위                               |
| --- | -------------- | ---------------------------------- |
| E2E | **Playwright** | 로그인·구매·마이페이지 핵심 플로우 |

### Code Quality

|        | 기술           | 비고                      |
| ------ | -------------- | ------------------------- |
| 린터   | **ESLint v9**  | flat config               |
| 포매터 | **Prettier**   |                           |
| 커밋   | **Commitlint** | conventional commits 강제 |

### Infra / Monitoring

|             | 기술                    | 비고                |
| ----------- | ----------------------- | ------------------- |
| CI/CD       | **GitHub Actions**      | PR 검증 + 자동 배포 |
| 호스팅      | **AWS S3 + CloudFront** | 정적 배포 + CDN     |
| 에러 트래킹 | **Sentry**              | 런타임 에러 수집    |

---

## 📁 Project Structure

```
wondermall/
├── apps/
│   └── web/                          # 메인 React 앱 (Vite + PWA)
│       ├── src/
│       │   ├── app/                  # 앱 진입점, 라우터 설정
│       │   ├── components/           # 앱 전용 공용 컴포넌트
│       │   │   └── layout/           # Header, Footer, Layout (Outlet 래퍼)
│       │   ├── pages/                # 페이지 단위 컴포넌트 (라우트 1:1 대응)
│       │   │   ├── home/             # /
│       │   │   ├── category/         # /category/:slug
│       │   │   ├── product/          # /product/:id
│       │   │   ├── search/           # /search
│       │   │   ├── cart/             # /cart
│       │   │   ├── order/            # /order, /order/complete
│       │   │   ├── mypage/           # /mypage/*
│       │   │   ├── auth/             # /auth/*
│       │   │   └── faq/              # /FAQ
│       │   ├── features/             # 도메인별 기능 모듈
│       │      ├── auth/
│       │       │   ├── components/
│       │       │   ├── hooks/
│       │       │   └── stores/       # Zustand authStore
│       │       ├── product/
│       │       │   ├── components/
│       │       │   ├── hooks/        # useProductList, useProductDetail
│       │       │   └── stores/       # Zustand wishlistStore
│       │       ├── cart/
│       │       │   ├── components/
│       │       │   └── stores/       # Zustand cartStore
│       │       ├── order/
│       │       └── search/
│       │
│       │
│       │
│       │
│       │
│       │
│       ├── e2e/                      # Playwright E2E 테스트
│       │   ├── auth.spec.ts
│       │   ├── product.spec.ts
│       │   └── checkout.spec.ts
│       ├── playwright.config.ts
│       └── vite.config.ts
│
├── packages/
│   ├── ui/                           # 공용 MUI 기반 컴포넌트
│   │   └── src/components/
│   ├── hooks/                        # 공용 커스텀 훅
│   ├── api/                          # axios 인스턴스 + API 함수
│   │   └── src/
│   │       ├── client.ts             # axios 인스턴스·인터셉터
│   │       ├── product.ts
│   │       ├── order.ts
│   │       └── auth.ts
│   ├── types/                        # 공용 TypeScript 타입 + Zod 스키마
│   └── config/                       # 공용 설정 파일
│       ├── eslint/
│       ├── prettier/
│       └── tsconfig/
│
├── .github/
│   └── workflows/
│       ├── ci.yml                    # PR: 린트 + 타입체크 + E2E
│       └── deploy.yml                # main 머지 → S3 배포 + CF 무효화
├── pnpm-workspace.yaml
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

```bash
node >= 20.0.0
pnpm >= 9.0.0
```

### Installation

```bash
# 1. 클론
git clone https://github.com/your-org/wondermall.git
cd wondermall

# 2. 패키지 일괄 설치 (전체 워크스페이스)
pnpm install

# 3. 환경변수 설정
cp apps/web/.env.example apps/web/.env.local
# .env.local 파일을 열어 키 값 입력 (아래 섹션 참고)

# 4. 개발 서버 실행
pnpm dev
```

---

## 📜 Available Scripts

```bash
# ── 개발 ──────────────────────────────────────────
pnpm dev                        # apps/web 개발 서버 (http://localhost:5173)
pnpm dev --filter=@wondermall/web # 특정 워크스페이스만 실행

# ── 빌드 ──────────────────────────────────────────
pnpm build                      # 전체 워크스페이스 빌드
pnpm preview                    # 빌드 결과물 로컬 프리뷰

# ── 테스트 ────────────────────────────────────────
pnpm test                       # Playwright E2E 전체 실행 (headless)
pnpm test:ui                    # Playwright UI 모드 (인터랙티브)
pnpm test:headed                # 브라우저 표시 모드
pnpm test:report                # HTML 리포트 열기

# ── 코드 품질 ──────────────────────────────────────
pnpm lint                       # ESLint 전체 검사
pnpm lint:fix                   # ESLint 자동 수정
pnpm format                     # Prettier 포매팅
pnpm typecheck                  # TypeScript 타입 검사 (빌드 없이)

# ── 패키지 관리 ────────────────────────────────────
pnpm add <pkg> --filter=@wondermall/web   # 특정 앱에 의존성 추가
pnpm add <pkg> --filter=@wondermall/ui    # 특정 패키지에 추가
pnpm add -D <pkg> -w                    # 루트 devDependency 추가
```

---

## 🔑 Environment Variables

```bash
# apps/web/.env.local

# ── 결제 (토스페이먼츠) ────────────────────────────
VITE_TOSS_CLIENT_KEY=test_ck_...         # 개발: test_ 접두사 키 사용

# ── 인증 (OAuth) ───────────────────────────────────
VITE_KAKAO_CLIENT_ID=
VITE_GOOGLE_CLIENT_ID=

# ── 검색 (Algolia) ─────────────────────────────────
VITE_ALGOLIA_APP_ID=
VITE_ALGOLIA_SEARCH_KEY=                 # Search-Only API Key (읽기 전용)

# ── 에러 트래킹 (Sentry) ───────────────────────────
VITE_SENTRY_DSN=

# ── 상품 API (운영 전환 시) ────────────────────────
VITE_SHOPIFY_STORE_DOMAIN=
VITE_SHOPIFY_STOREFRONT_TOKEN=

```

---

## 🏗 Architecture

### 상태 관리 전략

서버 상태와 클라이언트 상태를 명확히 분리합니다.

```
서버 상태 (API 데이터)       →  TanStack Query
  ├─ 상품 목록·상세           useInfiniteQuery / useQuery
  ├─ 주문 내역               useQuery + invalidateQueries
  └─ 배송 트래킹             useQuery (refetchInterval)

클라이언트 상태              →  Zustand
  ├─ authStore              인증 토큰·유저 정보 (persist)
  ├─ cartStore              장바구니 아이템 (persist)
  ├─ wishlistStore          찜 목록 (persist)
  └─ uiStore                모달·토스트 등 UI 임시 상태
```

### API 레이어

```
[ 컴포넌트·페이지 ]
        │  TanStack Query (useQuery / useInfiniteQuery / useMutation)
        ▼
[ packages/api ]   axios 함수 (product.ts / order.ts / auth.ts)
        │
        ▼
[ axios 인스턴스 ]  인터셉터: Authorization 헤더 주입 → 401 시 토큰 갱신 → Sentry 에러 전송
        │ -- 운영 오픈 API (Shopify / 토스 / Algolia / …)
```

### CI/CD 파이프라인

```
PR 생성
  └─ ci.yml
       ├─ pnpm install
       ├─ pnpm typecheck        TypeScript 오류 확인
       ├─ pnpm lint             ESLint 검사
       └─ pnpm test             Playwright E2E (headless Chromium)

main 브랜치 머지
  └─ deploy.yml
       ├─ pnpm build
       ├─ AWS S3 sync           빌드 산출물 업로드
       └─ CloudFront 캐시 무효화
```

---

## 🔄 User Flow

### Flow 1 · 회원가입 & 로그인

```
진입
 ├── [기존 회원]   이메일/PW 입력 → Zod 유효성 검증 → JWT → Zustand authStore
 ├── [소셜 로그인]  카카오·구글 OAuth → 토큰 저장 → 홈
 └── [신규 회원]   React Hook Form → Zod 검증 → 약관 동의 → 스타일 설문 → 홈
```

### Flow 2 · 상품 탐색 → 구매

```
홈
 ├── [검색]      Algolia 자동완성 → 검색 결과 (useInfiniteQuery + virtual)
 ├── [카테고리]   목록 페이지 (useInfiniteQuery + @tanstack/virtual)
 └── [AI 추천]   추천 피드 (Phase 2)
        └──→ 상품 상세 (useQuery, stale-time 5분)
               ├── [찜하기]  → Zustand wishlistStore
               └── [구매]    옵션 선택 (RHF + Zod)
                              └──→ Zustand cartStore
                                     └──→ 주문서 (RHF + Zod)
                                            └──→ 토스페이먼츠 SDK
                                                   ├── [성공]  /order/complete  →  invalidateQueries
                                                   └── [실패]  에러 토스트 + 재시도 안내
```

### Flow 3 · 주문 후 관리

```
주문 완료 → 카카오 알림톡·이메일 발송
  → 마이페이지 배송 트래킹 (스마트택배 API, refetchInterval 30s)
  → 배송 완료 푸시
       ├── [만족]    리뷰 작성 모달 → 포인트 100P 지급
       └── [불만족]  교환/반품 신청 폼 (React Hook Form)
```

### 예외 처리

| 시나리오  | 처리 방식                                                             |
| --------- | --------------------------------------------------------------------- |
| API 오류  | axios 인터셉터 → TanStack Query `onError` → 토스트 알림 + Sentry 전송 |
| 결제 실패 | 토스페이먼츠 에러 코드 파싱 → 재시도 or 다른 수단 안내                |
| 품절      | 옵션 선택 UI 비활성화 + 입고알림 등록 버튼 표시                       |
| 인증 만료 | 인터셉터 → 리프레시 토큰 갱신 시도 → 실패 시 `/auth/login` 리다이렉트 |
| 오프라인  | PWA Service Worker → 캐시된 정적 자산 제공                            |

---

## 📐 Conventions

### 브랜치 전략

```
main          ─── 프로덕션 (GitHub Actions → AWS 자동 배포)
feat/기능명    ─── 기능 개발  (예: feat/product-infinite-scroll)
fix/버그명     ─── 버그 수정  (예: fix/cart-quantity-overflow)
chore/작업명   ─── 설정·인프라 (예: chore/upgrade-tanstack-query-v5)
```

### 커밋 메시지 (Commitlint — conventional commits)

```bash
feat: 상품 목록 무한스크롤 구현
fix: 결제 실패 시 토스트 미표시 버그 수정
chore: TanStack Query v5 업그레이드
docs: README 기술 스택 섹션 업데이트
test: 결제 플로우 Playwright E2E 추가
refactor: cartStore zustand persist 미들웨어 적용
style: ProductCard 컴포넌트 Emotion 스타일 정리
perf: 상품 목록 @tanstack/virtual 적용
```

### 파일 네이밍

```
컴포넌트       PascalCase.tsx         ProductCard.tsx
페이지         PascalCase.page.tsx    CategoryPage.tsx
훅             camelCase.ts           useProductList.ts
스토어         camelCase.store.ts     cart.store.ts
API 함수       camelCase.api.ts       product.api.ts
타입/스키마     camelCase.types.ts     product.types.ts
E2E 테스트     kebab-case.spec.ts     checkout.spec.ts
```

### 핵심 코딩 규칙

```
✅  모든 API 호출은 packages/api 경유 (컴포넌트 내 직접 axios 금지)
✅  서버 상태는 TanStack Query, 클라이언트 상태는 Zustand로 분리
✅  모든 폼은 React Hook Form + Zod 사용
✅  목록 50개 이상 렌더링 시 @tanstack/virtual 필수 적용
✅  에러는 axios 인터셉터에서 처리 후 Sentry 전송
```

---

## 🗓 Roadmap

- [x] pnpm Monorepo 프로젝트 셋업
- [x] 라우팅 정의
- [ ] 소셜 로그인 (카카오·구글 OAuth)
- [ ] 상품 목록·필터·무한스크롤 (Algolia + @tanstack/virtual)
- [ ] 상품 상세 (이미지 갤러리, 옵션 선택 RHF+Zod)
- [ ] 장바구니 (Zustand cartStore persist)
- [ ] 주문서 + 결제 (토스페이먼츠 SDK)
- [ ] 마이페이지 (주문내역·배송 트래킹·찜목록)
- [ ] Playwright E2E — 로그인·구매·마이페이지
- [x] GitHub Actions CI/CD → AWS S3+CloudFront 배포

- [ ] AI 개인화 추천 피드 (오픈 AI 추천 API)
- [ ] 상품 리뷰 & 평점 (사진 리뷰·사이즈 만족도)
- [ ] 쿠폰 & 포인트 시스템
- [ ] 멤버십 등급 (일반·실버·골드·VIP)
- [ ] 브랜드관 페이지

- [ ] AR Try-On (가상 착용 시뮬레이션)
- [ ] 라이브 쇼핑 연동
- [ ] 소셜 피드 (유저 스타일 공유)
- [ ] i18next 다국어 지원 (글로벌 배송 대응)

---

> **PR 머지 체크리스트**
>
> - [ ] TypeScript 타입 오류 없음
> - [ ] ESLint 경고 없음
> - [ ] 기존 Playwright E2E 전부 통과
> - [ ] 새 기능이면 E2E 테스트 케이스 추가됨

---

<div align="center">

**WONDERMALL**

</div>

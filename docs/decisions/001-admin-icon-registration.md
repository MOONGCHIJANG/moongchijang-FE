# 001. 어드민 아이콘 등록 방식

## 상태

- Accepted

## 맥락

`apps/web`은 `@iconify-json/lucide`, `material-symbols`, `mingcute` 컬렉션 패키지를 통째로 설치하고 `addCollection()`으로 등록한다. 이 방식은 `.claude/rules/code-style.md`에 표준으로 적혀 있었지만, 그 규칙이 정해지기 전 web 개발 초기에 도입된 것이라 컬렉션 전체(수백~수천 아이콘, 최대 수 MB)가 그대로 번들에 포함된다.

`apps/admin`은 사이드바 등 일부 화면에서 소수의 아이콘만 쓰는데, 같은 방식으로 전체 컬렉션을 설치하면 실제 사용량 대비 번들 크기가 과도하게 커진다. 또한 `@iconify-json/*` 패키지는 아이콘별로 쪼개진 개별 파일을 제공하지 않고 `icons.json` 하나에 전체 컬렉션을 담고 있어, 패키지를 설치해도 일부 아이콘만 골라 쓰는 트리쉐이킹이 되지 않는다는 것을 확인했다.

## 결정

`apps/admin`은 실제로 쓰는 아이콘만 SVG 데이터를 추출해 `apps/admin/src/components/icon-data.ts`(`ADMIN_ICONS`)에 등록하고, `IconsSetup.tsx`에서 `addIcon()`으로 개별 등록한다. `@iconify-json/lucide`처럼 admin에서도 실제로 여러 개를 쓰는 컬렉션만 예외적으로 `addCollection()`으로 전체 설치한다.

앞으로 admin에 새 아이콘이 필요할 때도 이 방식을 따른다. `@iconify-json/material-symbols`처럼 admin에서 한두 개만 쓰는 컬렉션은 패키지로 설치하지 않는다.

## 근거

- admin은 화면 수가 적고 아이콘 재사용 빈도가 낮아, 컬렉션 전체 설치의 이득(관리 편의)보다 번들 크기 증가 비용이 크다.
- `@iconify-json/*` 패키지는 아이콘별 개별 파일을 제공하지 않으므로, 패키지를 설치해도 결국 손으로 하나씩 추출하는 것과 번들에 포함되는 코드가 같다 — 설치는 의존성만 늘릴 뿐 이득이 없다.

## 대안

- web과 동일하게 `@iconify-json/material-symbols` 등을 설치하고 `addCollection()` 사용 — 기각. 아이콘 1~2개를 위해 수 MB 컬렉션 전체를 번들에 포함하게 됨.

## 영향

- `apps/admin`에 아이콘을 추가할 때는 `.claude/rules/code-style.md`의 web 기준 "컬렉션 설치" 안내 대신 `apps/admin/src/components/icon-data.ts` + `IconsSetup.tsx` 패턴을 따른다.
- `apps/web`은 기존 방식(컬렉션 전체 설치)을 유지한다. 이미 설치된 컬렉션에 새 아이콘을 쓰는 것은 추가 번들 비용이 없으므로 바꿀 필요 없다.

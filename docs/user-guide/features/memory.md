---
title: 영속 메모리
description: Hermes Agent의 세션 간 지속 메모리 시스템 - MEMORY.md, USER.md, 세션 검색
---

# 영속 메모리

Hermes Agent는 세션 간에 지속되는 메모리 시스템을 제공합니다.

## 메모리 파일

| 파일 | 용도 | 용량 제한 |
|------|------|-----------|
| **MEMORY.md** | 에이전트의 개인 노트 — 환경 사실, 규칙, 배운 것 | 2,200자 (~800 토큰) |
| **USER.md** | 사용자 프로필 — 선호도, 커뮤니케이션 스타일, 기대치 | 1,375자 (~500 토큰) |

파일 위치: `~/.hermes/memories/`

두 파일 모두 세션 시작 시 시스템 프롬프트에 **냉동 스냅샷**으로 주입됩니다. 에이전트가 `memory` 도구로 내용을 추가/교체/삭제합니다.

## 냉동 스냅샷 패턴

시스템 프롬프트 주입은 세션 시작 시 한 번만 캡처되며 세션 중에는 변경되지 않습니다. 이는 LLM의 프리픽스 캐시를 보존합니다. 변경사항은 즉시 디스크에 저장되지만, 시스템 프롬프트에는 다음 세션부터 반영됩니다.

## 메모리 도구

| 동작 | 설명 |
|------|------|
| `add` | 새 메모리 항목 추가 |
| `replace` | 기존 항목 교체 (`old_text` 부분 문자열 매칭) |
| `remove` | 항목 삭제 (`old_text` 부분 문자열 매칭) |

`read` 동작은 없습니다 — 메모리는 시스템 프롬프트에 자동 주입됩니다.

### 부분 문자열 매칭

`replace`와 `remove`는 짧은 고유 부분 문자열로 매칭합니다. 부분 문자열이 여러 항목과 일치하면 오류가 반환됩니다.

## 두 가지 메모리 대상

### `memory` — 에이전트의 개인 노트

저장할 것:
- 환경 사실 (OS, 도구 버전 등)
- 프로젝트 규칙과 관습
- 도구 특이사항
- 완료된 작업 일지
- 효과적이었던 스킬/기법

### `user` — 사용자 프로필

저장할 것:
- 이름/역할/시간대
- 커뮤니케이션 선호도
- 싫어하는 것
- 워크플로우 습관
- 기술 수준

## 저장 vs 건너뛰기

**저장해야 할 것:**
- 사용자 선호도
- 환경 사실
- 수정사항
- 관습
- 완료된 작업
- 명시적 요청

**건너뛸 것:**
- 사소하거나 명백한 정보
- 쉽게 다시 발견할 수 있는 사실
- 원시 데이터 덤프
- 세션 한정 임시 정보
- 컨텍스트 파일에 이미 있는 정보

## 용량 관리

| 저장소 | 제한 | 일반적인 항목 수 |
|--------|------|-----------------|
| memory | 2,200자 | 8-15개 항목 |
| user | 1,375자 | 5-10개 항목 |

가득 차면 도구가 현재 항목과 사용량을 포함한 오류를 반환합니다. 에이전트가 병합한 후 추가해야 합니다.

::: tip 베스트 프랙티스
메모리가 80%를 초과하면, 새로 추가하기 전에 기존 항목을 병합하세요.
:::

## 좋은/나쁜 메모리 예시

```markdown
# 좋음: 관련된 여러 사실을 압축
User runs macOS 14 Sonoma, uses Homebrew, has Docker Desktop
and Podman. Shell: zsh with oh-my-zsh. Editor: VS Code with
Vim keybindings.

# 좋음: 구체적이고 실행 가능한 관습
Project ~/code/api uses Go 1.22, sqlc for DB queries, chi
router. Run tests with 'make test'. CI via GitHub Actions.

# 좋음: 컨텍스트가 있는 교훈
The staging server (10.0.1.50) needs SSH port 2222, not 22.
Key is at ~/.ssh/staging_ed25519.

# 나쁨: 너무 모호
User has a project.

# 나쁨: 너무 장황
On January 5th, 2026, the user asked me to look at their
project which is...
```

## 중복 방지

메모리 시스템이 정확한 중복을 자동으로 거부합니다.

## 보안 스캔

메모리 항목은 수락 전에 인젝션/탈취 패턴에 대해 스캔됩니다.

## 세션 검색

MEMORY.md와 USER.md 외에도, 에이전트가 `session_search` 도구로 과거 대화를 검색할 수 있습니다. 모든 세션은 SQLite(`~/.hermes/state.db`)에 FTS5 전문 검색으로 저장됩니다. 검색 쿼리가 Gemini Flash 요약과 함께 과거 대화를 반환합니다.

| 기능 | 영속 메모리 | 세션 검색 |
|------|------------|-----------|
| **용량** | ~1,300 토큰 총합 | 무제한 |
| **속도** | 즉각적 (시스템 프롬프트) | 검색 + LLM 요약 필요 |
| **사용 사례** | 항상 사용 가능한 핵심 사실 | 특정 과거 대화 찾기 |
| **관리** | 에이전트가 수동 관리 | 자동 |
| **토큰 비용** | 세션당 고정 | 온디맨드 |

## 설정

```yaml
memory:
  memory_enabled: true
  user_profile_enabled: true
  memory_char_limit: 2200
  user_char_limit: 1375
```

## 외부 메모리 제공자

8개 플러그인이 내장 메모리와 **병행**하여 동작합니다 (대체하지 않음):

| 제공자 | 설명 |
|--------|------|
| Honcho | AI 네이티브 사용자 모델링 |
| OpenViking | 벡터 기반 검색 |
| Mem0 | 범용 메모리 |
| Hindsight | 장기 기억 |
| Holographic | 연관 기억 |
| RetainDB | 구조화된 메모리 |
| ByteRover | 대용량 메모리 |
| Supermemory | 크로스 앱 메모리 |

설정: `hermes memory setup` 및 `hermes memory status`

---
title: 스킬 시스템
description: Hermes Agent 스킬 시스템 - 온디맨드 지식 문서, 점진적 공개, 스킬 허브
---

# 스킬 시스템

스킬은 **온디맨드 지식 문서**로, **점진적 공개** 패턴을 따릅니다. [agentskills.io](https://agentskills.io) 오픈 표준과 호환됩니다.

모든 스킬은 `~/.hermes/skills/`에 저장됩니다.

## 스킬 사용하기

설치된 모든 스킬은 슬래시 명령어로 사용할 수 있습니다:

```
/gif-search funny cats
/axolotl help me fine-tune Llama 3 on my dataset
/github-pr-workflow create a PR for the auth refactor
/plan design a rollout for migrating our auth provider
```

## 점진적 공개

```
Level 0: skills_list()           -> [{name, description, category}, ...]   (~3k 토큰)
Level 1: skill_view(name)        -> 전체 내용 + 메타데이터
Level 2: skill_view(name, path)  -> 특정 참조 파일
```

## SKILL.md 형식

```markdown
---
name: docker-deploy
description: Docker 컨테이너 배포 자동화
version: 1
platforms: [linux, macos]
metadata:
  hermes:
    tags: [docker, deploy, devops]
    category: infrastructure
    fallback_for_toolsets: []
    requires_toolsets: [terminal]
    config:
      registry_url:
        type: string
        description: Docker 레지스트리 URL
        default: ""
---

## When to Use
Docker 컨테이너를 빌드하고 배포해야 할 때

## Procedure
1. Dockerfile 확인 및 빌드
2. 이미지 태깅
3. 레지스트리에 푸시
4. 원격 서버에서 pull 및 실행

## Pitfalls
- 항상 multi-stage 빌드 사용
- 보안 스캔 실행 필수

## Verification
- `docker ps`로 컨테이너 실행 확인
- 헬스체크 엔드포인트 확인
```

## 플랫폼별 스킬

`platforms` 필드로 특정 OS에서만 표시되도록 제한할 수 있습니다:

```yaml
platforms: [macos]      # macOS에서만
platforms: [linux]      # Linux에서만
platforms: [macos, linux]  # 둘 다
```

## 조건부 활성화

| 필드 | 동작 |
|------|------|
| `fallback_for_toolsets` | 해당 도구셋이 **비활성화**일 때만 표시 |
| `requires_toolsets` | 해당 도구셋이 **활성화**일 때만 표시 |
| `fallback_for_tools` | 해당 도구가 **없을** 때만 표시 |
| `requires_tools` | 해당 도구가 **있을** 때만 표시 |

예: `duckduckgo-search` 스킬은 `fallback_for_toolsets: [web]` — Firecrawl API 키가 설정되면 숨겨지고, 없으면 표시됩니다.

## 보안 환경변수 설정

스킬이 `required_environment_variables`를 선언할 수 있습니다:

```yaml
metadata:
  hermes:
    required_environment_variables:
      - name: DOCKER_REGISTRY_TOKEN
        prompt: "Docker 레지스트리 토큰을 입력하세요"
        help: "Docker Hub > Account Settings > Security에서 생성"
        required_for: [push]
```

선언된 환경변수는 자동으로 샌드박스에 전달됩니다.

## 스킬 디렉토리 구조

```
~/.hermes/skills/
├── infrastructure/          # 카테고리
│   └── docker-deploy/
│       ├── SKILL.md         # 필수: 스킬 정의
│       ├── references/      # 참조 파일
│       ├── templates/       # 템플릿
│       ├── scripts/         # 스크립트
│       ├── assets/          # 에셋
│       └── .hub/            # 허브 상태
└── uncategorized/
```

## 외부 스킬 디렉토리

프로젝트별 스킬 디렉토리를 추가할 수 있습니다:

```yaml
skills:
  external_dirs:
    - /path/to/project/skills
    - /shared/team/skills
```

읽기 전용, 로컬 우선, 전체 통합, 존재하지 않는 경로는 조용히 건너뜁니다.

## 에이전트 관리 스킬 (skill_manage)

에이전트가 자체적으로 스킬을 생성, 업데이트, 삭제합니다 — 절차적 기억:

| 동작 | 용도 | 주요 파라미터 |
|------|------|-------------|
| `create` | 새 스킬 생성 | `name`, `content`, `category` (선택) |
| `patch` | 타겟 수정 (권장) | `name`, `old_string`, `new_string` |
| `edit` | 대규모 구조 변경 | `name`, `content` |
| `delete` | 완전 삭제 | `name` |
| `write_file` | 보조 파일 추가/수정 | `name`, `file_path`, `file_content` |
| `remove_file` | 보조 파일 제거 | `name`, `file_path` |

## 스킬 허브

커뮤니티에서 공유하는 스킬을 검색, 설치, 관리할 수 있습니다.

### 주요 명령어

```bash
hermes skills browse          # 카테고리별 탐색
hermes skills search "docker" # 키워드 검색
hermes skills install <이름>  # 설치
hermes skills inspect <이름>  # 상세 정보
hermes skills list            # 설치된 목록
hermes skills check           # 업데이트 확인
hermes skills update           # 업데이트 적용
hermes skills audit           # 보안 감사
hermes skills uninstall <이름> # 제거
```

### 지원 소스

| 소스 | 설명 |
|------|------|
| `official` | Hermes에 포함된 선택적 스킬 |
| `skills-sh` | Vercel 공개 디렉토리 |
| `well-known` | `/.well-known/skills/index.json` URL 기반 발견 |
| `github` | 직접 GitHub repo/경로 설치 |
| `clawhub` | 서드파티 마켓플레이스 |
| `claude-marketplace` | Claude 호환 매니페스트 |
| `lobehub` | LobeHub 카탈로그 변환 |

기본 탭: openai/skills, anthropics/skills, VoltAgent/awesome-agent-skills, garrytan/gstack

### 신뢰 수준

| 수준 | 설명 |
|------|------|
| `builtin` | Hermes에 내장 |
| `official` | Nous Research 관리 |
| `trusted` | 검증된 커뮤니티 |
| `community` | 일반 커뮤니티 |

### 보안

허브에서 설치한 모든 스킬은 자동으로 보안 스캔됩니다. `--force`는 위험하지 않은 정책 차단을 우회하지만, `dangerous` 판정은 우회할 수 없습니다.

### GitHub 속도 제한

인증 없이 시간당 60회 요청. `GITHUB_TOKEN`을 설정하면 시간당 5,000회로 증가합니다.

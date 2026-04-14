---
title: CLI 명령어 레퍼런스
description: Hermes Agent CLI 전체 명령어 레퍼런스 - 40+ 명령어, 옵션, 사용법
---

# CLI 명령어 레퍼런스

## 전역 사용법

```bash
hermes [전역옵션] <명령어> [하위명령/옵션]
```

## 전역 옵션

| 옵션 | 설명 |
|------|------|
| `--version` | 버전 표시 |
| `--profile <이름>` | 프로필 지정 |
| `--resume <세션>` | 특정 세션 이어가기 |
| `--continue [이름]` | 마지막 세션에 메시지 추가 |
| `--worktree` | Git worktree 격리 |
| `--yolo` | 모든 안전 확인 우회 |
| `--pass-session-id` | 세션 ID 전달 |

## 채팅 및 모델

### `hermes chat`

대화형 채팅 시작.

| 옵션 | 설명 |
|------|------|
| `-q, --query` | 인라인 질문 (비대화형) |
| `-m, --model` | 모델 지정 |
| `-t, --toolsets` | 도구셋 지정 |
| `--provider` | 제공자 지정 |
| `-s, --skills` | 스킬 로드 |
| `-v, --verbose` | 상세 출력 |
| `-Q, --quiet` | 조용한 모드 |
| `--image` | 이미지 첨부 |
| `--worktree` | Git worktree 격리 |
| `--checkpoints` | 체크포인트 활성화 |
| `--yolo` | 안전 확인 우회 |
| `--max-turns` | 최대 턴 수 (기본값: 90) |

```bash
hermes                          # 기본 대화
hermes chat                     # 동일
hermes --resume                 # 마지막 세션 이어가기
hermes --continue "이어서 해줘"  # 메시지 추가
hermes "파일 분석해줘"           # 인라인 메시지
hermes chat -q "Hello!" -Q      # 비대화형 조용한 모드
```

### `hermes model`

```bash
hermes model                    # 대화형 모델 선택
hermes model list               # 사용 가능한 모델 목록
hermes model set <모델명>       # 모델 직접 설정
```

## 서비스

### `hermes gateway`

| 하위명령 | 설명 |
|---------|------|
| `run` | 포그라운드 실행 |
| `start` | 백그라운드 시작 |
| `stop` | 중지 |
| `restart` | 재시작 |
| `status` | 상태 확인 |
| `install` | 시스템 서비스 등록 |
| `uninstall` | 서비스 제거 |
| `setup` | 대화형 설정 마법사 |

## 자격증명 및 상태

### `hermes auth`

| 하위명령 | 설명 |
|---------|------|
| `add` | 제공자 인증 추가 |
| `list` | 등록된 인증 목록 |
| `remove` | 인증 제거 |
| `reset` | 인증 초기화 |

### `hermes setup`

| 섹션 | 설명 |
|------|------|
| `model` | 모델/제공자 설정 |
| `terminal` | 터미널 백엔드 설정 |
| `gateway` | 메시징 게이트웨이 설정 |
| `tools` | 도구 설정 |
| `agent` | 에이전트 설정 |

### `hermes status`

현재 에이전트 상태 표시.

### `hermes doctor`

시스템 진단 실행.

## 자동화

### `hermes cron`

| 하위명령 | 설명 |
|---------|------|
| `list` | 작업 목록 |
| `create` | 작업 생성 |
| `edit` | 작업 편집 |
| `pause` | 작업 일시정지 |
| `resume` | 작업 재개 |
| `run` | 작업 수동 실행 |
| `remove` | 작업 제거 |
| `status` | 스케줄러 상태 |
| `tick` | 수동 틱 실행 |

### `hermes webhook`

| 하위명령 | 설명 |
|---------|------|
| `subscribe` | 웹훅 구독 |
| `list` | 구독 목록 |
| `remove` | 구독 제거 |
| `test` | 웹훅 테스트 |

옵션: `--prompt`, `--events`, `--description`, `--skills`, `--deliver`, `--deliver-chat-id`

## 진단 및 데이터

### `hermes logs`

| 옵션 | 설명 |
|------|------|
| `-n, --lines` | 표시할 줄 수 |
| `-f, --follow` | 실시간 추적 |
| `--level` | 로그 레벨 필터 |
| `--session` | 세션별 필터 |
| `--since` | 시작 시간 |
| `--component` | 컴포넌트 필터 |

사용 가능한 로그: `agent`, `errors`, `gateway`

### `hermes backup`

```bash
hermes backup                   # 백업 생성
hermes backup -o ~/backup.zip   # 출력 경로 지정
hermes backup -q                # 빠른 백업 (세션 제외)
hermes backup -l "before-update"  # 라벨 지정
```

### `hermes import`

```bash
hermes import backup.zip        # 백업 복원
```

### `hermes dump`

공유 가능한 설정 요약 생성:

```bash
hermes dump
hermes dump --show-keys         # API 키 포함
```

### `hermes debug`

```bash
hermes debug share              # 디버그 정보 공유
hermes debug share --lines 200  # 로그 줄 수
hermes debug share --expire 1h  # 만료 시간
hermes debug share --local      # 로컬 파일로 저장
```

## 설정

### `hermes config`

| 하위명령 | 설명 |
|---------|------|
| `show` | 현재 설정 표시 |
| `edit` | 에디터에서 편집 |
| `set` | 값 설정 |
| `path` | config.yaml 경로 |
| `env-path` | .env 경로 |
| `check` | 설정 완전성 확인 |
| `migrate` | 누락 옵션 대화형 추가 |

## 확장

### `hermes skills`

| 하위명령 | 설명 |
|---------|------|
| `browse` | 카테고리별 탐색 |
| `search` | 키워드 검색 |
| `install` | 스킬 설치 |
| `inspect` | 스킬 상세 정보 |
| `list` | 설치된 스킬 목록 |
| `check` | 업데이트 확인 |
| `update` | 업데이트 적용 |
| `audit` | 보안 감사 |
| `uninstall` | 스킬 제거 |
| `publish` | 스킬 게시 |
| `snapshot` | 스킬 스냅샷 |
| `tap` | 소스 탭 관리 |
| `config` | 스킬별 설정 |

### `hermes mcp`

| 하위명령 | 설명 |
|---------|------|
| `serve` | MCP 서버로 실행 |
| `add` | 서버 추가 |
| `remove` | 서버 제거 |
| `list` | 서버 목록 |
| `test` | 연결 테스트 |
| `configure` | 서버 설정 |

### `hermes plugins`

| 하위명령 | 설명 |
|---------|------|
| `install` | 플러그인 설치 |
| `update` | 플러그인 업데이트 |
| `remove` | 플러그인 제거 |
| `enable` | 플러그인 활성화 |
| `disable` | 플러그인 비활성화 |
| `list` | 플러그인 목록 |

### `hermes tools`

도구 관리 (목록 표시, 플랫폼별 설정).

## 세션 및 분석

### `hermes sessions`

| 하위명령 | 설명 |
|---------|------|
| `list` | 세션 목록 |
| `browse` | 세션 탐색 |
| `export` | 세션 내보내기 |
| `delete` | 세션 삭제 |
| `prune` | 오래된 세션 정리 |
| `stats` | 세션 통계 |
| `rename` | 세션 이름 변경 |

### `hermes insights`

사용 분석 및 인사이트.

## 프로필

### `hermes profile`

독립적인 설정/메모리/스킬 세트:

| 하위명령 | 설명 |
|---------|------|
| `list` | 프로필 목록 |
| `use` | 프로필 전환 |
| `create` | 프로필 생성 |
| `delete` | 프로필 삭제 |
| `show` | 프로필 정보 |
| `alias` | 별칭 설정 |
| `rename` | 이름 변경 |
| `export` | 프로필 내보내기 |
| `import` | 프로필 가져오기 |

## 메모리

### `hermes memory`

| 하위명령 | 설명 |
|---------|------|
| `setup` | 외부 메모리 설정 |
| `status` | 메모리 상태 확인 |
| `off` | 메모리 비활성화 |

### `hermes honcho`

Honcho AI 메모리 통합:
`setup`, `status`, `peers`, `sessions`, `map`, `peer`, `mode`, `tokens`, `identity`, `enable`, `disable`, `sync`, `migrate`

## 마이그레이션

### `hermes claw migrate`

OpenClaw에서 Hermes로 마이그레이션:

```bash
hermes claw migrate                    # 대화형 마이그레이션
hermes claw migrate --dry-run          # 시뮬레이션
hermes claw migrate --preset minimal   # 최소 마이그레이션
hermes claw migrate --overwrite        # 기존 설정 덮어쓰기
hermes claw migrate --source ~/openclaw  # 소스 경로 지정
```

## 대시보드

### `hermes dashboard`

```bash
hermes dashboard                       # 웹 대시보드 시작
hermes dashboard --port 9119           # 포트 지정 (기본값)
hermes dashboard --host 127.0.0.1      # 호스트 지정
hermes dashboard --no-open             # 브라우저 자동 열기 비활성화
```

## 유틸리티

### `hermes completion`

```bash
hermes completion bash    # Bash 자동완성
hermes completion zsh     # Zsh 자동완성
```

### `hermes version`

버전 표시.

### `hermes update`

Hermes 업데이트.

### `hermes uninstall`

```bash
hermes uninstall          # 제거
hermes uninstall --full   # 완전 제거 (설정 포함)
hermes uninstall --yes    # 확인 없이 제거
```

### `hermes pairing`

DM 페어링 코드 관리.

### `hermes acp`

ACP 에디터 연동.

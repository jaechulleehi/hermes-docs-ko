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
| `--resume` | 마지막 세션 이어가기 |
| `--continue <메시지>` | 마지막 세션에 메시지 추가 |
| `--worktree` | Git worktree 격리 |
| `--yolo` | 모든 안전 확인 우회 |

## 채팅 및 모델

### `hermes` / `hermes chat`

대화형 채팅 시작.

```bash
hermes                          # 기본 대화
hermes chat                     # 동일
hermes --resume                 # 마지막 세션 이어가기
hermes --continue "이어서 해줘"  # 메시지 추가
hermes "파일 분석해줘"           # 인라인 메시지
```

### `hermes model`

AI 모델 설정.

```bash
hermes model                    # 대화형 모델 선택
hermes model list               # 사용 가능한 모델 목록
hermes model set <모델명>       # 모델 직접 설정
```

## 서비스

### `hermes gateway`

메시징 게이트웨이 관리.

```bash
hermes gateway start            # 게이트웨이 시작
hermes gateway stop             # 게이트웨이 중지
hermes gateway status           # 상태 확인
hermes gateway install          # 시스템 서비스로 등록
```

## 자격증명 및 상태

### `hermes auth`

API 키 및 인증 관리.

```bash
hermes auth                     # 대화형 인증 설정
hermes auth add <제공자>        # 제공자 인증 추가
hermes auth list                # 등록된 인증 목록
hermes auth remove <제공자>     # 인증 제거
```

### `hermes setup`

초기 설정 마법사.

```bash
hermes setup                    # 대화형 설정
```

### `hermes tools`

사용 가능한 도구 관리.

```bash
hermes tools                    # 도구 목록 표시
hermes tools list               # 상세 목록
```

## 자동화

### `hermes cron`

크론 예약 작업 관리.

```bash
hermes cron add "설명"          # 크론 작업 추가
hermes cron list                # 작업 목록
hermes cron remove <ID>         # 작업 제거
hermes cron run <ID>            # 작업 수동 실행
```

## 진단 및 데이터

### `hermes doctor`

시스템 진단.

```bash
hermes doctor                   # 전체 진단 실행
```

### `hermes logs`

로그 관리.

```bash
hermes logs                     # 최근 로그 표시
hermes logs tail                # 실시간 로그 추적
hermes logs clear               # 로그 삭제
```

### `hermes backup`

데이터 백업/복원.

```bash
hermes backup create            # 백업 생성
hermes backup restore <파일>    # 백업 복원
hermes backup list              # 백업 목록
```

## 설정

### `hermes config`

설정 관리.

```bash
hermes config                   # 설정 파일 편집
hermes config show              # 현재 설정 표시
hermes config reset             # 기본값으로 초기화
```

## 확장

### `hermes skills`

스킬 관리.

```bash
hermes skills list              # 설치된 스킬 목록
hermes skills install <이름>    # 스킬 설치
hermes skills remove <이름>     # 스킬 제거
hermes skills search <키워드>   # 스킬 검색
hermes skills create            # 스킬 생성
```

### `hermes mcp`

MCP 서버 관리.

```bash
hermes mcp list                 # MCP 서버 목록
hermes mcp serve                # Hermes를 MCP 서버로 실행
```

## 세션 및 분석

### `hermes sessions`

세션 관리.

```bash
hermes sessions list            # 세션 목록
hermes sessions search <키워드> # 세션 검색
hermes sessions export <ID>     # 세션 내보내기
```

## 프로필

### `hermes profile`

프로필 관리 (독립적인 설정/메모리/스킬 세트).

```bash
hermes profile list             # 프로필 목록
hermes profile create <이름>    # 프로필 생성
hermes profile switch <이름>    # 프로필 전환
hermes profile delete <이름>    # 프로필 삭제
```

## 마이그레이션

### `hermes claw migrate`

OpenClaw에서 Hermes로 마이그레이션.

```bash
hermes claw migrate             # 대화형 마이그레이션
```

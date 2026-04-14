# 도구 및 도구셋

Hermes Agent는 40개 이상의 내장 도구를 제공하며, 이를 논리적인 도구셋으로 그룹화하여 관리합니다.

## 도구 카테고리

### 웹 (Web)

| 도구 | 설명 |
|------|------|
| `web_search` | 웹 검색 |
| `web_read` | 웹 페이지 읽기 |
| `web_screenshot` | 웹 페이지 스크린샷 |

### 터미널 및 파일 (Terminal & Files)

| 도구 | 설명 |
|------|------|
| `terminal_execute` | 명령어 실행 |
| `file_read` | 파일 읽기 |
| `file_write` | 파일 쓰기 |
| `file_edit` | 파일 편집 |
| `code_search` | 코드 검색 (ripgrep) |

### 브라우저 (Browser)

| 도구 | 설명 |
|------|------|
| `browser_navigate` | URL 이동 |
| `browser_click` | 요소 클릭 |
| `browser_type` | 텍스트 입력 |
| `browser_screenshot` | 스크린샷 캡처 |

### 미디어 (Media)

| 도구 | 설명 |
|------|------|
| `image_generate` | 이미지 생성 |
| `image_edit` | 이미지 편집 |
| `audio_transcribe` | 오디오 전사 |

### 에이전트 오케스트레이션

| 도구 | 설명 |
|------|------|
| `delegate` | 서브에이전트에게 작업 위임 |
| `ask_human` | 사용자에게 질문 |

### 메모리 및 회상

| 도구 | 설명 |
|------|------|
| `memory_add` | 메모리 추가 |
| `memory_replace` | 메모리 교체 |
| `memory_remove` | 메모리 제거 |
| `session_search` | 과거 세션 검색 |

### 자동화 및 전달

| 도구 | 설명 |
|------|------|
| `cron_add` | 크론 작업 추가 |
| `send_message` | 메시지 전송 |
| `send_email` | 이메일 전송 |

### 통합 (Integrations)

MCP를 통한 외부 도구 연결. 자세한 내용은 [MCP 연동](/user-guide/features/mcp)을 참조하세요.

## 도구셋 관리

도구셋은 플랫폼별로 활성화/비활성화할 수 있습니다:

```yaml
toolsets:
  cli:
    enabled:
      - web
      - terminal
      - browser
      - media
      - memory
  telegram:
    enabled:
      - web
      - terminal
      - memory
    disabled:
      - browser  # 메시징에서는 브라우저 도구 비활성화
```

## 터미널 백엔드

### 로컬 (Local)

시스템에서 직접 명령어를 실행합니다. 가장 빠르지만 격리가 없습니다.

### Docker

```yaml
terminal:
  backend: docker
  docker:
    image: python:3.11-slim
    memory_limit: 512m
    cpu_limit: 1.0
    network: bridge
```

보안 강화 옵션이 자동 적용됩니다:
- 모든 Linux 기능 제거 (`--cap-drop ALL`)
- 권한 상승 차단
- 프로세스 수 제한

### SSH

원격 서버에서 명령어를 실행합니다:

```yaml
terminal:
  backend: ssh
  ssh:
    host: my-server.example.com
    user: hermes
    key_file: ~/.ssh/hermes_key
```

### Modal / Daytona / Singularity

클라우드 및 HPC 환경에서의 실행을 지원합니다.

## 백그라운드 프로세스

오래 걸리는 명령어를 백그라운드에서 실행할 수 있습니다:

```
> 이 테스트를 백그라운드에서 실행하고 결과를 알려줘
```

## Sudo 처리

`sudo`가 필요한 명령어는 자동으로 위험 명령 승인 프로세스를 거칩니다.

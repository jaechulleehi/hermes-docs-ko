---
title: MCP 연동
description: Hermes Agent MCP(Model Context Protocol) 연동 - 외부 도구 서버, Stdio/HTTP, 샘플링, MCP 서버 모드
---

# MCP 연동

MCP(Model Context Protocol)는 Hermes Agent를 외부 도구 서버에 연결하는 표준 프로토콜입니다. GitHub, 데이터베이스, 파일 시스템, 브라우저, API 등에 접근할 수 있습니다.

## 빠른 시작

```bash
# 1. MCP 지원 설치
uv pip install -e ".[mcp]"

# 2. config.yaml에 서버 추가 (아래 참조)

# 3. Hermes 시작
hermes
```

## 서버 유형

### Stdio 서버 (로컬 서브프로세스)

stdin/stdout을 통해 통신합니다:

```yaml
mcp_servers:
  github:
    command: "npx"
    args: ["-y", "@modelcontextprotocol/server-github"]
    env:
      GITHUB_PERSONAL_ACCESS_TOKEN: "ghp_..."

  filesystem:
    command: "npx"
    args: ["-y", "@modelcontextprotocol/server-filesystem", "/home/user/projects"]

  sqlite:
    command: "uvx"
    args: ["mcp-server-sqlite", "--db-path", "~/data.db"]
```

### HTTP 서버 (원격 엔드포인트)

```yaml
mcp_servers:
  remote_api:
    url: "https://mcp.example.com/mcp"
    headers:
      Authorization: "Bearer your-token"
```

## 설정 레퍼런스

| 키 | 타입 | 설명 |
|---|------|------|
| `command` | string | Stdio 서버 실행 명령어 |
| `args` | list | 명령어 인자 |
| `env` | dict | 환경변수 |
| `url` | string | HTTP 서버 URL |
| `headers` | dict | HTTP 헤더 |
| `timeout` | int | 요청 타임아웃 (초) |
| `connect_timeout` | int | 연결 타임아웃 (초) |
| `enabled` | bool | 서버 활성화 여부 |
| `tools` | dict | 도구 필터링 설정 |

## 도구 등록

MCP 서버의 도구는 충돌 방지를 위해 자동으로 접두사가 붙습니다:

```
mcp_github_create_issue
mcp_sqlite_query
mcp_filesystem_read_file
```

## 유틸리티 도구

서버 기능에 따라 자동으로 제공되는 도구:

| 도구 | 설명 |
|------|------|
| `list_resources` | 사용 가능한 리소스 목록 |
| `read_resource` | 리소스 내용 읽기 |
| `list_prompts` | 사용 가능한 프롬프트 목록 |
| `get_prompt` | 프롬프트 가져오기 |

## 서버별 필터링

### 서버 비활성화

```yaml
mcp_servers:
  github:
    enabled: false
```

### 화이트리스트 (포함)

```yaml
mcp_servers:
  github:
    command: "npx"
    args: ["-y", "@modelcontextprotocol/server-github"]
    tools:
      include:
        - create_issue
        - list_issues
```

### 블랙리스트 (제외)

```yaml
mcp_servers:
  github:
    tools:
      exclude:
        - delete_repository
```

`include`와 `exclude` 모두 설정된 경우, `include`가 우선합니다.

### 유틸리티 도구 필터링

```yaml
mcp_servers:
  my_server:
    tools:
      prompts: false     # 프롬프트 도구 비활성화
      resources: false   # 리소스 도구 비활성화
```

## 동적 도구 발견

서버가 `notifications/tools/list_changed`를 보내면 자동으로 도구 목록을 갱신합니다. Lock 보호 하에 새로고침됩니다.

### 수동 새로고침

```
/reload-mcp
```

## 보안

### Stdio 환경변수 필터링

Stdio 서버 서브프로세스에는 명시적으로 설정된 `env` 항목과 안전한 기본값만 전달됩니다. 민감한 환경변수는 자동으로 차단됩니다.

## MCP 샘플링

MCP 서버가 `sampling/createMessage`로 Hermes에게 LLM 추론을 요청할 수 있습니다. 기본적으로 활성화되어 있습니다.

서버별 설정:

```yaml
mcp_servers:
  my_server:
    sampling:
      enabled: true
      model: "anthropic/claude-sonnet-4"
      max_tokens_cap: 4096
      timeout: 30
      max_rpm: 10
      max_tool_rounds: 3
      allowed_models: ["anthropic/*", "openai/*"]
      log_level: "info"
```

## Hermes를 MCP 서버로 실행

Hermes 자체를 MCP 서버로 노출하여 다른 MCP 클라이언트(예: Claude Code)에서 사용할 수 있습니다:

```bash
hermes mcp serve
```

### 노출되는 도구 (10개)

| 도구 | 설명 |
|------|------|
| `conversations_list` | 대화 목록 |
| `conversation_get` | 대화 가져오기 |
| `messages_read` | 메시지 읽기 |
| `attachments_fetch` | 첨부파일 가져오기 |
| `events_poll` | 이벤트 폴링 |
| `events_wait` | 이벤트 대기 |
| `messages_send` | 메시지 전송 |
| `channels_list` | 채널 목록 |
| `permissions_list_open` | 열린 권한 요청 목록 |
| `permissions_respond` | 권한 요청 응답 |

Stdio 전송만 지원. ~200ms 폴링 간격.

### Claude Code에서 사용

```json
{
  "mcpServers": {
    "hermes": {
      "command": "hermes",
      "args": ["mcp", "serve"]
    }
  }
}
```

## 인기 MCP 서버

| 서버 | 용도 |
|------|------|
| `@modelcontextprotocol/server-github` | GitHub 이슈, PR, 파일 |
| `@modelcontextprotocol/server-filesystem` | 파일 시스템 접근 |
| `mcp-server-sqlite` | SQLite 데이터베이스 |
| `@modelcontextprotocol/server-brave-search` | Brave 웹 검색 |
| `@modelcontextprotocol/server-puppeteer` | 브라우저 자동화 |
| `@modelcontextprotocol/server-slack` | Slack 메시징 |

## MCP 관리 명령어

```bash
hermes mcp list       # MCP 서버 목록
hermes mcp add        # 서버 추가
hermes mcp remove     # 서버 제거
hermes mcp test       # 연결 테스트
hermes mcp configure  # 서버 설정
hermes mcp serve      # Hermes를 MCP 서버로 실행
```

# MCP 연동

MCP(Model Context Protocol)는 Hermes Agent를 외부 도구 서버에 연결하는 표준 프로토콜입니다.

## MCP란?

MCP를 통해 Hermes가 GitHub, 데이터베이스, 파일 시스템, 브라우저, API 등 외부 시스템의 도구를 사용할 수 있습니다.

## 서버 유형

| 유형 | 설명 | 통신 방식 |
|------|------|-----------|
| **Stdio** | 로컬 서브프로세스 | stdin/stdout |
| **HTTP** | 원격 엔드포인트 | HTTP/SSE |

## 설정

`config.yaml`에서 MCP 서버를 설정합니다:

### Stdio 서버 예시

```yaml
mcp_servers:
  github:
    command: npx
    args: ["-y", "@modelcontextprotocol/server-github"]
    env:
      GITHUB_TOKEN: "${GITHUB_TOKEN}"

  filesystem:
    command: npx
    args: ["-y", "@modelcontextprotocol/server-filesystem", "/home/user/projects"]

  sqlite:
    command: uvx
    args: ["mcp-server-sqlite", "--db-path", "~/data.db"]
```

### HTTP 서버 예시

```yaml
mcp_servers:
  remote_tools:
    url: "https://my-mcp-server.example.com/sse"
    headers:
      Authorization: "Bearer ${MCP_TOKEN}"
```

## 도구 접두사

MCP 서버의 도구는 충돌 방지를 위해 자동으로 접두사가 붙습니다:

```
mcp_github_create_issue
mcp_sqlite_query
mcp_filesystem_read_file
```

## 유틸리티 도구

모든 MCP 서버에서 제공하는 공통 도구:

| 도구 | 설명 |
|------|------|
| `list_resources` | 사용 가능한 리소스 목록 |
| `read_resource` | 리소스 내용 읽기 |
| `list_prompts` | 사용 가능한 프롬프트 목록 |
| `get_prompt` | 프롬프트 가져오기 |

## 서버별 필터링

특정 도구만 포함하거나 제외할 수 있습니다:

```yaml
mcp_servers:
  github:
    command: npx
    args: ["-y", "@modelcontextprotocol/server-github"]
    include_tools:
      - create_issue
      - list_issues
    # 또는
    exclude_tools:
      - delete_repository
```

## 동적 발견

실행 중에 MCP 서버를 다시 로드할 수 있습니다:

```
/reload-mcp
```

## MCP 샘플링

MCP 서버가 Hermes에게 LLM 호출을 요청할 수 있습니다. 속도 제한이 적용됩니다.

## Hermes를 MCP 서버로 사용

Hermes 자체를 MCP 서버로 노출하여 다른 MCP 클라이언트에서 사용할 수 있습니다:

```bash
hermes mcp serve
```

노출되는 도구 (10개):
- `chat` — Hermes와 대화
- `execute` — 명령어 실행
- `search` — 웹 검색
- `memory_read` — 메모리 읽기
- 기타

## 인기 MCP 서버

| 서버 | 용도 |
|------|------|
| `server-github` | GitHub 이슈, PR, 파일 |
| `server-filesystem` | 파일 시스템 접근 |
| `server-sqlite` | SQLite 데이터베이스 |
| `server-brave-search` | Brave 웹 검색 |
| `server-puppeteer` | 브라우저 자동화 |
| `server-slack` | Slack 메시징 |

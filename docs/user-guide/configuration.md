# 설정

Hermes Agent의 모든 설정은 `~/.hermes/` 디렉토리에 저장됩니다.

## 디렉토리 구조

```
~/.hermes/
├── config.yaml        # 메인 설정 파일
├── .env               # 환경 변수 (API 키 등)
├── auth.json          # 인증 정보
├── SOUL.md            # 에이전트 성격 정의
├── memories/          # 메모리 파일 (MEMORY.md, USER.md)
├── skills/            # 스킬 파일
├── cron/              # 크론 작업 정의
├── sessions/          # 세션 기록
└── logs/              # 로그 파일
```

## 설정 우선순위

설정 값은 다음 순서로 적용됩니다 (위쪽이 우선):

1. CLI 인자
2. `config.yaml`
3. `.env` 파일
4. 기본값

## config.yaml 기본 구조

```yaml
# AI 모델 설정
model:
  provider: openrouter
  model_name: anthropic/claude-sonnet-4
  temperature: 0.7

# 터미널 백엔드
terminal:
  backend: local  # local, docker, ssh, modal, daytona, singularity

# 메모리 설정
memory:
  enabled: true

# 스킬 설정
skills:
  auto_create: true
  directories:
    - ~/.hermes/skills

# MCP 서버
mcp_servers:
  github:
    command: npx
    args: ["-y", "@modelcontextprotocol/server-github"]
    env:
      GITHUB_TOKEN: "${GITHUB_TOKEN}"
```

## 환경 변수 치환

`config.yaml`에서 `${변수명}` 구문으로 환경 변수를 참조할 수 있습니다:

```yaml
mcp_servers:
  my_server:
    env:
      API_KEY: "${MY_API_KEY}"
```

## 터미널 백엔드

| 백엔드 | 설명 |
|--------|------|
| `local` | 로컬 시스템에서 직접 실행 (기본값) |
| `docker` | Docker 컨테이너 격리 |
| `ssh` | SSH를 통한 원격 실행 |
| `modal` | Modal 클라우드 실행 |
| `daytona` | Daytona 클라우드 개발 환경 |
| `singularity` | Singularity 컨테이너 |

### Docker 격리 예시

```yaml
terminal:
  backend: docker
  docker:
    image: python:3.11-slim
    memory_limit: 512m
    cpu_limit: 1.0
```

## 자격증명 풀 전략

여러 API 키를 사용할 때의 분배 전략:

| 전략 | 설명 |
|------|------|
| `fill_first` | 첫 번째 키를 우선 사용 |
| `round_robin` | 순환 사용 |
| `least_used` | 가장 적게 사용된 키 우선 |
| `random` | 무작위 선택 |

## 보조 모델

메모리 요약, 세션 검색 등 보조 작업에 사용하는 경량 모델:

```yaml
auxiliary_model:
  provider: google
  model_name: gemini-2.0-flash
```

## TTS 설정

```yaml
tts:
  provider: edge  # edge, elevenlabs, openai, minimax, neutts
  voice: ko-KR-SunHiNeural  # Edge TTS 한국어 음성
```

## 컨텍스트 압축

긴 대화에서 자동으로 이전 컨텍스트를 요약·압축합니다:

```yaml
context:
  compression: true
  max_tokens: 64000
```

## 반복 예산 압력

에이전트가 예산의 일정 비율을 사용하면 자동으로 효율적인 동작을 유도합니다:

- 70% 도달: 경고 신호
- 90% 도달: 강한 압력

## 웹 검색 백엔드

```yaml
web_search:
  backend: firecrawl  # firecrawl, parallel, tavily, exa
```

## 브라우저 설정

```yaml
browser:
  headless: true
  timeout: 30
```

## 개인정보 보호

PII(개인식별정보) 자동 필터링:

```yaml
privacy:
  pii_redaction: true
```

## 위임 (서브에이전트)

```yaml
delegation:
  enabled: true
  max_subagents: 3
```

자세한 설정 옵션은 원본 문서의 [Configuration](https://hermes-agent.nousresearch.com/docs/user-guide/configuration)을 참조하세요.

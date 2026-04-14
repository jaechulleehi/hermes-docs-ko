# 빠른 시작

## 1단계: 설치

```bash
curl -fsSL https://hermes.nousresearch.com/install.sh | bash
```

## 2단계: AI 제공자 설정

Hermes는 16개 이상의 AI 제공자를 지원합니다. 최소 64K 이상의 컨텍스트 윈도우를 가진 모델이 필요합니다.

```bash
hermes model
# 또는 직접 설정
hermes auth
```

주요 지원 제공자:
- OpenAI (GPT-4o, GPT-4.1 등)
- Anthropic (Claude Sonnet 4, Opus 4 등)
- OpenRouter (다양한 모델 허브)
- Google (Gemini 시리즈)
- 로컬 모델 (Ollama, vLLM, LM Studio 등)

## 3단계: 대화 시작

```bash
hermes
```

## 주요 기능

### 터미널 실행

Hermes는 채팅 중 터미널 명령을 직접 실행할 수 있습니다:

```
> 현재 디렉토리의 파일 목록을 보여줘
```

### 슬래시 명령어

| 명령어 | 설명 |
|--------|------|
| `/help` | 도움말 표시 |
| `/tools` | 사용 가능한 도구 목록 |
| `/model` | 모델 변경 |
| `/personality` | 성격 임시 변경 |
| `/save` | 현재 세션 저장 |
| `/voice` | 음성 모드 토글 |
| `/new` | 새 세션 시작 |

### 여러 줄 입력

빈 줄을 한 번 입력하면 여러 줄 모드로 전환됩니다. 완료하려면 빈 줄 두 번을 입력하세요.

### 작업 중단

`Ctrl+C`로 진행 중인 작업을 중단할 수 있습니다.

### 세션 이어가기

```bash
hermes --resume          # 마지막 세션 이어가기
hermes --continue "추가 지시"  # 마지막 세션에 메시지 추가
```

## 고급 기능

### Docker/SSH 격리

```bash
hermes --sandbox docker   # Docker 컨테이너에서 실행
hermes --sandbox ssh      # SSH를 통한 원격 실행
```

### 메시징 통합

Telegram, Discord, Slack, WhatsApp, Signal, Email, Home Assistant 등과 통합하여 메시징 봇으로 사용할 수 있습니다.

자세한 내용은 [메시징 게이트웨이](/user-guide/messaging)를 참조하세요.

### 크론 예약

```bash
hermes cron add "매일 아침 9시에 뉴스 요약"
hermes cron list
```

### 스킬 설치

```bash
hermes skills install <스킬명>
hermes skills list
```

### MCP 서버 연결

외부 도구 서버를 연결하여 기능을 확장할 수 있습니다. 자세한 내용은 [MCP 연동](/user-guide/features/mcp)을 참조하세요.

## 다음 단계

- [학습 경로](/getting-started/learning-path) — 수준별 학습 가이드
- [설정](/user-guide/configuration) — 상세 설정 방법
- [도구](/user-guide/features/tools) — 도구 시스템 이해하기

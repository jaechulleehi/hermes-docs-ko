---
layout: home

hero:
  name: Hermes Agent
  text: 자기 개선 AI 에이전트
  tagline: Nous Research가 만든 유일한 학습 루프 내장 에이전트 — 경험으로 스킬을 만들고, 사용하면서 개선하며, 지식을 스스로 기억합니다.
  actions:
    - theme: brand
      text: 시작하기
      link: /getting-started/installation
    - theme: alt
      text: GitHub
      link: https://github.com/nousresearch/hermes-agent

features:
  - icon: 🧠
    title: 학습 루프
    details: 복잡한 작업을 수행한 뒤 자동으로 스킬을 생성하고, 사용하면서 점진적으로 개선합니다.
  - icon: 💬
    title: 멀티 플랫폼
    details: Telegram, Discord, Slack, WhatsApp, Signal, Email 등 15개 이상의 메시징 플랫폼 지원.
  - icon: 🔧
    title: 40+ 내장 도구
    details: 웹 검색, 터미널 실행, 브라우저, 미디어, 에이전트 위임 등 강력한 도구셋.
  - icon: 🔌
    title: MCP 지원
    details: Model Context Protocol로 외부 도구 서버를 연결하고, Hermes 자체를 MCP 서버로 노출할 수 있습니다.
  - icon: 🎙️
    title: 음성 모드
    details: CLI와 메시징 플랫폼에서 음성 입출력을 지원합니다.
  - icon: 🛡️
    title: 7중 보안
    details: 사용자 인증, 위험 명령 승인, 컨테이너 격리, 자격증명 필터링 등 심층 방어 체계.
---

## 빠른 설치

```bash
curl -fsSL https://hermes.nousresearch.com/install.sh | bash
```

설치 후 원하는 AI 제공자(OpenAI, Anthropic, OpenRouter 등)의 API 키를 설정하고 `hermes` 명령어로 시작하세요.

## 주요 기능

| 기능 | 설명 |
|------|------|
| **도구** | 40개 이상의 내장 도구, MCP로 무한 확장 |
| **스킬** | 경험에서 자동 생성, 커뮤니티 공유 |
| **메모리** | 세션 간 지식 유지, 사용자 모델링 |
| **컨텍스트 파일** | HERMES.md, AGENTS.md, SOUL.md 등 |
| **크론** | 예약 작업 자동화 |
| **위임** | 서브에이전트에게 작업 위임 |
| **코드 실행** | Docker/SSH 격리 환경 지원 |
| **음성** | STT/TTS 다중 제공자 지원 |

## 라이선스

Hermes Agent는 [MIT 라이선스](https://github.com/nousresearch/hermes-agent/blob/main/LICENSE)로 배포됩니다.

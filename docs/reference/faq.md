# FAQ 및 문제 해결

## 자주 묻는 질문

### 어떤 AI 제공자를 지원하나요?

OpenAI 호환 API를 포함하여 16개 이상의 제공자를 지원합니다:
- OpenAI, Anthropic, Google, OpenRouter
- Groq, Together, Fireworks
- 로컬: Ollama, vLLM, LM Studio
- 기타 OpenAI 호환 API

### Windows에서 사용할 수 있나요?

네이티브 Windows는 지원하지 않습니다. **WSL2**를 사용해야 합니다:

```bash
# WSL2에서 설치
curl -fsSL https://hermes.nousresearch.com/install.sh | bash
```

### Android에서 사용할 수 있나요?

네, **Termux**를 통해 사용할 수 있습니다.

### 텔레메트리를 수집하나요?

아닙니다. Hermes는 **텔레메트리를 수집하지 않습니다**. API 호출은 설정한 AI 제공자에게만 전송됩니다.

### 비용이 얼마인가요?

Hermes Agent 자체는 **무료, 오픈소스(MIT)** 입니다. LLM 제공자의 API 비용만 발생합니다.

### 여러 사용자가 사용할 수 있나요?

네, 메시징 게이트웨이를 통해 여러 사용자가 사용할 수 있습니다. 허용 목록으로 접근을 제어합니다.

### 메모리와 스킬의 차이는?

| | 메모리 | 스킬 |
|---|---|---|
| **용도** | 사실, 선호도 기억 | 절차, 방법 저장 |
| **형태** | 짧은 텍스트 항목 | 구조화된 문서 |
| **로딩** | 항상 로드 | 필요할 때만 |
| **크기** | 제한적 (3,575자) | 유연 |

### Python에서 프로그래밍 방식으로 사용할 수 있나요?

네, `AIAgent` 클래스를 직접 사용할 수 있습니다:

```python
from agent.ai_agent import AIAgent

agent = AIAgent()
response = await agent.chat("안녕하세요")
```

## 문제 해결

### 설치 문제

#### `hermes` 명령어를 찾을 수 없음

```bash
# PATH 확인
echo $PATH | grep -o '.local/bin'

# PATH 추가
export PATH="$HOME/.local/bin:$PATH"

# 영구 적용
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
```

#### Python 버전 문제

Hermes는 **Python 3.11 이상**이 필요합니다:

```bash
python3 --version
# 3.11 미만이면 업그레이드
uv python install 3.11
```

#### uv 설치 문제

```bash
curl -LsSf https://astral.sh/uv/install.sh | bash
```

### 제공자/모델 문제

#### API 키 오류

```bash
hermes auth          # 인증 상태 확인
hermes auth add openai  # 키 재설정
```

#### 속도 제한 (Rate Limit)

- 다른 제공자 추가
- 자격증명 풀 전략을 `round_robin`으로 설정
- 요청 간격 조정

#### 컨텍스트 길이 초과

최소 64K 토큰의 컨텍스트 윈도우가 필요합니다. 더 큰 컨텍스트의 모델을 사용하세요.

#### 타임아웃

```yaml
# config.yaml에서 타임아웃 늘리기
streaming:
  timeout: 120  # 초
```

### 터미널/메시징 문제

#### 위험 명령 차단

Smart 승인 모드를 사용하거나, 특정 명령을 화이트리스트에 추가하세요.

#### Docker 컨테이너 문제

```bash
docker info  # Docker 상태 확인
hermes doctor  # 진단 실행
```

#### 봇이 응답하지 않음

1. 게이트웨이 상태 확인: `hermes gateway status`
2. 로그 확인: `hermes logs tail`
3. 허용 목록에 사용자 추가 확인
4. API 키 유효성 확인

### MCP 문제

#### MCP 서버 연결 실패

```bash
# 서버 명령어 직접 실행해서 확인
npx -y @modelcontextprotocol/server-github

# 환경 변수 확인
echo $GITHUB_TOKEN
```

#### 도구가 표시되지 않음

```
/reload-mcp  # 채팅 내에서 MCP 다시 로드
```

## 추가 도움

- [GitHub Issues](https://github.com/nousresearch/hermes-agent/issues) — 버그 리포트
- [Discord](https://discord.gg/nousresearch) — 커뮤니티 지원
- [GitHub Discussions](https://github.com/nousresearch/hermes-agent/discussions) — 질문 및 토론

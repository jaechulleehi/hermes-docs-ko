# 설치

## 빠른 설치

Linux, macOS, WSL2, Android(Termux) 환경에서 한 줄로 설치할 수 있습니다:

```bash
curl -fsSL https://hermes.nousresearch.com/install.sh | bash
```

설치 스크립트가 자동으로 처리하는 항목:
- Python 3.11+ (없으면 자동 설치)
- Node.js v22+ (없으면 자동 설치)
- ripgrep (코드 검색용)
- ffmpeg (미디어 처리용)

## 사전 요구사항

- **Git** — 유일한 필수 사전 요구사항

## 수동 설치

자동 설치 대신 직접 설치하려면:

```bash
# 1. 저장소 클론
git clone https://github.com/nousresearch/hermes-agent.git
cd hermes-agent

# 2. uv 설치 (Python 패키지 매니저)
curl -LsSf https://astral.sh/uv/install.sh | bash

# 3. Python 3.11 설치
uv python install 3.11

# 4. 가상환경 생성
uv venv --python 3.11

# 5. 가상환경 활성화
source .venv/bin/activate

# 6. 기본 설치
uv pip install -e .

# 7. 선택적 추가 기능 설치
uv pip install -e ".[telegram,discord,slack,cron,tts,voice]"

# 8. Node.js 의존성 설치
npm install

# 9. PATH에 추가
export PATH="$HOME/.local/bin:$PATH"

# 10. 설치 확인
hermes --version
```

## 선택적 추가 기능

| 추가 기능 | 설명 |
|-----------|------|
| `telegram` | Telegram 봇 통합 |
| `discord` | Discord 봇 통합 |
| `slack` | Slack 봇 통합 |
| `whatsapp` | WhatsApp 통합 |
| `signal` | Signal 통합 |
| `cron` | 예약 작업 |
| `tts` | 텍스트 음성 변환 |
| `voice` | 음성 모드 |
| `cloud` | 클라우드 실행 (Modal 등) |
| `homeassistant` | Home Assistant 통합 |

## 설치 후 설정

```bash
# AI 모델 제공자 설정
hermes model

# 사용 가능한 도구 확인
hermes tools

# 초기 설정 마법사
hermes setup
```

## 문제 해결

### PATH 문제

`hermes` 명령어를 찾을 수 없는 경우:

```bash
export PATH="$HOME/.local/bin:$PATH"
# 영구 적용하려면 ~/.bashrc 또는 ~/.zshrc에 추가
```

### API 키 누락

```bash
hermes auth  # API 키 설정/확인
```

### 진단

```bash
hermes doctor  # 시스템 진단 실행
```

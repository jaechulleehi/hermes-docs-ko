---
title: 설치
description: Hermes Agent 설치 가이드 - 원라인 인스톨러, 수동 설치, Termux, Nix 지원
---

# 설치

2분 안에 Hermes Agent를 설치하고 실행할 수 있습니다. 원라인 인스톨러를 사용하거나, 수동 설치로 완전한 제어를 할 수 있습니다.

## 빠른 설치

### Linux / macOS / WSL2

```bash
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
```

### Android / Termux

```bash
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
```

인스톨러가 Termux를 자동 감지하여 Android 전용 플로우로 전환합니다:
- Termux `pkg`로 시스템 의존성 설치 (`git`, `python`, `nodejs`, `ripgrep`, `ffmpeg`, 빌드 도구)
- `python -m venv`으로 가상환경 생성
- `ANDROID_API_LEVEL` 자동 설정 (Android 휠 빌드용)
- `.[termux]` 큐레이팅된 추가 기능을 `pip`으로 설치
- 테스트되지 않은 브라우저/WhatsApp 부트스트랩은 기본적으로 건너뜀

### Windows

네이티브 Windows는 **지원하지 않습니다**. WSL2를 설치하고 그 안에서 Hermes Agent를 실행하세요. 위의 설치 명령어는 WSL2 안에서 동작합니다.

### 인스톨러가 하는 일

인스톨러가 모든 것을 자동으로 처리합니다 — 모든 의존성(Python, Node.js, ripgrep, ffmpeg), 저장소 클론, 가상환경, 전역 `hermes` 명령어 설정, LLM 제공자 설정.

### 설치 후

셸을 다시 로드하고 대화를 시작하세요:

```bash
source ~/.bashrc   # 또는: source ~/.zshrc
hermes             # 대화 시작!
```

나중에 개별 설정을 변경하려면 전용 명령어를 사용하세요:

```bash
hermes model          # LLM 제공자와 모델 선택
hermes tools          # 활성화할 도구 설정
hermes gateway setup  # 메시징 플랫폼 설정
hermes config set     # 개별 설정값 변경
hermes setup          # 전체 설정 마법사 실행
```

## 사전 요구사항

유일한 사전 요구사항은 **Git**입니다. 인스톨러가 나머지를 자동으로 처리합니다:

- **uv** (빠른 Python 패키지 매니저)
- **Python 3.11** (uv를 통해 설치, sudo 불필요)
- **Node.js v22** (브라우저 자동화 및 WhatsApp 브릿지용)
- **ripgrep** (빠른 파일 검색)
- **ffmpeg** (TTS용 오디오 포맷 변환)

Python, Node.js, ripgrep, ffmpeg를 수동으로 설치할 **필요가 없습니다**. 인스톨러가 누락된 항목을 감지하고 자동 설치합니다.

::: tip Nix 사용자
Nix(NixOS, macOS, Linux)를 사용하는 경우, Nix flake, 선언적 NixOS 모듈, 선택적 컨테이너 모드가 포함된 전용 설정 경로가 있습니다. Nix & NixOS 설정 가이드를 참조하세요.
:::

## 수동 설치

### Step 1: 저장소 클론

```bash
git clone --recurse-submodules https://github.com/NousResearch/hermes-agent.git
cd hermes-agent
```

이미 `--recurse-submodules` 없이 클론했다면:

```bash
git submodule update --init --recursive
```

### Step 2: uv 설치 및 가상환경 생성

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
uv venv venv --python 3.11
```

`hermes`를 사용하기 위해 venv를 활성화할 **필요가 없습니다**. 진입점에 venv Python을 가리키는 하드코딩된 shebang이 있어서 심링크만 하면 전역으로 동작합니다.

### Step 3: Python 의존성 설치

```bash
export VIRTUAL_ENV="$(pwd)/venv"
uv pip install -e ".[all]"
```

코어 에이전트만 원하는 경우 (Telegram/Discord/크론 지원 없이):

```bash
uv pip install -e "."
```

### 선택적 추가 기능 상세

| 추가 기능 | 포함 내용 | 설치 명령어 |
|-----------|-----------|-------------|
| `all` | 아래 모든 것 | `uv pip install -e ".[all]"` |
| `messaging` | Telegram, Discord & Slack 게이트웨이 | `uv pip install -e ".[messaging]"` |
| `cron` | 예약 작업용 크론 표현식 파싱 | `uv pip install -e ".[cron]"` |
| `cli` | 설정 마법사용 터미널 메뉴 UI | `uv pip install -e ".[cli]"` |
| `modal` | Modal 클라우드 실행 백엔드 | `uv pip install -e ".[modal]"` |
| `tts-premium` | ElevenLabs 프리미엄 음성 | `uv pip install -e ".[tts-premium]"` |
| `voice` | CLI 마이크 입력 + 오디오 재생 | `uv pip install -e ".[voice]"` |
| `pty` | PTY 터미널 지원 | `uv pip install -e ".[pty]"` |
| `termux` | 테스트된 Android/Termux 번들 | `python -m pip install -e ".[termux]" -c constraints-termux.txt` |
| `honcho` | AI 네이티브 메모리 (Honcho 연동) | `uv pip install -e ".[honcho]"` |
| `mcp` | Model Context Protocol 지원 | `uv pip install -e ".[mcp]"` |
| `homeassistant` | Home Assistant 연동 | `uv pip install -e ".[homeassistant]"` |
| `acp` | ACP 에디터 연동 지원 | `uv pip install -e ".[acp]"` |
| `slack` | Slack 메시징 | `uv pip install -e ".[slack]"` |
| `dev` | pytest & 테스트 유틸리티 | `uv pip install -e ".[dev]"` |

추가 기능을 조합할 수 있습니다: `uv pip install -e ".[messaging,cron]"`

::: warning Termux 사용자
`.[all]`은 현재 Android에서 사용할 수 없습니다. `voice` 추가 기능이 `faster-whisper`를 가져오는데, 이는 Android용으로 배포되지 않은 `ctranslate2` 휠에 의존합니다. 테스트된 모바일 설치 경로인 `.[termux]`를 사용하고, 필요에 따라 개별 추가 기능을 추가하세요.
:::

### Step 4: 선택적 서브모듈 설치

```bash
uv pip install -e "./tinker-atropos"
```

둘 다 선택사항입니다 — 건너뛰면 해당 도구셋이 표시되지 않습니다.

### Step 5: Node.js 의존성 설치 (선택)

**브라우저 자동화**(Browserbase 기반) 및 **WhatsApp 브릿지**에만 필요합니다:

```bash
npm install
```

### Step 6: 설정 디렉토리 생성

```bash
mkdir -p ~/.hermes/{cron,sessions,logs,memories,skills,pairing,hooks,image_cache,audio_cache,whatsapp/session}
cp cli-config.yaml.example ~/.hermes/config.yaml
touch ~/.hermes/.env
```

### Step 7: API 키 추가

`~/.hermes/.env`를 열고 최소한 LLM 제공자 키를 추가하세요:

```bash
OPENROUTER_API_KEY=sk-or-v1-your-key-here
FIRECRAWL_API_KEY=fc-your-key          # 웹 검색 & 스크래핑 (또는 셀프 호스트)
FAL_KEY=your-fal-key                   # 이미지 생성 (FLUX)
```

또는 CLI로 설정:

```bash
hermes config set OPENROUTER_API_KEY sk-or-v1-your-key-here
```

### Step 8: PATH에 `hermes` 추가

```bash
mkdir -p ~/.local/bin
ln -sf "$(pwd)/venv/bin/hermes" ~/.local/bin/hermes
```

`~/.local/bin`이 PATH에 없다면:

```bash
# Bash
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc && source ~/.bashrc
# Zsh
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc && source ~/.zshrc
# Fish
fish_add_path $HOME/.local/bin
```

### Step 9: 제공자 설정

```bash
hermes model
```

### Step 10: 설치 확인

```bash
hermes version
hermes doctor
hermes status
hermes chat -q "Hello! What tools do you have available?"
```

## 수동 설치 요약 (한 번에)

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
git clone --recurse-submodules https://github.com/NousResearch/hermes-agent.git
cd hermes-agent
uv venv venv --python 3.11
export VIRTUAL_ENV="$(pwd)/venv"
uv pip install -e ".[all]"
uv pip install -e "./tinker-atropos"
npm install
mkdir -p ~/.hermes/{cron,sessions,logs,memories,skills,pairing,hooks,image_cache,audio_cache,whatsapp/session}
cp cli-config.yaml.example ~/.hermes/config.yaml
touch ~/.hermes/.env
echo 'OPENROUTER_API_KEY=sk-or-v1-your-key' >> ~/.hermes/.env
mkdir -p ~/.local/bin
ln -sf "$(pwd)/venv/bin/hermes" ~/.local/bin/hermes
hermes doctor
hermes
```

## 문제 해결

| 문제 | 해결 방법 |
|------|-----------|
| `hermes: command not found` | 셸 다시 로드 (`source ~/.bashrc`) 또는 PATH 확인 |
| `API key not set` | `hermes model`로 제공자 설정, 또는 `hermes config set OPENROUTER_API_KEY your_key` |
| 업데이트 후 설정 누락 | `hermes config check` 후 `hermes config migrate` 실행 |

더 자세한 진단은 `hermes doctor`를 실행하세요.

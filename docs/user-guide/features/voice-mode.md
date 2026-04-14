---
title: 음성 모드
description: Hermes Agent 음성 모드 - CLI 음성, Telegram/Discord 음성, STT/TTS 제공자
---

# 음성 모드

Hermes Agent는 CLI와 메시징 플랫폼에서 전체 음성 인터랙션을 지원합니다.

## 사전 요구사항

- Hermes Agent 설치 완료
- LLM 제공자 설정 완료

### Python 패키지

```bash
uv pip install -e ".[voice]"           # CLI 음성
uv pip install -e ".[messaging]"       # 메시징 봇
uv pip install -e ".[tts-premium]"     # ElevenLabs 프리미엄
```

### 시스템 의존성

| 의존성 | 용도 |
|--------|------|
| PortAudio | 오디오 입출력 |
| FFmpeg | 오디오 변환 |
| Opus 코덱 | Discord 음성 |
| espeak-ng | 폴백 TTS |

**macOS:**
```bash
brew install portaudio ffmpeg opus espeak-ng
```

**Ubuntu/Debian:**
```bash
sudo apt install portaudio19-dev ffmpeg libopus-dev espeak-ng
```

### API 키

```bash
# STT -- 로컬은 키 불필요
GROQ_API_KEY=your-key
VOICE_TOOLS_OPENAI_KEY=your-key

# TTS -- Edge TTS와 NeuTTS는 키 불필요
ELEVENLABS_API_KEY=your-key
```

::: tip 제로 API 키 모드
`faster-whisper`가 설치되어 있으면, STT에 API 키 **없이** 음성 모드가 동작합니다.
:::

## CLI 음성 모드

- `/voice` 명령어 또는 `Ctrl+B`로 녹음 시작
- 실시간 오디오 레벨 바 표시
- 3초 무음 감지 시 자동 종료
- 스트리밍 TTS (문장 단위로 재생)
- 할루시네이션 필터 (26개 알려진 구문 차단)

### 무음 감지

2단계 감지 방식:

1. **발화 확인**: RMS 임계값 200, 최소 0.3초
2. **종료 감지**: 3.0초 연속 무음

발화 없이 15초가 지나면 자동 종료됩니다.

## 게이트웨이 음성 응답

### Discord

| 모드 | 명령어 | 동작 |
|------|--------|------|
| 꺼짐 | (기본값) | 텍스트만 응답 |
| 음성만 | `/voice on` | 음성 메시지에만 음성 응답 |
| 전부 | `/voice tts` | 모든 응답을 음성으로 |

### Telegram

Opus/OGG 음성 버블로 전달됩니다.

## Discord 음성 채널

봇이 음성 채널에 참여하여 사용자별로 듣고, 전사하고, 처리하고, 말합니다.

### 요구사항

- Connect, Speak, Use Voice Activity 권한
- Privileged 인텐트 필요
- Opus 코덱 필수

### 명령어

```
/voice join    # 음성 채널 참여
/voice leave   # 음성 채널 나가기
/voice status  # 현재 상태 확인
```

### 에코 방지

봇이 자신의 출력을 듣지 않도록 에코 방지가 적용됩니다.

### 접근 제어

`DISCORD_ALLOWED_USERS`로 접근을 제한할 수 있습니다.

## 설정 레퍼런스

```yaml
voice:
  record_key: "ctrl+b"        # 녹음 키
  max_recording_seconds: 15    # 최대 녹음 시간
  auto_tts: false              # 자동 TTS 응답
  silence_threshold: 200       # 무음 RMS 임계값
  silence_duration: 3.0        # 무음 지속 시간 (초)

stt:
  provider: "local"            # local, groq, openai
  local:
    model: "base"              # base, small, large-v3

tts:
  provider: "edge"             # edge, elevenlabs, openai, neutts
  edge:
    voice: "ko-KR-SunHiNeural"
  elevenlabs:
    voice_id: "your-voice-id"
    model_id: "eleven_multilingual_v2"
  openai:
    voice: "alloy"
    model: "tts-1"
  neutts:
    model: "default"
```

## STT 제공자 비교

| 제공자 | 모델 | 속도 | 비용 |
|--------|------|------|------|
| **로컬** (Whisper) | base / small / large-v3 | GPU 권장 | 무료 |
| **Groq** | whisper-large-v3-turbo / whisper-large-v3 | 매우 빠름 | 유료 |
| **OpenAI** | whisper-1 / gpt-4o-transcribe | 빠름 | 유료 |

제공자 우선순위: local > groq > openai

## TTS 제공자 비교

| 제공자 | 품질 | 비용 | 특징 |
|--------|------|------|------|
| **Edge TTS** | 좋음 | 무료 | Microsoft, 다양한 언어 |
| **ElevenLabs** | 최고 | 유료 | 최고 품질, 음성 복제 |
| **OpenAI TTS** | 좋음 | 유료 | 안정적 |
| **NeuTTS** | 보통 | 무료 | 로컬 실행 |

### 한국어 Edge TTS 음성

| 음성 | 성별 |
|------|------|
| `ko-KR-SunHiNeural` | 여성 |
| `ko-KR-InJoonNeural` | 남성 |
| `ko-KR-BongJinNeural` | 남성 |
| `ko-KR-GookMinNeural` | 남성 |
| `ko-KR-JiMinNeural` | 여성 |
| `ko-KR-SeoHyeonNeural` | 여성 |
| `ko-KR-SoonBokNeural` | 여성 |
| `ko-KR-YuJinNeural` | 여성 |

## 문제 해결

| 문제 | 해결 방법 |
|------|-----------|
| 오디오 장치 없음 | `portaudio` 설치 확인, `python -c "import sounddevice; print(sounddevice.query_devices())"` |
| 봇이 음성 채널에서 응답 안 함 | Opus 코덱 설치, Privileged 인텐트 확인 |
| 봇이 채널에 참여하지만 듣지 못함 | Discord 봇 권한 확인 (Connect, Speak, Use Voice Activity) |
| 봇이 듣지만 응답 안 함 | LLM 제공자 설정 확인, API 키 확인 |
| 텍스트로만 응답 | `/voice on` 또는 `/voice tts`로 모드 변경 |
| Whisper 쓰레기 텍스트 | 할루시네이션 필터 확인, 더 큰 모델 사용 (base → small → large-v3) |

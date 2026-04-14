# 음성 모드

Hermes Agent는 CLI와 메시징 플랫폼에서 음성 입출력을 지원합니다.

## CLI 음성 모드

터미널에서 `Ctrl+B`로 음성 모드를 토글합니다. 자동 무음 감지로 말하기를 멈추면 자동으로 텍스트로 변환됩니다.

## 메시징 플랫폼

### Telegram

음성 메시지를 보내면 자동으로 텍스트로 변환하여 처리하고, 음성으로 응답합니다.

### Discord

채널 내 음성 명령 및 음성 채널 참여를 지원합니다:

```
/voice join    # 음성 채널 참여
/voice leave   # 음성 채널 나가기
/voice status  # 현재 상태 확인
```

## 사전 요구사항

### Python 패키지

```bash
uv pip install -e ".[voice]"
```

필요한 패키지: `sounddevice`, `numpy`, `discord.py[voice]`, `python-telegram-bot`

### 시스템 의존성

| 의존성 | 용도 |
|--------|------|
| PortAudio | 오디오 입출력 |
| FFmpeg | 오디오 변환 |
| Opus 코덱 | Discord 음성 |
| espeak-ng | 폴백 TTS |

### macOS 설치

```bash
brew install portaudio ffmpeg opus espeak-ng
```

### Ubuntu/Debian 설치

```bash
sudo apt install portaudio19-dev ffmpeg libopus-dev espeak-ng
```

## STT (음성→텍스트) 제공자

| 제공자 | 설명 |
|--------|------|
| **로컬 (Whisper)** | 오프라인, 무료, GPU 권장 |
| **Groq** | 빠른 클라우드 STT |
| **OpenAI** | Whisper API |

```yaml
stt:
  provider: groq  # local, groq, openai
```

## TTS (텍스트→음성) 제공자

| 제공자 | 설명 | 비용 |
|--------|------|------|
| **Edge TTS** | Microsoft, 무료 | 무료 |
| **ElevenLabs** | 고품질 음성 | 유료 |
| **OpenAI** | OpenAI TTS | 유료 |
| **NeuTTS** | 경량 TTS | 무료 |

```yaml
tts:
  provider: edge
  voice: ko-KR-SunHiNeural  # 한국어 음성
```

### 사용 가능한 한국어 Edge TTS 음성

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

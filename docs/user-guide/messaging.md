# 메시징 게이트웨이

Hermes Agent는 다양한 메시징 플랫폼과 통합하여 AI 봇으로 운영할 수 있습니다.

## 지원 플랫폼

| 플랫폼 | 텍스트 | 음성 | 이미지 | 그룹 채팅 |
|--------|:------:|:----:|:------:|:---------:|
| Telegram | ✅ | ✅ | ✅ | ✅ |
| Discord | ✅ | ✅ | ✅ | ✅ |
| Slack | ✅ | ❌ | ✅ | ✅ |
| WhatsApp | ✅ | ✅ | ✅ | ✅ |
| Signal | ✅ | ❌ | ✅ | ✅ |
| SMS | ✅ | ❌ | ❌ | ❌ |
| Email | ✅ | ❌ | ✅ | ❌ |
| Home Assistant | ✅ | ✅ | ❌ | ❌ |
| Mattermost | ✅ | ❌ | ✅ | ✅ |
| Matrix | ✅ | ❌ | ✅ | ✅ |
| DingTalk | ✅ | ❌ | ✅ | ✅ |
| Feishu/Lark | ✅ | ❌ | ✅ | ✅ |
| WeCom | ✅ | ❌ | ✅ | ✅ |
| BlueBubbles | ✅ | ❌ | ✅ | ✅ |
| QQ | ✅ | ❌ | ✅ | ✅ |
| Web | ✅ | ❌ | ✅ | ❌ |

## 아키텍처

```
사용자 메시지 → 플랫폼 어댑터 → 세션 라우터 → AIAgent
                                    ↕
                              크론 스케줄러
```

각 채팅방마다 독립적인 세션이 유지됩니다.

## 게이트웨이 시작

```bash
hermes gateway start
```

### 서비스로 등록

**Linux (systemd):**
```bash
hermes gateway install  # systemd 서비스 등록
sudo systemctl enable hermes-gateway
sudo systemctl start hermes-gateway
```

**macOS (launchd):**
```bash
hermes gateway install  # launchd 에이전트 등록
```

## 채팅 내 명령어

| 명령어 | 설명 |
|--------|------|
| `/new` | 새 세션 시작 |
| `/reset` | 세션 초기화 |
| `/model` | 모델 변경 |
| `/personality` | 성격 임시 변경 |
| `/voice` | 음성 모드 토글 |
| `/background` | 백그라운드 세션 시작 |
| `/help` | 도움말 |

총 20개 이상의 채팅 내 명령어를 지원합니다.

## 세션 관리

- **일일 초기화**: 매일 자정에 새 세션으로 자동 전환 (설정 가능)
- **유휴 타임아웃**: 일정 시간 활동이 없으면 세션 종료

## 보안

### 기본 거부 정책

기본적으로 모든 사용자의 접근이 차단되며, 명시적으로 허용 목록에 추가해야 합니다:

```yaml
gateway:
  allowed_users:
    telegram:
      - "123456789"  # Telegram 사용자 ID
    discord:
      - "987654321"  # Discord 사용자 ID
```

### DM 페어링

허용 목록 대신 8자리 암호 코드를 사용한 1:1 페어링도 지원합니다.

## 작업 중단

사용자가 새 메시지를 보내면 진행 중인 작업이 자동으로 중단됩니다.

## 백그라운드 세션

오래 걸리는 작업을 백그라운드에서 실행하고, 완료되면 알림을 받을 수 있습니다:

```
/background 이 저장소를 분석하고 코드 리뷰해줘
```

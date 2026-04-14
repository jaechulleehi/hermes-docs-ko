# OpenClaw에서 Hermes Agent로 마이그레이션

이 가이드는 OpenClaw의 설정, 메모리, 스킬, API 키를 Hermes Agent로 가져오는 방법을 안내합니다.

## 마이그레이션 방법 세 가지

### 1. 자동 (첫 설정 시)

`hermes setup`을 처음 실행할 때 Hermes가 `~/.openclaw`를 감지하면, 설정 시작 전에 자동으로 OpenClaw 데이터 가져오기를 제안합니다. 프롬프트에 수락하면 모든 것이 자동으로 처리됩니다.

### 2. CLI 명령어 (빠르고 스크립트 가능)

```bash
hermes claw migrate                      # 미리보기 후 마이그레이션 (항상 미리보기 먼저)
hermes claw migrate --dry-run            # 미리보기만, 변경 없음
hermes claw migrate --preset user-data   # API 키/시크릿 없이 마이그레이션
hermes claw migrate --yes                # 확인 프롬프트 건너뛰기
```

마이그레이션은 항상 변경 전에 가져올 내용의 전체 미리보기를 보여줍니다. 미리보기를 검토하고 확인한 후에 작성이 이루어집니다.

**전체 옵션:**

| 플래그 | 설명 |
|--------|------|
| `--source PATH` | OpenClaw 디렉토리 경로 (기본값: `~/.openclaw`) |
| `--dry-run` | 미리보기만 — 파일 수정 없음 |
| `--preset {user-data,full}` | 마이그레이션 프리셋 (기본값: `full`). `user-data`는 시크릿 제외 |
| `--overwrite` | 기존 파일 덮어쓰기 (기본값: 충돌 건너뛰기) |
| `--migrate-secrets` | 허용된 시크릿 포함 (`full` 프리셋에서 자동 활성화) |
| `--workspace-target PATH` | 워크스페이스 지시사항(AGENTS.md)을 이 절대 경로에 복사 |
| `--skill-conflict {skip,overwrite,rename}` | 스킬 이름 충돌 처리 방법 (기본값: `skip`) |
| `--yes`, `-y` | 확인 프롬프트 건너뛰기 |

### 3. 에이전트 안내 (대화형, 미리보기 포함)

에이전트에게 마이그레이션을 요청합니다:

```
> OpenClaw 설정을 Hermes로 마이그레이션해줘
```

에이전트가 `openclaw-migration` 스킬을 사용하여:
1. 미리보기를 먼저 실행하여 변경될 내용 표시
2. 충돌 해결 방법 질문 (SOUL.md, 스킬 등)
3. `user-data`와 `full` 프리셋 중 선택
4. 선택한 내용으로 마이그레이션 실행
5. 마이그레이션된 내용의 상세 요약 출력

## 마이그레이션 대상

### `user-data` 프리셋
| 항목 | 소스 | 대상 |
|------|------|------|
| SOUL.md | `~/.openclaw/workspace/SOUL.md` | `~/.hermes/SOUL.md` |
| 메모리 항목 | `~/.openclaw/workspace/MEMORY.md` | `~/.hermes/memories/MEMORY.md` |
| 사용자 프로필 | `~/.openclaw/workspace/USER.md` | `~/.hermes/memories/USER.md` |
| 스킬 | `~/.openclaw/workspace/skills/` | `~/.hermes/skills/openclaw-imports/` |
| 명령어 허용 목록 | `~/.openclaw/workspace/exec_approval_patterns.yaml` | `~/.hermes/config.yaml`에 병합 |
| 메시징 설정 | `~/.openclaw/config.yaml` (TELEGRAM_ALLOWED_USERS, MESSAGING_CWD) | `~/.hermes/.env` |
| TTS 에셋 | `~/.openclaw/workspace/tts/` | `~/.hermes/tts/` |

워크스페이스 파일은 `workspace.default/`와 `workspace-main/`도 대체 경로로 확인합니다 (OpenClaw의 최신 버전에서 `workspace/`를 `workspace-main/`으로 이름 변경).

### `full` 프리셋 (`user-data`에 추가)
| 항목 | 소스 | 대상 |
|------|------|------|
| Telegram 봇 토큰 | `openclaw.json` 채널 설정 | `~/.hermes/.env` |
| OpenRouter API 키 | `.env`, `openclaw.json`, 또는 `openclaw.json["env"]` | `~/.hermes/.env` |
| OpenAI API 키 | `.env`, `openclaw.json`, 또는 `openclaw.json["env"]` | `~/.hermes/.env` |
| Anthropic API 키 | `.env`, `openclaw.json`, 또는 `openclaw.json["env"]` | `~/.hermes/.env` |
| ElevenLabs API 키 | `.env`, `openclaw.json`, 또는 `openclaw.json["env"]` | `~/.hermes/.env` |

API 키는 네 곳에서 검색합니다: 인라인 설정 값, `~/.openclaw/.env`, `openclaw.json`의 `"env"` 서브 오브젝트, 그리고 에이전트별 인증 프로필.

허용된 시크릿만 가져옵니다. 그 외 자격증명은 건너뛰고 보고됩니다.

## OpenClaw 스키마 호환성

마이그레이션은 구형 및 현재 OpenClaw 설정 레이아웃을 모두 처리합니다:

- **채널 토큰**: 플랫 경로 (`channels.telegram.botToken`)와 새 `accounts.default` 레이아웃 (`channels.telegram.accounts.default.botToken`) 모두 읽기
- **TTS 프로바이더**: OpenClaw가 "edge"를 "microsoft"로 이름 변경 — 둘 다 인식하여 Hermes의 "edge"로 매핑
- **프로바이더 API 타입**: 단축형 (`openai`, `anthropic`)과 하이픈형 (`openai-completions`, `anthropic-messages`, `google-generative-ai`) 모두 올바르게 매핑
- **thinkingDefault**: 새 값(`minimal`, `xhigh`, `adaptive`) 포함 모든 열거형 값 처리
- **Matrix**: `accessToken` 필드 사용 (`botToken` 아님)
- **SecretRef 형식**: 일반 문자열, 환경변수 템플릿 (`${VAR}`), `source: "env"` SecretRef 해석. `source: "file"`과 `source: "exec"` SecretRef는 경고를 생성 — 마이그레이션 후 해당 키를 수동으로 추가하세요.

## 충돌 처리

기본적으로 마이그레이션은 기존 Hermes 데이터를 **덮어쓰지 않습니다**:

- **SOUL.md** — `~/.hermes/`에 이미 존재하면 건너뜀
- **메모리 항목** — 이미 메모리가 존재하면 건너뜀 (중복 방지)
- **스킬** — 같은 이름의 스킬이 이미 존재하면 건너뜀
- **API 키** — 키가 `~/.hermes/.env`에 이미 설정되어 있으면 건너뜀

충돌을 덮어쓰려면 `--overwrite`를 사용하세요. 덮어쓰기 전 마이그레이션이 백업을 생성합니다.

스킬의 경우 `--skill-conflict rename`을 사용하여 충돌 스킬을 새 이름으로 가져올 수 있습니다 (예: `skill-name-imported`).

## 마이그레이션 보고서

모든 마이그레이션은 다음을 표시하는 보고서를 생성합니다:
- **마이그레이션된 항목** — 성공적으로 가져온 내용
- **충돌** — 이미 존재하여 건너뛴 항목
- **건너뛴 항목** — 소스에서 찾지 못한 항목
- **오류** — 가져오기에 실패한 항목

실행된 마이그레이션의 경우 전체 보고서가 `~/.hermes/migration/openclaw/<타임스탬프>/`에 저장됩니다.

## 마이그레이션 후 참고사항

- **스킬은 새 세션 필요** — 가져온 스킬은 에이전트를 재시작하거나 새 채팅을 시작한 후 적용됩니다.
- **WhatsApp 재연결 필요** — WhatsApp은 토큰 기반 인증이 아닌 QR 코드 페어링을 사용합니다. `hermes whatsapp`을 실행하여 재연결하세요.
- **아카이브 정리** — 마이그레이션 후 상태 혼선 방지를 위해 `~/.openclaw/`을 `.openclaw.pre-migration/`으로 이름 변경할 것을 제안합니다. 나중에 `hermes claw cleanup`을 실행할 수도 있습니다.

## 문제 해결

### "OpenClaw directory not found"
마이그레이션은 기본적으로 `~/.openclaw`를 찾고, 그 다음 `~/.clawdbot`과 `~/.moltbot`을 시도합니다. OpenClaw가 다른 곳에 설치된 경우 `--source`를 사용하세요:
```bash
hermes claw migrate --source /path/to/.openclaw
```

### "Migration script not found"
마이그레이션 스크립트는 Hermes Agent와 함께 제공됩니다. pip로 설치한 경우 (git clone이 아님) `optional-skills/` 디렉토리가 없을 수 있습니다. 스킬 허브에서 스킬을 설치하세요:
```bash
hermes skills install openclaw-migration
```

### 메모리 오버플로우
OpenClaw의 MEMORY.md 또는 USER.md가 Hermes의 문자 제한을 초과하면 초과 항목이 마이그레이션 보고서 디렉토리의 오버플로우 파일로 내보내집니다. 수동으로 검토하여 가장 중요한 항목을 추가할 수 있습니다.

### API 키를 찾을 수 없음
키는 OpenClaw 설정에 따라 여러 위치에 저장될 수 있습니다:
- `~/.openclaw/.env` 파일
- `openclaw.json`의 `models.providers.*.apiKey` 인라인
- `openclaw.json`의 `"env"` 또는 `"env.vars"` 서브 오브젝트
- `~/.openclaw/agents/main/agent/auth-profiles.json`

마이그레이션이 네 곳 모두를 확인합니다. 키가 `source: "file"` 또는 `source: "exec"` SecretRef를 사용하는 경우 자동으로 해석할 수 없습니다 — `hermes config set`으로 수동 추가하세요.

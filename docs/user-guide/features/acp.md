# ACP (Agent Client Protocol) 설정 가이드

Hermes Agent는 **Agent Client Protocol (ACP)** 을 지원합니다. ACP를 통해 에디터 안에서 코딩 에이전트로 Hermes를 실행할 수 있습니다. IDE가 Hermes에 작업을 전송하면, Hermes는 파일 편집, 터미널 명령어, 설명을 에디터 UI에 네이티브하게 표시합니다.

---

## 사전 조건

- Hermes Agent 설치 및 설정 완료 (`hermes setup` 실행)
- `~/.hermes/.env` 또는 `hermes login`을 통해 API 키 / 프로바이더 설정
- Python 3.11+

ACP 추가 패키지 설치:

```bash
pip install -e ".[acp]"
```

---

## VS Code 설정

### 1. ACP Client 확장 설치

VS Code를 열고 마켓플레이스에서 **ACP Client**를 설치합니다:

- `Ctrl+Shift+X` (macOS: `Cmd+Shift+X`) 누르기
- **"ACP Client"** 검색
- **설치** 클릭

또는 커맨드라인에서 설치:

```bash
code --install-extension anysphere.acp-client
```

### 2. settings.json 설정

VS Code 설정 (`Ctrl+,` → `{}` 아이콘 클릭)을 열고 다음을 추가합니다:

```json
{
  "acpClient.agents": [
    {
      "name": "hermes-agent",
      "registryDir": "/path/to/hermes-agent/acp_registry"
    }
  ]
}
```

`/path/to/hermes-agent`를 실제 Hermes Agent 설치 경로로 교체하세요 (예: `~/.hermes/hermes-agent`).

`hermes`가 PATH에 있다면 ACP Client가 레지스트리 디렉토리를 통해 자동으로 검색할 수 있습니다.

### 3. VS Code 재시작

설정 후 VS Code를 재시작하면 채팅/에이전트 패널의 ACP 에이전트 선택기에 **Hermes Agent**가 나타납니다.

---

## Zed 설정

Zed는 ACP를 기본 지원합니다.

### 1. Zed 설정 구성

Zed 설정 (macOS: `Cmd+,`, Linux: `Ctrl+,`)을 열고 `settings.json`에 추가합니다:

```json
{
  "agent_servers": {
    "hermes-agent": {
      "type": "custom",
      "command": "hermes",
      "args": ["acp"],
    },
  },
}
```

### 2. Zed 재시작

에이전트 패널에 Hermes Agent가 나타납니다. 선택 후 대화를 시작하세요.

---

## JetBrains 설정 (IntelliJ, PyCharm, WebStorm 등)

### 1. ACP 플러그인 설치

- **설정** → **플러그인** → **마켓플레이스** 열기
- **"ACP"** 또는 **"Agent Client Protocol"** 검색
- 설치 후 IDE 재시작

### 2. 에이전트 설정

- **설정** → **도구** → **ACP Agents** 열기
- **+** 클릭하여 새 에이전트 추가
- 레지스트리 디렉토리를 `acp_registry/` 폴더로 설정:
  `/path/to/hermes-agent/acp_registry`
- **확인** 클릭

### 3. 에이전트 사용

ACP 패널 (보통 우측 사이드바)을 열고 **Hermes Agent**를 선택합니다.

---

## 에디터에서 보이는 화면

연결 완료 후 에디터가 Hermes Agent의 네이티브 인터페이스를 제공합니다:

### 채팅 패널
작업 설명, 질문, 지시를 입력하는 대화형 인터페이스. Hermes가 설명과 동작으로 응답합니다.

### 파일 Diff
Hermes가 파일을 편집할 때 에디터에서 표준 diff를 확인할 수 있습니다:
- 개별 변경사항 **수락**
- 원하지 않는 변경사항 **거부**
- 적용 전 전체 diff **검토**

### 터미널 명령어
Hermes가 셸 명령어 (빌드, 테스트, 설치 등)를 실행해야 할 때 에디터의 통합 터미널에 표시됩니다. 설정에 따라:
- 명령어가 자동으로 실행되거나
- 각 명령어 실행 전 **승인** 요청

### 승인 흐름
잠재적으로 위험한 작업에 대해 Hermes 진행 전 에디터가 승인을 요청합니다:
- 파일 삭제
- 셸 명령어
- Git 작업

---

## 설정

ACP에서의 Hermes Agent는 CLI와 **동일한 설정**을 사용합니다:

- **API 키 / 프로바이더**: `~/.hermes/.env`
- **에이전트 설정**: `~/.hermes/config.yaml`
- **스킬**: `~/.hermes/skills/`
- **세션**: `~/.hermes/state.db`

`hermes setup`으로 프로바이더를 설정하거나 `~/.hermes/.env`를 직접 편집할 수 있습니다.

### 모델 변경

`~/.hermes/config.yaml` 편집:

```yaml
model: openrouter/nous/hermes-3-llama-3.1-70b
```

또는 `HERMES_MODEL` 환경변수를 설정하세요.

### 도구셋

ACP 세션은 기본적으로 `hermes-acp` 도구셋을 사용합니다. 에디터 워크플로우에 최적화되어 있으며, 메시징 전달, 크론 작업 관리, 오디오 UX 기능은 의도적으로 제외됩니다.

---

## 문제 해결

### 에디터에 에이전트가 나타나지 않음

1. **레지스트리 경로 확인** — 에디터 설정의 `acp_registry/` 디렉토리 경로가 올바르고 `agent.json`을 포함하는지 확인합니다.
2. **`hermes`가 PATH에 있는지 확인** — 터미널에서 `which hermes` 실행. 없다면 가상환경 활성화 또는 PATH에 추가가 필요합니다.
3. 설정 변경 후 **에디터를 재시작**합니다.

### 에이전트가 시작되지만 즉시 오류 발생

1. `hermes doctor`를 실행하여 설정을 확인합니다.
2. 유효한 API 키가 있는지 확인: `hermes status`
3. 터미널에서 `hermes acp`를 직접 실행하여 오류 출력을 확인합니다.

### "Module not found" 오류

ACP 추가 패키지가 설치되어 있는지 확인합니다:

```bash
pip install -e ".[acp]"
```

### 느린 응답

- ACP는 응답을 스트리밍하므로 점진적인 출력이 보여야 합니다. 에이전트가 멈춘 것처럼 보이면 네트워크 연결 및 API 프로바이더 상태를 확인하세요.
- 일부 프로바이더는 속도 제한이 있습니다. 다른 모델/프로바이더로 전환해보세요.

### 터미널 명령어 권한 거부

에디터가 터미널 명령어를 차단한다면 ACP Client 확장 설정에서 자동 승인 또는 수동 승인 기본설정을 확인하세요.

### 로그

Hermes는 ACP 모드에서 실행 시 stderr에 로그를 기록합니다:
- VS Code: **출력** 패널 → **ACP Client** 또는 **Hermes Agent** 선택
- Zed: **보기** → **터미널 전환** 후 프로세스 출력 확인
- JetBrains: **이벤트 로그** 또는 ACP 도구 창

상세 로깅 활성화:

```bash
HERMES_LOG_LEVEL=DEBUG hermes acp
```

---

## 추가 자료

- [ACP 사양](https://github.com/anysphere/acp)
- [Hermes Agent 문서](https://github.com/NousResearch/hermes-agent)
- `hermes --help`로 모든 CLI 옵션 확인

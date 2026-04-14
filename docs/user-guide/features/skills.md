# 스킬 시스템

스킬은 Hermes Agent의 핵심 학습 메커니즘입니다. 복잡한 작업을 수행한 후 자동으로 생성되어, 향후 유사한 작업에서 재사용됩니다.

## 스킬이란?

스킬은 **온디맨드 지식 문서**입니다. 일반적인 코드가 아니라, 에이전트가 특정 작업을 수행하는 방법을 기술한 마크다운 문서입니다.

## 스킬 파일 형식

```markdown
---
name: docker-deploy
description: Docker 컨테이너 배포 자동화
version: 1
tags: [docker, deploy, devops]
requires_tools: [terminal]
---

# Docker 배포

## 절차

1. Dockerfile 확인 및 빌드
2. 이미지 태깅
3. 레지스트리에 푸시
4. 원격 서버에서 pull 및 실행

## 참고 사항

- 항상 multi-stage 빌드 사용
- 보안 스캔 실행 필수
```

저장 위치: `~/.hermes/skills/`

## 점진적 공개

스킬은 3단계로 로드됩니다:

1. **목록 수준**: 이름과 설명만 표시 (가벼움)
2. **전체 내용**: 스킬의 마크다운 본문 로드
3. **참조 파일**: 관련 파일이 있으면 추가 로드

이렇게 하면 컨텍스트 윈도우를 효율적으로 사용할 수 있습니다.

## 조건부 활성화

스킬은 `requires_tools` 필드를 통해 특정 도구셋이 활성화되어 있을 때만 표시됩니다:

```yaml
requires_tools: [browser, terminal]
```

## 에이전트 자동 생성

복잡한 작업을 성공적으로 완료하면, Hermes가 자동으로 해당 과정을 스킬로 정리합니다:

```
사용자: 이 프로젝트의 CI/CD 파이프라인을 설정해줘
(... 작업 수행 ...)
Hermes: 완료했습니다. 이 과정을 "ci-cd-setup" 스킬로 저장했습니다.
```

## 스킬 허브

커뮤니티에서 공유하는 스킬을 설치할 수 있습니다:

```bash
# 스킬 검색
hermes skills search "docker"

# 스킬 설치
hermes skills install docker-deploy

# 설치된 스킬 목록
hermes skills list
```

### 스킬 출처

| 출처 | 설명 |
|------|------|
| 공식 스킬 | Nous Research에서 관리 |
| skills.sh | 커뮤니티 마켓플레이스 |
| GitHub 저장소 | 직접 URL로 설치 |
| agentskills.io | 스킬 허브 |

## 외부 스킬 디렉토리

프로젝트별 스킬 디렉토리를 설정할 수 있습니다:

```yaml
skills:
  directories:
    - ~/.hermes/skills
    - /path/to/project/skills
```

## 보안

허브에서 설치한 스킬은 자동으로 보안 스캔됩니다:
- 프롬프트 인젝션 탐지
- 악성 명령어 패턴 검사

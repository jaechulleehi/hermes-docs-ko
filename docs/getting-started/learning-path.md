# 학습 경로

## 경험 수준별 가이드

### 초보자 (~1시간)

AI 에이전트를 처음 접하는 분을 위한 경로:

1. [설치](/getting-started/installation) — 설치 및 기본 설정
2. [빠른 시작](/getting-started/quickstart) — 첫 대화 시작
3. [성격 및 SOUL.md](/user-guide/features/personality) — 에이전트 성격 설정
4. [영속 메모리](/user-guide/features/memory) — 메모리 시스템 이해

### 중급자 (~2-3시간)

기본 사용법을 알고 있는 분을 위한 경로:

1. [설정](/user-guide/configuration) — 상세 설정 옵션
2. [도구 및 도구셋](/user-guide/features/tools) — 도구 시스템 심화
3. [스킬 시스템](/user-guide/features/skills) — 스킬 생성 및 관리
4. [MCP 연동](/user-guide/features/mcp) — 외부 도구 서버 연결
5. [메시징 게이트웨이](/user-guide/messaging) — 메시징 플랫폼 설정

### 고급자 (~4-6시간)

Hermes를 깊이 활용하고 싶은 분을 위한 경로:

1. [아키텍처](/developer-guide/architecture) — 시스템 내부 구조 이해
2. [보안](/user-guide/security) — 보안 모델 심화
3. [컨텍스트 파일](/user-guide/features/context-files) — 프로젝트별 설정
4. [CLI 명령어](/reference/cli-commands) — 전체 CLI 레퍼런스

## 사용 사례별 가이드

### CLI 코딩 어시스턴트

터미널에서 Hermes를 코딩 도우미로 사용하고 싶다면:

1. [설치](/getting-started/installation) → [빠른 시작](/getting-started/quickstart)
2. [도구 및 도구셋](/user-guide/features/tools) — 터미널, 파일 도구
3. [컨텍스트 파일](/user-guide/features/context-files) — HERMES.md로 프로젝트 컨텍스트 설정

### Telegram/Discord 봇

메시징 봇으로 운영하고 싶다면:

1. [메시징 게이트웨이](/user-guide/messaging) — 플랫폼 설정
2. [보안](/user-guide/security) — 사용자 인증 및 허용 목록
3. [음성 모드](/user-guide/features/voice-mode) — Discord 음성 채널 지원

### 작업 자동화

예약 작업과 자동화를 원한다면:

1. [빠른 시작](/getting-started/quickstart) — 크론 기본 사용
2. [설정](/user-guide/configuration) — 크론 상세 설정
3. [도구 및 도구셋](/user-guide/features/tools) — 자동화 도구

### 커스텀 도구/스킬 개발

자체 도구나 스킬을 만들고 싶다면:

1. [도구 및 도구셋](/user-guide/features/tools)
2. [스킬 시스템](/user-guide/features/skills)
3. [MCP 연동](/user-guide/features/mcp)
4. [아키텍처](/developer-guide/architecture)

## 기능 일람표

| 기능 | 설명 | 관련 문서 |
|------|------|-----------|
| 도구 | 40+ 내장 도구 | [도구](/user-guide/features/tools) |
| 스킬 | 경험 기반 자동 생성 | [스킬](/user-guide/features/skills) |
| 메모리 | 세션 간 지식 유지 | [메모리](/user-guide/features/memory) |
| 컨텍스트 파일 | 프로젝트별 설정 | [컨텍스트 파일](/user-guide/features/context-files) |
| MCP | 외부 도구 서버 연결 | [MCP](/user-guide/features/mcp) |
| 크론 | 예약 작업 자동화 | [설정](/user-guide/configuration) |
| 위임 | 서브에이전트 작업 | [도구](/user-guide/features/tools) |
| 코드 실행 | 격리 환경 지원 | [도구](/user-guide/features/tools) |
| 브라우저 | 웹 브라우징 | [도구](/user-guide/features/tools) |
| 음성 | STT/TTS | [음성 모드](/user-guide/features/voice-mode) |
| 배치 처리 | 대량 작업 | [설정](/user-guide/configuration) |

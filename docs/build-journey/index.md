---
title: 구축 과정
description: Hermes를 실제로 굴리며 정리한 구축 과정과 운영 시행착오 기록
---

# 구축 과정

Hermes를 단순 챗봇이 아니라 **운영 가능한 시스템**으로 세우며 겪은 판단, 시행착오, 정리 과정을 모은 허브입니다.

## 시리즈: 에르메스 구축과 운영 시행착오

이 시리즈는 다음 흐름으로 이어집니다.

1. 전환 — 왜 우리는 OpenClaw에서 Hermes로 넘어왔나
2. 창구 — 왜 우리는 하비를 메인 창구로 두었나
3. 기억 경계 — 왜 같은 하비인데 기억이 다르게 느껴질까
4. 파일 접근 — 분명 파일은 있는데 왜 도구는 못 읽을까
5. 외부 연동 — Google Workspace 연동은 왜 늘 생각보다 오래 걸릴까
6. 자산화 — 삽질을 다음 사람의 체크리스트로 바꾸는 법
7. 콘텐츠 시스템 — 왜 우리는 위키를 먼저 쓰고 블로그와 강의를 나중에 뽑을까
8. 체크리스트 — 에르메스 운영 체크리스트는 어떻게 써야 실제로 도움이 될까
9. 메인 창구 심화 — 하비 메인 창구 구조는 왜 강력하고 어디서 병목이 생길까
10. 조사형 운영 — 방울이 조사형 에이전트는 어디서 강해지고 어디서 흔들릴까
11. 정리형 운영 — 뽀동이 정리형 에이전트는 어디서 강해지고 어디서 흔들릴까
12. 전환 체크리스트 — OpenClaw에서 Hermes로 넘어올 때 체크리스트는 왜 필요했을까
13. 컨텍스트 운영 — 긴 대화가 쌓일수록 에이전트는 왜 흐려지고 Hermes는 어떻게 버티나
14. 초도 도입 운영 — 처음 에이전트를 도입한 조직은 왜 운영에서 자주 무너질까

## 지금 읽을 수 있는 글
- [01. 왜 우리는 OpenClaw에서 Hermes로 넘어왔나](/build-journey/01-why-we-moved-from-openclaw-to-hermes)
- [02. 왜 우리는 하비를 메인 창구로 두었나](/build-journey/02-why-harvey-is-the-front-door)
- [03. 왜 같은 하비인데 기억이 다르게 느껴질까](/build-journey/03-why-same-harvey-feels-like-different-memory)
- [04. 분명 파일은 있는데 왜 도구는 못 읽을까](/build-journey/04-why-tools-cannot-read-files-that-exist)
- [05. Google Workspace 연동은 왜 늘 생각보다 오래 걸릴까](/build-journey/05-why-google-workspace-integration-takes-longer-than-expected)
- [06. 삽질을 다음 사람의 체크리스트로 바꾸는 법](/build-journey/06-how-to-turn-stumbles-into-checklists)
- [07. 왜 우리는 위키를 먼저 쓰고 블로그와 강의를 나중에 뽑을까](/build-journey/07-why-we-write-the-wiki-first)
- [08. 좋은 조사 결과가 자동으로 좋은 블로그가 되지 않는 이유](/build-journey/08-why-good-research-does-not-automatically-become-a-good-blog)
- [09. 에르메스는 단순 챗봇이 아니라 운영 시스템이다](/build-journey/09-hermes-is-an-operating-system-not-just-a-chatbot)
- [10. 에르메스에서 스킬은 언제 만들고 어떻게 관리해야 할까](/build-journey/10-when-and-how-to-manage-skills-in-hermes)
- [11. Obsidian LLM Wiki를 실제 운영에 어떻게 활용할 것인가](/build-journey/11-how-to-use-obsidian-llm-wiki-in-real-operations)
- [12. always-on gateway는 왜 생각보다 자주 헷갈릴까](/build-journey/12-always-on-gateway-is-more-confusing-than-it-looks)
- [13. 과거 유산은 지워야 할까 남겨야 할까](/build-journey/13-what-to-do-with-legacy-while-keeping-current-truth-clear)
- [14. 에르메스 운영에서 제일 자주 나오는 질문들](/build-journey/14-most-common-hermes-ops-questions-and-how-to-think)
- [15. 멀티봇 스레드는 왜 쉽게 시끄러워질까](/build-journey/15-why-multibot-threads-get-noisy)
- [16. 조사형 에이전트는 왜 자주 결론을 서두를까](/build-journey/16-why-research-agents-rush-to-conclusions)
- [17. 정리형 에이전트는 왜 그럴듯하지만 약한 글을 만들까](/build-journey/17-why-writing-agents-produce-polished-but-weak-drafts)
- [18. 하비가 언제 직접 처리하고 언제 위임해야 할까](/build-journey/18-when-harvey-should-handle-directly-vs-delegate)
- [19. 방울이와 뽀동이는 왜 각각 다른 실패를 반복할까](/build-journey/19-why-bangwooli-and-ppodongi-fail-differently)
- [20. 복구 플레이북은 왜 문서보다 순서가 중요할까](/build-journey/20-why-recovery-playbooks-are-about-order-not-just-docs)
- [21. 에르메스 운영 체크리스트는 어떻게 써야 실제로 도움이 될까](/build-journey/21-how-to-make-hermes-operation-checklists-actually-useful)
- [22. 하비 메인 창구 구조는 왜 강력하고 어디서 병목이 생길까](/build-journey/22-why-harvey-main-window-is-powerful-and-where-it-bottlenecks)
- [23. 방울이 조사형 에이전트는 어디서 강해지고 어디서 흔들릴까](/build-journey/23-where-bangwooli-research-agent-is-strong-and-where-it-wobbles)
- [24. 뽀동이 정리형 에이전트는 어디서 강해지고 어디서 흔들릴까](/build-journey/24-where-ppodongi-organization-agent-is-strong-and-where-it-wobbles)
- [25. OpenClaw에서 Hermes로 넘어올 때 체크리스트는 왜 필요했을까](/build-journey/25-why-openclaw-to-hermes-needed-a-migration-checklist)
- [26. 긴 대화가 쌓일수록 에이전트는 왜 흐려지고 Hermes는 어떻게 버티나](/build-journey/26-why-agents-get-fuzzy-in-long-conversations-and-how-hermes-holds-up)
- [27. 처음 에이전트를 도입한 조직은 왜 운영에서 자주 무너질까](/build-journey/27-why-agent-adoption-fails-in-operations)

## 이 섹션의 역할
- **공식 문서**가 기능과 사용법을 설명한다면
- **구축 과정**은 왜 이런 구조를 택했고 실제로 어디서 막혔는지를 설명합니다.

## 메모

현재 GitHub Pages 공개본은 1~27편 흐름 기준으로 계속 보강 중입니다. 실제 공개 범위는 GitHub Pages 최신 배포본을 기준으로 확인합니다.

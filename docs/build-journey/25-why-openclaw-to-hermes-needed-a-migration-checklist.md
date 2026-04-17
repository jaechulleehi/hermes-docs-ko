---
title: "OpenClaw에서 Hermes로 넘어올 때 체크리스트는 왜 필요했을까"
description: "OpenClaw에서 Hermes로의 전환은 새 시스템을 켜는 일이 아니라 런타임, 프로필, 문서 기준점, 자동 실행 흔적까지 함께 정리하는 운영 마이그레이션이다. 왜 체크리스트가 필요했는지 정리한다."
sidebar:
  label: "25. OpenClaw에서 Hermes로 넘어올 때 체크리스트는 왜 필요했을까"
---

# OpenClaw에서 Hermes로 넘어올 때 체크리스트는 왜 필요했을까

## TL;DR
OpenClaw에서 Hermes로의 전환은 이름만 바꾸는 작업이 아니었습니다. 새 시스템을 켜는 동시에, old runtime·profile 경계·문서 기준점·LaunchAgent 같은 자동 실행 흔적까지 함께 정리해야 하는 운영 마이그레이션이었습니다. 그래서 이 전환에는 막연한 감각이 아니라 체크리스트가 필요했습니다.

## 이 글의 답
답부터 말하면 이렇습니다.
OpenClaw에서 Hermes로 넘어올 때 체크리스트가 필요했던 이유는, 전환의 핵심이 새 시스템 켜기보다 옛 기준과 옛 흔적을 어디까지 정리할지 결정하는 일에 있었기 때문입니다.
핵심은 다섯 가지입니다.
- 전환은 문서만 바꾸는 작업이 아니다.
- 현재 실제로 무엇이 돌고 있는지부터 봐야 한다.
- profile과 state.db 경계를 함께 봐야 체감 차이를 설명할 수 있다.
- active source of truth와 legacy 보관층을 분리해야 한다.
- LaunchAgent 같은 자동 실행 흔적을 안 정리하면 old runtime이 다시 살아난다.

![OpenClaw에서 Hermes로 넘어올 때 체크리스트는 왜 필요했을까](/assets/build-journey/why-openclaw-to-hermes-needed-a-migration-checklist/og-card-final.png)

---

## 왜 시스템 전환은 자꾸 감으로 처리되나

시스템 전환은 겉으로 보면 새 걸 켜고 옛 걸 끄는 일처럼 보입니다.

하지만 실제 운영에서는 그렇게 단순하지 않습니다.

특히 OpenClaw에서 Hermes로 넘어갈 때는 문서, 프로필, 런타임, 자동 실행, memory/skill, shared-memory 기준점이 서로 얽혀 있었습니다.

이 상태에서 감으로 전환하면 active 문서는 Hermes인데 실제 runtime은 old system이 남아 있거나, profile 차이를 설명하지 못하거나, LaunchAgent가 old gateway를 다시 띄우는 식의 혼선이 생깁니다.

즉, 전환은 교체가 아니라 기준점 재정렬 작업에 가깝습니다.

![시스템 전환이 감으로 처리되면 생기는 문제](/assets/build-journey/why-openclaw-to-hermes-needed-a-migration-checklist/article-figure-01-why-openclaw-to-hermes-needed-a-migration-checklist.png)

---

## 체크리스트가 꼭 필요했던 이유

이 전환에서 체크리스트가 필요했던 이유는 확인해야 할 층이 많았기 때문입니다.

현재 상태 파악, 현재 운영 기준점 정하기, 프로필/저장소 경계 점검, identity 문서와 유산 정리, 런타임 흔적 정리까지 함께 봐야 했습니다.

특히 state.db, sessions, skills, AGENTS/SOUL 차이를 봐야 체감 차이를 설명할 수 있었고, old dashboard나 LaunchAgent까지 같이 봐야 했습니다.

즉, 체크리스트가 없으면 일부만 바꾸고 일부는 그대로 남는 반쪽 전환이 되기 쉬웠습니다.

![전환 체크리스트가 다루는 층](/assets/build-journey/why-openclaw-to-hermes-needed-a-migration-checklist/article-figure-02-why-openclaw-to-hermes-needed-a-migration-checklist.png)

---

## 가장 흔한 실패는 무엇이었나

가장 흔한 실패는 대체로 비슷했습니다.

문서만 Hermes로 바꾸고 프로세스를 안 정리하거나, LaunchAgent를 남겨 두어 OpenClaw가 다시 뜨거나, profile/state.db 차이를 설명하지 못해 하비가 달라졌다고 오해하거나, current source of truth를 하나로 못 박지 못하는 경우였습니다.

즉, 전환 실패의 본질은 기술 부족보다 층별 정리 순서 부족에 있었습니다.

새 시스템을 세우는 일만 보고 old runtime과 기준점을 같이 정리하지 않으면 같은 혼선이 반복됩니다.

![OpenClaw → Hermes 전환에서 자주 나온 실패](/assets/build-journey/why-openclaw-to-hermes-needed-a-migration-checklist/article-figure-03-why-openclaw-to-hermes-needed-a-migration-checklist.png)

---

## 그럼 좋은 전환은 어떻게 해야 하나

좋은 전환의 기준은 생각보다 선명합니다.

current active docs와 메인 창구를 Hermes 기준으로 고정하고, 유산은 archive/history/skill 층으로 적절히 밀어내고, 문서·프로세스·autostart를 같이 봐야 합니다.

그리고 실제 OpenClaw 프로세스가 사라졌는지, Hermes만 응답하는지, 기대 profile이 맞는지까지 검증해야 합니다.

좋은 전환은 새 이름을 붙이는 일이 아니라, 새 기준이 실제로 작동하는지 검증하는 일입니다.

그래서 이 전환에는 체크리스트가 필요했습니다.

---

## 우리가 실제로 세운 운영 원칙
### 원칙 1. 현재 운영 기준점은 하나로 세운다.
### 원칙 2. 유산은 지우기보다 적절한 층으로 옮긴다.
### 원칙 3. 문서와 프로세스와 autostart를 같이 본다.
### 원칙 4. profile과 state.db 차이를 반드시 설명 가능해야 한다.
### 원칙 5. 전환은 실행 후 검증까지 끝내야 한다.

---

## 결론
OpenClaw에서 Hermes로 넘어올 때 체크리스트가 필요했던 이유는, 전환의 핵심이 새 시스템 켜기보다 옛 기준과 옛 흔적을 어디까지 정리할지 결정하는 일에 있었기 때문입니다.

핵심은 이겁니다.
**현재 운영 기준점은 하나로 세운다.**

---

## FAQ
### 1. 왜 문서만 Hermes로 바꾸면 안 되나요?
실제 runtime이나 LaunchAgent가 OpenClaw 기준으로 남아 있으면 사용자가 보는 체감과 문서 기준이 어긋나기 때문입니다.
### 2. 유산은 다 지우는 게 맞나요?
반드시 그렇지는 않습니다. archive/history/skill 층으로 적절히 밀어내되, active 운영 문서에서는 current 기준이 먼저 보여야 합니다.
### 3. 체크리스트에서 가장 먼저 봐야 할 것은 무엇인가요?
지금 실제로 무엇이 돌고 있는지, 어느 profile이 응답 중인지부터 확인하는 것입니다.

---

## 시리즈 이동

- [← 이전 글](/build-journey/24-where-ppodongi-organization-agent-is-strong-and-where-it-wobbles)
- [구축 과정 허브로 돌아가기](/build-journey/)


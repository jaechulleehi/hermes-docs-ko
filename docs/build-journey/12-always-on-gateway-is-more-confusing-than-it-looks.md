---
title: "always-on gateway는 왜 생각보다 자주 헷갈릴까"
description: "always-on gateway는 켜두는 것 자체보다 무엇이 실제로 돌고 있는지 아는 것이 더 중요하다. heartbeat, status, process, profile, autostart 혼선을 실무 기준으로 정리한다."
sidebar:
  label: "always-on gateway는 왜 생각보다 자주 헷갈릴까"
---

# always-on gateway는 왜 생각보다 자주 헷갈릴까

## TL;DR
always-on gateway는 편해 보입니다. 켜두면 바로 응답하고, 메신저 환경과도 잘 맞기 때문입니다. 하지만 실제 운영에선 heartbeat, gateway status, 실제 프로세스, autostart, profile 경계가 쉽게 섞입니다. 그래서 핵심은 “켜져 있나?”가 아니라 **무엇이 실제로 돌고 있고, 어느 profile/런타임이 응답하고 있는가**를 먼저 확인하는 데 있습니다.

## 이 글의 답
답부터 말하면 이렇습니다.

always-on gateway가 자주 헷갈리는 이유는,
문제가 기능보다 **런타임 관측성과 기준점 구분**에서 더 자주 생기기 때문입니다.

핵심은 다섯 가지입니다.
- heartbeat가 보인다고 같은 시스템이 살아 있는 건 아니다.
- gateway status와 실제 프로세스는 어긋날 수 있다.
- 여러 profile이 동시에 돌면 체감은 더 복잡해진다.
- autostart와 LaunchAgent 같은 과거 흔적이 혼선을 키운다.
- always-on 운영은 “어느 런타임이 실제로 응답 중인가”를 먼저 봐야 한다.

즉,
편의성의 본질은 계속 켜두는 것이 아니라 **지금 무엇이 실제로 응답하는지 알 수 있는 운영 관측성**입니다.

![always-on gateway는 왜 생각보다 자주 헷갈릴까](/assets/build-journey/always-on-gateway-is-more-confusing-than-it-looks/og-card-final.png)

---

## 왜 always-on은 처음엔 좋아 보이는데 나중에 헷갈릴까
처음엔 장점이 분명합니다.
- 켜두면 바로 응답한다.
- 세션 단위로 다시 붙지 않아도 된다.
- 메신저/스레드형 대화와 잘 맞는다.

그런데 시간이 지나면 이런 질문이 생깁니다.
- heartbeat가 보이는데 왜 내가 생각한 시스템이 아니지?
- gateway status는 멈춤인데 왜 답하지?
- 지금 harvey가 받는 건가, 다른 profile이 받는 건가?
- 예전 시스템 흔적이 왜 아직 살아 있는 것처럼 느껴지지?

즉,
always-on 운영은 기능 자체보다
**무엇이 실제로 살아 있는가를 계속 구분해야 하는 운영 문제**를 만들기 쉽습니다.

---

## heartbeat와 status를 왜 그대로 믿으면 안 되나
여기서 첫 번째 오해가 나옵니다.
많은 사람이 heartbeat나 status를 곧 실행 주체라고 생각합니다.

하지만 실제론 이 둘이 같은 층이 아닐 수 있습니다.
- gateway heartbeat
- websocket heartbeat
- delegate/parent activity
- 과거 시스템의 keepalive 감각

또 상태 명령도 참고값일 뿐입니다.
수동 실행, 별도 프로세스 실행, 상태 파일 불일치 때문에
status 출력과 실제 프로세스가 어긋날 수 있습니다.

즉,
이름이 보인다고 그 시스템이라고 단정하지 말고
**출처와 실제 프로세스**를 먼저 봐야 합니다.

![status보다 실제 런타임이 먼저다](/assets/build-journey/always-on-gateway-is-more-confusing-than-it-looks/article-figure-01-runtime-vs-status.png)

---

## 왜 profile과 autostart가 혼선을 더 키우나
두 번째 핵심은 profile과 과거 흔적입니다.
한 시스템처럼 느껴져도 내부에선 여러 profile이 동시에 돌 수 있습니다.

예:
- harvey
- bangwooli
- ppodongi

여기에 autostart, LaunchAgent, old dashboard, background process가 남아 있으면
과거 시스템도 계속 체감상 살아 있는 것처럼 느껴집니다.

즉,
혼선의 상당수는 기술 에러라기보다
**현재 기준점과 실제 런타임이 분리돼 보이는 문제**입니다.

이때 중요한 건,
문서를 지우는 게 아니라 실제 실행 주체와 재기동 원인을 분리해서 보는 겁니다.

---

## 그럼 실무에선 무엇부터 봐야 하나
우리 기준에선 보통 이 순서가 가장 덜 헤맵니다.

### 1. 지금 무엇이 실제로 돌고 있는가
실제 PID, 명령, 실행 profile을 먼저 봅니다.

### 2. 어떤 profile이 응답 중인가
현재 응답 주체가 harvey인지, 다른 profile인지 확인합니다.

### 3. status 출력과 실제 프로세스가 일치하는가
state file, status, process list를 분리해 봅니다.

### 4. autostart/LaunchAgent가 남아 있는가
자동 재기동 원인이 있는지 확인합니다.

### 5. heartbeat의 출처가 어디인가
이름이 아니라 출처를 추적합니다.

핵심은,
always-on 운영을 막연한 “살아 있음” 감각이 아니라
**관측 가능한 운영 체계**로 바꾸는 겁니다.

![always-on 혼선을 줄이는 점검 순서](/assets/build-journey/always-on-gateway-is-more-confusing-than-it-looks/article-figure-02-check-order.png)

---

## 우리가 실제로 세운 운영 원칙
### 원칙 1. 상태 출력만 믿지 않는다
status는 참고값이고, 최종 확인은 실제 프로세스다.

### 원칙 2. profile과 runtime을 같이 본다
응답 주체는 체감이 아니라 구조로 확인한다.

### 원칙 3. heartbeat는 이름이 아니라 출처를 본다
용어 유사성과 실행 주체를 섞지 않는다.

### 원칙 4. 과거 흔적은 문서뿐 아니라 autostart까지 정리한다
active runtime에 남아 있으면 체감 혼선이 계속된다.

### 원칙 5. always-on의 핵심은 관측성이다
켜두는 것보다 지금 무엇이 실제로 응답 중인지 아는 게 중요하다.

---

## 결론
always-on gateway가 자주 헷갈리는 이유는,
우리가 자꾸 “켜져 있나?”만 보려고 하기 때문입니다.

핵심은 이겁니다.
**always-on 운영의 본질은 계속 켜두는 것이 아니라, 어느 프로필/어느 프로세스/어느 런타임이 실제로 응답하는지 아는 것이다.**

그래서 좋은 운영은 상태 감각이 아니라,
실행 주체를 분명하게 관측하고 구분하는 구조에서 나옵니다.

---

## FAQ
### 1. heartbeat가 보이면 그 시스템이 살아 있는 것 아닌가요?
아닙니다. heartbeat는 여러 계층에서 보일 수 있어 실행 주체를 바로 말해주지 않을 수 있습니다.

### 2. gateway status와 실제 프로세스가 다를 수 있나요?
그럴 수 있습니다. 수동 실행, 상태 파일 불일치, 별도 프로세스 실행이 원인이 될 수 있습니다.

### 3. 여러 profile이 동시에 돌면 왜 문제인가요?
사용자는 하나처럼 느끼지만 응답 주체는 복잡해져 기준점과 체감이 어긋나기 쉽습니다.

### 4. 과거 시스템 흔적은 왜 계속 체감되나요?
autostart, LaunchAgent, background process가 남아 있으면 문서와 별개로 실제 런타임이 살아날 수 있기 때문입니다.

### 5. 가장 먼저 바꿔야 할 습관은 무엇인가요?
상태 이름보다 실제 프로세스와 profile을 먼저 보는 습관입니다.

## 내부 링크 포인트
- 원천 기준은 Topic - always on gateway 운영에서 흔히 생기는 오해로 연결한다.
- 복구형 설명은 Session - 05. always-on gateway와 복구 운영으로 연결한다.
- profile 경계는 Topic - profile 경계와 state db를 실무에서 어떻게 봐야 하는가로 연결한다.

## CTA
always-on이 자꾸 불안하게 느껴진다면,
더 오래 켜두는 것보다 먼저 **무엇이 실제로 응답 중인지 보이는 운영 기준**을 다시 세우는 편이 좋습니다.

## 소셜 카피 초안
### 옵션 1
always-on 운영의 핵심은 켜두는 게 아니라, 무엇이 실제로 켜져 있는지 아는 것이다. heartbeat가 보인다고 같은 시스템이 살아 있는 건 아니고, status와 runtime도 항상 같지 않다.

### 옵션 2
always-on gateway는 기능보다 관측성 문제에서 더 자주 꼬인다. 어느 profile, 어느 프로세스, 어느 런타임이 실제로 응답 중인지 먼저 봐야 혼선이 줄어든다.

---

## 시리즈 이동

- [← 이전 글](/build-journey/11-how-to-use-obsidian-llm-wiki-in-real-operations)
- [구축 과정 허브로 돌아가기](/build-journey/)
- [다음 글 →](/build-journey/13-what-to-do-with-legacy-while-keeping-current-truth-clear)

---
title: "에르메스 기능이 잘 안 될 때 왜 로컬 검증이 먼저여야 할까"
description: "에르메스 기능이 잘 안 될 때 왜 바로 실전 채널에서 반복 테스트하면 더 꼬일까? 로컬 검증, 실제 tool call 확인, clean 판정이 왜 필요한지 실무 관점에서 정리한다."
sidebar:
  label: "29. 에르메스 기능이 잘 안 될 때 왜 로컬 검증이 먼저여야 할까"
---

# 에르메스 기능이 잘 안 될 때 왜 로컬 검증이 먼저여야 할까

## TL;DR
에르메스 기능이 잘 안 될 때 많은 팀이 바로 실전 채널에서 여러 번 다시 시도합니다. 하지만 그럴수록 원인은 더 흐려집니다. 실제로는 문서 문제, 권한 문제, 실행 경로 문제, tool exposure 문제, 출력 포맷 문제, gateway 상태 문제가 한 번에 섞이기 때문입니다. 그래서 먼저 **로컬에서 안전하게 같은 프롬프트를 돌리고, 실제 tool call을 확인하고, 마지막에 clean 판정까지 보는 절차**가 훨씬 빠르고 정확합니다.

![에르메스 기능이 잘 안 될 때 왜 로컬 검증이 먼저여야 할까](/assets/build-journey/why-local-validation-should-come-first-when-hermes-features-break/og-card-final.png)

---

## 답부터 말하면
에르메스 기능이 안 될 때 로컬 검증이 먼저여야 하는 이유는,
문제가 “답변 품질”이 아니라 **실행 경로**에 있는 경우가 생각보다 많기 때문입니다.

즉,
겉으로는 “왜 이 기능이 안 되지?”처럼 보이지만,
실제로는 아래 중 하나일 수 있습니다.

- 필요한 도구가 현재 실행 경로에 안 붙어 있다.
- 프롬프트는 맞는데 tool exposure가 잘못됐다.
- 도구는 붙었는데 실제 호출이 안 났다.
- 수집은 됐는데 출력 형식이 어긋난다.
- 기능은 됐는데 gateway/process 상태가 꼬여 있다.

이걸 실전 채널에서 바로 테스트하면,
문제가 한 덩어리처럼 보입니다.

## 왜 실전 채널에서 바로 테스트하면 더 헷갈릴까
실전 채널 테스트는 나쁘다는 뜻이 아닙니다.
문제는 **너무 이르다**는 데 있습니다.

실전 채널에 바로 쏘면 아래가 동시에 섞입니다.
- 실제 Slack 전달 성공 여부
- 채널/스레드 권한
- 사용자가 보는 출력 품질
- gateway 상태
- tool call 경로
- profile 설정

그래서 한 번 실패했을 때,
지금 틀린 게 프롬프트인지, 권한인지, 도구인지, 실행 경로인지 분리가 안 됩니다.

즉,
문제를 좁히기 전에 사용자-facing 결과부터 흔들리게 됩니다.

![핵심 구조](/assets/build-journey/why-local-validation-should-come-first-when-hermes-features-break/article-figure-01-why-local-validation-should-come-first-when-hermes-features-break.png)

---

## 로컬 검증이 주는 장점
로컬 검증은 이 복잡성을 줄여 줍니다.

### 1. 안전하다
실전 Slack 채널에 노이즈를 만들지 않습니다.
출력 실패를 반복해도 사용자가 덜 피곤합니다.

### 2. 실제 tool call을 볼 수 있다
이게 가장 중요합니다.
좋은 문장이 나왔는지보다,
**정말 필요한 도구를 호출했는지**를 먼저 볼 수 있습니다.

예를 들어 Slack 요약 기능이라면,
- `slack_get_workspace_activity`
- `slack_get_channel_history`
- `slack_get_thread_replies`
같은 호출이 실제로 났는지를 봐야 합니다.

### 3. 가짜 성공을 막는다
겉으로는 그럴듯한 요약이 나와도,
실제로는 파일 검색이나 세션 회수로 만든 가짜 브리핑일 수 있습니다.

로컬 검증은 이런 “그럴듯한 실패”를 빨리 잡아냅니다.

### 4. 원인을 더 빨리 좁힌다
도구가 없어서 실패했는지,
도구는 있는데 호출이 안 나는지,
호출은 했는데 결과 포맷이 이상한지,
한 단계씩 나눠 볼 수 있습니다.

## 우리가 이번에 실제로 본 것
이번 Slack 요약 기능 작업이 딱 그랬습니다.

처음엔 스킬과 프롬프트가 맞아 보여서,
겉으로는 “이제 되는 것 같다”고 느껴질 수 있었습니다.

하지만 로컬 검증을 돌려 보니,
처음에는 필요한 `slack_*` 도구가 실행 세션에 아예 안 붙어 있었습니다.

즉,
문제는 요약 스킬이 아니라 **toolset resolution**이었습니다.

이걸 실전 채널에서만 봤다면,
계속 프롬프트를 고치거나 출력 형식만 만졌을 가능성이 큽니다.

로컬 검증 덕분에,
“스킬이 틀린 게 아니라 실행 경로가 틀렸다”는 걸 바로 잡을 수 있었습니다.

![운영 구조](/assets/build-journey/why-local-validation-should-come-first-when-hermes-features-break/article-figure-02-why-local-validation-should-come-first-when-hermes-features-break.png)

---

## 좋은 순서는 무엇인가
이제 기준은 단순합니다.

### 첫 번째: local safe run
실전 전달 없이 같은 프롬프트를 로컬에서 먼저 돌립니다.

### 두 번째: saved session 확인
세션 JSON을 열어서
- callable tool 목록
- 실제 tool call 집계
를 봅니다.

### 세 번째: 결과 형식 QA
출력이 canonical 형식과 맞는지,
중복/누락/링크 문제 없는지 봅니다.

### 네 번째: 실전 delivery
그 다음에만 실제 Slack 채널이나 cron delivery를 확인합니다.

### 다섯 번째: clean 판정
마지막으로
- `ps`
- `launchctl`
- `lsof`
- profile gateway 일치 여부
를 같이 확인합니다.

이렇게 해야 “한 번 돌아갔다”와 “운영상 clean하다”를 구분할 수 있습니다.

## 왜 clean 판정까지 가야 하나
많은 사람이 여기서 멈춥니다.
“출력이 한 번 나왔으니 끝난 것 아닌가?”

하지만 운영은 다릅니다.

예를 들어,
- 기능은 됐지만 LaunchAgent 상태가 꼬여 있을 수 있습니다.
- profile별 gateway가 엇갈려 있을 수 있습니다.
- 의도하지 않은 프로세스가 포트를 잡고 있을 수 있습니다.

즉,
출력 성공은 기능 확인이고,
clean 판정은 운영 확인입니다.

둘은 다릅니다.

## 이번에 우리가 얻은 운영 기준
1. 새 기능/스킬/크론은 로컬 검증부터 한다.
2. 실제 tool call이 없으면 성공 판정하지 않는다.
3. plausible한 결과와 valid한 결과를 구분한다.
4. output QA와 process clean을 분리해서 본다.
5. 잘 통과한 절차는 skill과 문서로 남긴다.

![정리된 판단](/assets/build-journey/why-local-validation-should-come-first-when-hermes-features-break/article-figure-03-why-local-validation-should-come-first-when-hermes-features-break.png)

---

## 결론
에르메스 기능이 잘 안 될 때 필요한 건,
더 많은 추측이나 더 많은 반복 시도가 아닙니다.

필요한 건
**로컬 검증 → 결과 확인 → clean 판정**이라는 짧고 명확한 운영 절차입니다.

이 순서가 있으면,
에이전트가 말을 잘하는지보다 더 중요한 것,
즉 **정말 의도한 도구를 써서 의도한 결과를 냈는지**를 검증할 수 있습니다.

## FAQ
### 1. 로컬 검증은 왜 그렇게 중요한가요?
실전 채널 노이즈를 줄이고, 실제 tool call을 확인하며, 원인을 더 빨리 좁힐 수 있기 때문입니다.

### 2. 출력이 그럴듯하면 성공 아닌가요?
아닙니다. 실제로 필요한 도구를 호출하지 않았다면 가짜 성공일 수 있습니다.

### 3. clean 판정은 꼭 필요하나요?
네. 기능 성공과 운영 clean은 다르기 때문입니다.

---

## 시리즈 이동

- [← 이전 글](/build-journey/28-why-summarize-what-happened-today-in-slack-is-not-a-simple-feature)
- [구축 과정 허브로 돌아가기](/build-journey/)
- [구축 과정 허브로 돌아가기](/build-journey/)

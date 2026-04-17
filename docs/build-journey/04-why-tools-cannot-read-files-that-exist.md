---
title: "분명 파일은 있는데 왜 도구는 못 읽을까"
description: "분명 파일은 있는데 왜 도구는 못 읽을까? Obsidian과 iCloud 운영에서는 파일 부재와 열람 실패가 다른 문제다. 존재 확인, 등록 확인, direct read 순서로 보는 실무 기준을 설명한다."
sidebar:
  label: "분명 파일은 있는데 왜 도구는 못 읽을까"
---

# 분명 파일은 있는데 왜 도구는 못 읽을까

## TL;DR
Obsidian과 iCloud를 같이 쓰다 보면 누구나 한 번쯤 겪습니다. Finder에서는 분명 보이는데, 자동화 도구는 파일이 없다고 말하는 순간이 있습니다. 이때 가장 많이 하는 실수가 바로 **“없네”라고 단정하는 것**입니다. 하지만 실제로는 파일 부재와 열람 실패가 전혀 다른 문제일 수 있습니다. 특히 iCloud/File Provider 환경에서는 **존재 확인, 앱 등록 상태, exact path direct read, broad listing/search 실패**를 따로 봐야 합니다.

## 이 글의 답
답부터 말하면 이렇습니다.

분명 파일이 있는데 도구가 못 읽는 이유는,
파일이 진짜 없어서라기보다 **우리가 지금 보고 있는 레이어와 도구가 접근하는 레이어가 다를 수 있기 때문**입니다.

핵심은 네 가지입니다.
- Finder에서 보이는 것과 도구가 안정적으로 읽는 것은 다를 수 있다.
- iCloud 기반 볼트는 broad listing/search보다 exact path 확인과 known file direct read가 더 안정적일 수 있다.
- Obsidian 운영에서는 존재 확인, 등록 확인, 열람 확인을 따로 봐야 한다.
- 멀티볼트 운영은 저장 위치보다 역할 구조와 source of truth를 먼저 잡아야 한다.

즉,
이건 파일 찾기 문제가 아니라 **오판하지 않는 운영 문제**입니다.

![분명 파일은 있는데 왜 도구는 못 읽을까](/assets/build-journey/why-tools-cannot-read-files-that-exist/og-card-final.png)

---

## 이 문제를 자꾸 이상하게 느끼는 이유
파일은 보이는데 도구가 못 읽는 상황은 직관에 반합니다.
사람은 보통 이렇게 생각합니다.

- Finder에 보이니까 당연히 읽히겠지
- 검색이 안 잡히면 없다는 뜻이겠지
- 폴더가 안 뜨면 경로가 사라진 거겠지

그런데 iCloud와 자동화 도구가 같이 붙는 순간,
이 직관은 자주 깨집니다.

왜냐하면 실제로는 같은 파일을 서로 다른 층에서 보기 때문입니다.
- Finder/Obsidian 앱이 보는 층
- shell/search/listing이 보는 층
- 자동화 도구가 direct read를 시도하는 층

즉, 겉으로는 같은 파일 문제 같아도,
실제로는 **가시성 / 등록 / 열람 가능성 / provider 상태**가 서로 다른 문제일 수 있습니다.

---

## 파일이 없는 것과 파일을 못 읽는 것은 다르다
가장 먼저 분리해야 할 건 이것입니다.

![존재와 열람 실패는 같은 문제가 아니다](/assets/build-journey/why-tools-cannot-read-files-that-exist/article-figure-01-existence-vs-access.png)

### 1. 파일이 없는 경우
- exact path 자체가 없음
- 폴더/문서가 실제로 생성되지 않음
- 경로가 틀림

### 2. 파일은 있는데 도구가 못 읽는 경우
- broad listing/search가 불안정함
- File Provider/iCloud 계층 문제
- 특정 파일만 접근 실패
- 앱 등록과 자동화 접근 경로가 다름

이 둘을 섞어서 보면 계속 오판하게 됩니다.
예를 들어 listing 실패를 곧바로 부재로 해석하면,
있던 파일도 없다고 단정하게 됩니다.

---

## 왜 Obsidian과 iCloud에서 이 문제가 더 자주 생기나

![체감 문제는 레이어 문제로 분해해야 한다](/assets/build-journey/why-tools-cannot-read-files-that-exist/article-figure-02-layer-translation.png)

### 1. Obsidian은 노트 앱이면서 동시에 운영 저장소가 된다
처음에는 메모만 잘 남기면 될 것처럼 보입니다.
하지만 운영이 붙으면 아래가 같이 중요해집니다.
- 어디에 기록할 것인가
- 무엇이 source of truth인가
- 강의/블로그/위키 원천 문서를 어디에 둘 것인가
- 자동화 도구가 실제로 읽고 쓸 수 있는가

즉 Obsidian은 예쁜 노트 앱이면서 동시에 **운영 저장소**가 됩니다.
그래서 파일 접근 문제가 곧 운영 문제로 바뀝니다.

### 2. iCloud는 눈에 보이는 것과 자동화 접근이 다를 수 있다
iCloud/File Provider 환경에서는 디렉토리 전체 열람이 불안정할 수 있습니다.
실제로 이런 일이 생깁니다.
- 상위 경로 broad listing/search 실패
- 특정 파일 direct read는 성공
- 특정 순간 `Interrupted system call` 발생
- 일부 파일만 수정/열람 실패

즉,
같은 파일이라도 **어떻게 접근하느냐**에 따라 결과가 달라질 수 있습니다.

---

## 그럼 실제로는 어떤 순서로 봐야 하나
이상한 느낌이 들면 아래 순서가 제일 안전합니다.

![먼저 무엇을 확인해야 하는가](/assets/build-journey/why-tools-cannot-read-files-that-exist/article-figure-03-check-order.png)

### 1. exact path 존재 확인
known path가 실제로 있는가?
먼저 이걸 봅니다.
존재 자체를 가장 직접적으로 확인하는 단계입니다.

### 2. 앱 등록 확인
obsidian.json 같은 등록 정보를 확인합니다.
존재와 등록은 다른 문제입니다.
실제 폴더는 있어도, 앱 등록 목록에는 안 보일 수 있습니다.

### 3. known file direct read
Home, INDEX, WORKFLOW 같은 대표 파일을 직접 읽어봅니다.
이 단계가 중요합니다.
왜냐하면 broad search가 실패해도 direct read는 성공할 수 있기 때문입니다.

### 4. 새 파일 생성/수정 가능 여부 확인
특정 파일만 안 되는지, 전체 경로가 안 되는지 구분합니다.
이걸 나누지 않으면 파일 자체 문제인지, 경로 문제인지, provider 문제인지 계속 섞입니다.

### 5. listing 실패와 부재를 분리
broad listing/search 실패를 곧바로 부재로 해석하지 않습니다.
이건 iCloud 환경에서 특히 중요한 습관입니다.

---

## 멀티볼트 운영이 왜 더 중요해지나
이 문제는 단순 파일 접근 이슈 같지만,
사실은 볼트 운영 철학과도 연결됩니다.

### source of truth 볼트
- 가장 핵심 운영 지식
- 연결성과 기준점 중심

### Lecture / 자산 볼트
- 위키
- 블로그 원천 문서
- 강의 자료
- 배포 구조

### 공개 배포 경로
- GitHub
- 외부 공유용 문서

이걸 한 곳에 다 몰아넣으면,
운영과 배포가 서로 방해하기 쉽습니다.
즉 멀티볼트 운영의 핵심은 폴더 정리가 아니라 **역할 구조**입니다.

---

## 우리가 실제로 세운 운영 원칙
### 원칙 1. broad search 실패를 곧바로 부재로 해석하지 않는다
특히 iCloud에서는 더 그렇습니다.
search 실패와 폴더 부재는 같은 말이 아닙니다.

### 원칙 2. 존재 / 등록 / 열람 / 수정을 따로 본다
이 네 단계를 나눠 봐야 원인을 분해할 수 있습니다.

### 원칙 3. direct read를 우선 검토한다
iCloud 환경에서는 exact path + known file 방식이 더 믿을 만할 때가 많습니다.

### 원칙 4. 볼트는 역할별로 나눈다
source of truth 볼트와 자산/배포 볼트를 분리하면,
기록과 공개가 덜 충돌합니다.

---

## 결론
분명 파일은 있는데 도구가 못 읽는 상황에서,
우리가 가장 먼저 고쳐야 하는 건 도구보다 **해석 습관**일 때가 많습니다.

이 문제의 핵심은 이것입니다.
**파일 부재와 열람 실패는 전혀 다른 문제다.**

그리고 Obsidian과 iCloud를 운영 저장소로 쓰기 시작하면,
존재 확인, 등록 확인, direct read, broad listing 실패를 각각 따로 봐야 합니다.

즉,
이건 파일 찾기 수업이 아니라
**괜히 없다고 단정하지 않는 운영 수업**입니다.

---

## FAQ
### 1. Finder에 보이는데 왜 도구는 못 읽을 수 있나요?
앱 가시성과 자동화 도구의 접근 경로는 다를 수 있습니다. 특히 iCloud/File Provider 환경에서는 더 자주 그렇습니다.

### 2. broad search가 실패하면 파일이 없는 건가요?
아닙니다. broad listing/search 실패는 exact path read 실패와 다를 수 있습니다. 곧바로 부재로 단정하면 안 됩니다.

### 3. 왜 특정 파일만 수정 실패하나요?
파일 상태, provider 계층, 경로 특성, 동기화 상태 등 특정 파일 단위 이슈일 수 있습니다. 전체 경로 문제와 분리해서 봐야 합니다.

### 4. source of truth 볼트와 자산 볼트는 왜 나눠야 하나요?
운영 기준점과 배포/재가공 구조를 한 곳에 다 몰아넣으면 서로 방해하기 쉽습니다. 역할 분리가 더 중요합니다.

### 5. 실전에서 가장 먼저 해야 할 건 무엇인가요?
exact path 존재 확인 → 앱 등록 확인 → known file direct read 순서가 가장 안전합니다.
---

## 시리즈 이동

- [← 이전 글](/build-journey/03-why-same-harvey-feels-like-different-memory)
- [구축 과정 허브로 돌아가기](/build-journey/)
- [다음 글 →](/build-journey/05-why-google-workspace-integration-takes-longer-than-expected)


import { defineConfig } from 'vitepress'

const SITE_URL = 'https://jaechulleehi.github.io/hermes-docs-ko'

export default defineConfig({
  title: 'Hermes Agent 한국어 문서',
  description: 'Nous Research의 자기 개선 AI 에이전트, Hermes Agent 한국어 문서. 설치, 설정, MCP, 스킬, 메모리, 메시징 가이드.',
  lang: 'ko-KR',
  base: '/hermes-docs-ko/',

  // SEO: sitemap 자동 생성
  sitemap: {
    hostname: SITE_URL,
  },

  // SEO: lastUpdated로 검색엔진에 최신성 표시
  lastUpdated: true,

  head: [
    // 기본 메타
    ['meta', { name: 'theme-color', content: '#7c3aed' }],
    ['meta', { name: 'author', content: 'jaechulleehi' }],
    ['meta', { name: 'robots', content: 'index, follow' }],

    // Open Graph
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Hermes Agent 한국어 문서' }],
    ['meta', { property: 'og:title', content: 'Hermes Agent 한국어 문서' }],
    ['meta', { property: 'og:description', content: 'Nous Research의 자기 개선 AI 에이전트. 스킬 자동 생성, 멀티 플랫폼, MCP 지원.' }],
    ['meta', { property: 'og:url', content: SITE_URL }],
    ['meta', { property: 'og:locale', content: 'ko_KR' }],

    // Twitter Card
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'Hermes Agent 한국어 문서' }],
    ['meta', { name: 'twitter:description', content: 'Nous Research의 자기 개선 AI 에이전트' }],

    // 검색엔진 - 원본 문서와의 관계 명시 (canonical alternate)
    ['link', { rel: 'alternate', hreflang: 'en', href: 'https://hermes-agent.nousresearch.com/docs' }],
    ['link', { rel: 'alternate', hreflang: 'ko', href: SITE_URL }],

    // 한국 검색엔진
    ['meta', { name: 'naver-site-verification', content: '' }], // 네이버 웹마스터 인증 시 채우기
  ],

  // SEO: 페이지별 head 변환 (각 페이지에 고유 og:title 등)
  transformHead({ pageData }) {
    const head: any[] = []
    if (pageData.frontmatter.title) {
      head.push(['meta', { property: 'og:title', content: pageData.frontmatter.title }])
    }
    if (pageData.frontmatter.description) {
      head.push(['meta', { property: 'og:description', content: pageData.frontmatter.description }])
      head.push(['meta', { name: 'description', content: pageData.frontmatter.description }])
    }
    return head
  },

  themeConfig: {
    siteTitle: 'Hermes Agent 한국어',

    nav: [
      { text: '홈', link: '/' },
      { text: '공식 문서', link: '/official-docs/' },
      { text: '활용 사례', link: '/use-cases/' },
      { text: '구축 과정', link: '/build-journey/' },
      { text: '개발자 가이드', link: '/developer-guide/architecture' },
      { text: '레퍼런스', link: '/reference/cli-commands' },
    ],

    sidebar: [
      {
        text: '공식 문서',
        items: [
          { text: '공식 문서 허브', link: '/official-docs/' },
          { text: '설치', link: '/getting-started/installation' },
          { text: '빠른 시작', link: '/getting-started/quickstart' },
          { text: '학습 경로', link: '/getting-started/learning-path' },
          { text: '설정', link: '/user-guide/configuration' },
          { text: '메시징 게이트웨이', link: '/user-guide/messaging' },
          { text: '보안', link: '/user-guide/security' },
        ],
      },
      {
        text: '기능',
        items: [
          { text: '도구 및 도구셋', link: '/user-guide/features/tools' },
          { text: '영속 메모리', link: '/user-guide/features/memory' },
          { text: '스킬 시스템', link: '/user-guide/features/skills' },
          { text: 'MCP 연동', link: '/user-guide/features/mcp' },
          { text: '음성 모드', link: '/user-guide/features/voice-mode' },
          { text: '성격 및 SOUL.md', link: '/user-guide/features/personality' },
          { text: '컨텍스트 파일', link: '/user-guide/features/context-files' },
          { text: 'ACP (에디터 연동)', link: '/user-guide/features/acp' },
        ],
      },
      {
        text: '활용 사례',
        items: [
          { text: '활용 사례 허브', link: '/use-cases/' },
          { text: '팀 내 메인 창구 운영', link: '/use-cases/team-front-door-operations' },
          { text: '위키에서 블로그와 강의로 파생하는 콘텐츠 시스템', link: '/use-cases/wiki-to-blog-and-lecture-pipeline' },
        ],
      },
      {
        text: '구축 과정',
        items: [
          { text: '구축 과정 허브', link: '/build-journey/' },
          { text: '01. OpenClaw에서 Hermes로 넘어왔나', link: '/build-journey/01-why-we-moved-from-openclaw-to-hermes' },
          { text: '02. 하비를 메인 창구로 두었나', link: '/build-journey/02-why-harvey-is-the-front-door' },
          { text: '03. 같은 하비인데 기억이 다르게 느껴질까', link: '/build-journey/03-why-same-harvey-feels-like-different-memory' },
          { text: '04. 파일은 있는데 왜 도구는 못 읽을까', link: '/build-journey/04-why-tools-cannot-read-files-that-exist' },
          { text: '05. Google Workspace 연동은 왜 오래 걸릴까', link: '/build-journey/05-why-google-workspace-integration-takes-longer-than-expected' },
          { text: '06. 삽질을 체크리스트로 바꾸는 법', link: '/build-journey/06-how-to-turn-stumbles-into-checklists' },
          { text: '07. 왜 위키를 먼저 쓰고 나중에 뽑을까', link: '/build-journey/07-why-we-write-the-wiki-first' },
          { text: '21. 운영 체크리스트는 어떻게 써야 도움이 될까', link: '/build-journey/21-how-to-make-hermes-operation-checklists-actually-useful' },
          { text: '22. 하비 메인 창구 구조는 왜 강력하고 어디서 병목이 생길까', link: '/build-journey/22-why-harvey-main-window-is-powerful-and-where-it-bottlenecks' },
          { text: '23. 방울이 조사형 에이전트는 어디서 강해지고 어디서 흔들릴까', link: '/build-journey/23-where-bangwooli-research-agent-is-strong-and-where-it-wobbles' },
          { text: '24. 뽀동이 정리형 에이전트는 어디서 강해지고 어디서 흔들릴까', link: '/build-journey/24-where-ppodongi-organization-agent-is-strong-and-where-it-wobbles' },
          { text: '25. OpenClaw에서 Hermes로 넘어올 때 체크리스트는 왜 필요했을까', link: '/build-journey/25-why-openclaw-to-hermes-needed-a-migration-checklist' },
        ],
      },
      {
        text: '개발자 가이드',
        items: [
          { text: '아키텍처', link: '/developer-guide/architecture' },
        ],
      },
      {
        text: '레퍼런스',
        items: [
          { text: 'CLI 명령어', link: '/reference/cli-commands' },
          { text: 'FAQ 및 문제 해결', link: '/reference/faq' },
          { text: 'OpenClaw 마이그레이션', link: '/reference/migration-openclaw' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/jaechulleehi/hermes-docs-ko' },
    ],

    footer: {
      message: '이 문서는 커뮤니티 기여로 한국어 번역되었습니다. | <a href="https://hermes-agent.nousresearch.com/docs">원본 영문 문서</a>',
      copyright: '원본 © Nous Research | MIT 라이선스',
    },

    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '검색', buttonAriaLabel: '검색' },
          modal: {
            noResultsText: '검색 결과가 없습니다',
            resetButtonTitle: '초기화',
            footer: { selectText: '선택', navigateText: '이동', closeText: '닫기' },
          },
        },
      },
    },

    outline: {
      label: '목차',
    },

    docFooter: {
      prev: '이전',
      next: '다음',
    },

    lastUpdated: {
      text: '최종 수정일',
    },

    editLink: {
      pattern: 'https://github.com/jaechulleehi/hermes-docs-ko/edit/main/docs/:path',
      text: '이 페이지 수정하기',
    },

    darkModeSwitchLabel: '다크 모드',
    returnToTopLabel: '맨 위로',
    sidebarMenuLabel: '메뉴',
  },
})

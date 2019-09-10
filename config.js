'use strict';

module.exports = {
  url: 'https://blog.sayaka-ono.com',
  pathPrefix: '/',
  title: 'Blog by Sayaka Ono',
  titleJa: 'ブログ by 小野沙耶花',
  subtitle: 'Blogs about what I learned as a developer.',
  subtitleJa: 'ディベロッパーとして学んだことをアウトプットしています。',
  copyright: `© ${new Date().getFullYear()} Sayaka Ono`,
  disqusShortname: 'blog-by-sayakaono',
  postsPerPage: 10,
  googleAnalyticsId: 'UA-146464931-1',
  useKatex: false,
  menu: [
    {
      label: { en: 'Home', ja: 'ホーム' },
      path: '/'
    },
    {
      label: { en: 'Search', ja: '検索' },
      path: '/search'
    },
    {
      label: { en: 'Contact', ja: 'コンタクト' },
      path: '/pages/contacts'
    }
  ],
  author: {
    name: { en: 'Sayaka Ono', ja: '小野 沙耶花' },
    photo: '/favicon.ico',
    bio: {
      en: 'Developer based in Vancouver.',
      ja: '高知出身・バンクーバー在住ディベロッパー。'
    },
    contacts: {
      portfolio: {
        en: 'https://sayaka-ono.com',
        ja: 'https://sayaka-ono.com'
      },
      linkedin: {
        en: 'https://www.linkedin.com/in/sayakaono/',
        ja: 'https://www.linkedin.com/in/sayakaono/'
      },
      github: {
        en: 'SayakaOno',
        ja: 'SayakaOno'
      },
      twitter: {
        en: 'saya_3981',
        ja: '38_ca'
      },
      rss: { en: '/rss.xml', ja: '/rss.xml' }
    }
  }
};

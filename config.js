'use strict';

module.exports = {
  url: 'https://lumen.netlify.com',
  pathPrefix: '/',
  title: { en: 'Blog by Sayaka Ono', ja: 'ブログ by 小野沙耶花' },
  subtitle: {
    en:
      'Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu.',
    ja: '日本語のサブタイトル'
  },
  copyright: `© ${new Date().getFullYear()} Sayaka Ono`,
  disqusShortname: '',
  postsPerPage: 4,
  googleAnalyticsId: 'UA-73379983-2',
  useKatex: false,
  menu: [
    {
      label: { en: '🔎 Search', ja: '🔎 検索' },
      path: '/search'
    },
    {
      label: { en: '✉️ Contact', ja: '✉️ コンタクト' },
      path: '/pages/contacts'
    }
  ],
  author: {
    name: { en: 'Sayaka Ono', ja: '小野 沙耶花' },
    photo: '/favicon.ico',
    bio: {
      en: 'React developer based in Vancouver.',
      ja: '高知出身・バンクーバー在住デベロッパー。'
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
      rss: { en: '#', ja: '#' }
    }
  }
};

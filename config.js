'use strict';

module.exports = {
  url: 'https://lumen.netlify.com',
  pathPrefix: '/',
  title: 'Blog by Sayaka Ono',
  subtitle:
    'Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu.',
  copyright: `© ${new Date().getFullYear()} Sayaka Ono`,
  disqusShortname: '',
  postsPerPage: 4,
  googleAnalyticsId: 'UA-73379983-2',
  useKatex: false,
  menu: [
    {
      label: { en: 'Articles', ja: 'ブログ' },
      path: '/'
    },
    {
      label: { en: 'About', ja: '自己紹介' },
      path: '/pages/about'
    },
    {
      label: { en: 'Contact', ja: 'コンタクト' },
      path: '/pages/contacts'
    }
  ],
  author: {
    name: { en: 'Sayaka Ono', ja: '小野 沙耶花' },
    photo: '/favicon.ico',
    bio: 'React developer based in Vancouver.',
    contacts: {
      email: '#',
      twitter: '#',
      github: '#',
      rss: '#'
    }
  }
};

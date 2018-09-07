module.exports = {
  markdown: {
    lineNumbers: true
  },
  locales: {
    // The key is the path for the locale to be nested under.
    // As a special case, the default locale can use '/' as its path.
    '/': {
      lang: 'en-US', // this will be set as the lang attribute on <html>
      title: 'Hopcraft/IO',
      description: 'Hopcraft Official Site'
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'Hopcraft/IO',
      description: 'Hopcraft 官方网站'
    }
  },
  themeConfig: {
    locales: {
      '/': {
        // text for the language dropdown
        selectText: 'Languages',
        // label for this locale in the language dropdown
        label: 'English',
        // text for the edit-on-github link
        editLinkText: 'Edit this page on GitHub',
        // config for Service Worker
        serviceWorker: {
          updatePopup: {
            message: "New content is available.",
            buttonText: "Refresh"
          }
        },
        // algolia docsearch options for current locale
        algolia: {},
        nav: [
          { text: '项目说明', link: '/foo/index' }
        ],
        sidebar: {
          '/foo/': [
            '',     /* /foo/ */
            'one',  /* /foo/one.html */
            'two'   /* /foo/two.html */
          ],

          '/bar/': [
            '',      /* /bar/ */
            'three', /* /bar/three.html */
            'four'   /* /bar/four.html */
          ],

          // fallback
          // '/': [
          //   '',        /* / */
          //   'contact', /* /contact.html */
          //   'about'    /* /about.html */
          // ]
        }
      },
      '/zh/': {
        selectText: '选择语言',
        label: '简体中文',
        editLinkText: '在 GitHub 上编辑此页',
        serviceWorker: {
          updatePopup: {
            message: "发现新内容可用.",
            buttonText: "刷新"
          }
        },
        nav: [
          { text: '嵌套', link: '/zh/nested/' }
        ],
        algolia: {},
        sidebar: {
          '/zh/': [/* ... */],
          '/zh/nested/': [/* ... */]
        }
      }
    }
  }
}

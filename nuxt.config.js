module.exports = {
  env: {
    contentFile: process.env.CONTENT_FILE || 'itshertreat.md',
    facebookAppId: process.env.FACEBOOK_APP_ID || '104733703535495'
  },
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.TITLE || 'HunSpanderer | Filter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.DESCRIPTION },
      { property: 'og:title', content: process.env.OG_TITLE },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: process.env.OG_URL },
      { property: 'og:image', content: process.env.OG_IMAGE },
      { property: 'og:description', content: process.env.OG_DESCRIPTION },
      { property: 'fb:app_id', content: process.env.FACEBOOK_APP_ID }
    ],
    link: [
      { rel: 'apple-touch-icon-precomposed', sizes: '152x152', href: '/apple-icon-152x152.png' },
      { rel: 'icon', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', sizes: '16x16', href: '/favicon-16x16.png' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#00d1b2' },
  /*
  ** Include css not in components
  */
  css: [
    { src: 'croppie/croppie.css' },
    { src: 'assets/main.css' },
    // node.js module but we specify the pre-processor
    { src: 'bulma/bulma.sass', lang: 'sass' },
    { src: 'font-awesome/scss/font-awesome.scss', lang: 'sass' }
  ],
  plugins: [
    { src: '~plugins/modernizr.js', ssr: false },
    { src: '~plugins/facebook.js', ssr: false },
    { src: '~plugins/ga.js', ssr: false }
  ],
  generate: {
    routes: [
      '/about',
      '/privacy'
    ]
  },
  /*
  ** Build configuration
  */
  build: {
    vendor: [
      'marked',
      'croppie',
      'clipboard',
      'exif-js',
      'downloadjs',
      'axios'
    ],
    /*
    ** Run ESLINT on save
    */
    extend(config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }

      config.module.rules.push({
        test: /\.md$/,
        loaders: ['raw-loader', 'front-matter-loader']
      });
    }
  }
};

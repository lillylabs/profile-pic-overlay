module.exports = {
  env: {
    contentFile: process.env.CONTENT_FILE || 'hunspanderer.md'
  },
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.TITLE || '#HunSpanderer',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.DESCRIPTION || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      // { src: 'https://rawgit.com/jseidelin/exif-js/master/exif.js' }
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
    { src: 'font-awesome/scss/font-awesome.scss', lang: 'sass' },
  ],
  /*
  ** Build configuration
  */
  build: {
    vendor: [
      'marked',
      'croppie',
      'downloadjs'
    ],
    loaders: [
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader',
        query: {
          limit: 1000, // 1KO
          name: 'img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 1000, // 1 KO
          name: 'fonts/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.md$/,
        loader: 'raw-loader',
        query: {

        }
      },
      {
        test: /\.md$/,
        loader: 'front-matter-loader',
        query: {

        }
      }
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
        })
      }
    }
  }
}

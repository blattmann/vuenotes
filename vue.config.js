module.exports = {
  css: {
    sourceMap: true,
    loaderOptions: {
      sass: {
        data: `@import "@/sass/main.scss";`
      }
    }
  },

  pwa: {
    name: 'vuenotes'
  }
}

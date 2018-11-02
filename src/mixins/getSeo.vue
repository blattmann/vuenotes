<script>
import api from '@/api'

export default {
  methods: {
    getSeoData(page, curPage) {
      // console.log('getSeoData mixin')
      // console.log('page: ', page)
      // console.log('curPage: ', curPage)

      let seo = {}

      api
        .getSeo()
        .then(result => {
          const res = result.data.items

          // outsource
          let seoHome = res.find(item => item.fields.path === page)
          // console.log('seoHome: ', seoHome)

          let seoTitle = 'Carpe - Subscribe to unlimited driving' // needs to be hardcoded on home page, otherwise it is `seo.titleMain`
          let seoKeywords = ''
          let seoDescription = ''

          if (seoHome) {
            const seoContainer = seoHome.fields
            // console.log('seoContainer: ', seoContainer)

            if (seoContainer.title) {
              seoTitle = seoContainer.title
              // console.log('seoTitle: ', seoTitle)
            }

            if (seoContainer.description) {
              seoDescription = seoContainer.description
              // console.log('seoDescription: ', seoDescription)
            }

            if (seoContainer.keywords) {
              const seoKeywordsCount = seoContainer.keywords.length
              // console.log('seoKeywordsCount: ', seoKeywordsCount)

              let i = 0
              for (let value of seoContainer.keywords) {
                if (i < seoKeywordsCount - 1) {
                  seoKeywords += `${value}, `
                } else {
                  seoKeywords += `${value}`
                }
                i++
              }
              // console.log('seoKeywords:' , seoKeywords)
            }
          }

          const posterImage = `${curPage}static/images/seo/Carpe_Linkedin_CoverImage_Business.png`

          // standard meta
          seo.title = seoTitle
          seo.keywords = seoKeywords
          seo.description = seoDescription

          // Google Scheme
          seo.imagesrc = posterImage

          // Open Graph general (Facebook, LinkedIn, Pinterest & Google+)
          seo.sitename = seoTitle
          seo.type = 'website'
          seo.url = curPage
          seo.locale = 'en_GB'
          seo.admins = '1449596588500893'
          seo.image = posterImage
          seo.image_secure_url = posterImage
          seo.image_type = 'image/png'
          seo.image_width = '1536'
          seo.image_height = '768'
          seo.image_alt = seoTitle

          // Twitter
          seo.tcard = 'summary'
          seo.tcreator = '@carpedrive'

          // console.log('meta mixin: ', seo)

          return seo
        })
        .catch(error => {
          console.error(error)
          // api.errorHandling(error, `SEO @ ${window.location.href}`)
        })

      // console.log('seo mixin: ', seo)
      return seo
    }
  }
}
</script>

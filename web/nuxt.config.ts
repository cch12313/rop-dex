// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  css: [
    '~/assets/css/ro-animations.css'
  ],
  ssr: false,
  nitro: {
    preset: 'static'
  },
  app: {
    head: {
      title: 'Rop-dex - RO樂園攻略網站',
      meta: [
        { name: 'description', content: 'RO樂園攻略網站，提供技能模擬器等實用工具' },
        { name: 'keywords', content: 'RO樂園, 仙境傳說, 技能模擬器, 攻略' }
      ],
      link: [
        // Google Fonts for RO-style cute fonts
        { 
          rel: 'preconnect', 
          href: 'https://fonts.googleapis.com' 
        },
        { 
          rel: 'preconnect', 
          href: 'https://fonts.gstatic.com', 
          crossorigin: '' 
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400;500;600;700&family=Noto+Sans+TC:wght@300;400;500;600;700&family=Bubblegum+Sans&display=swap'
        }
      ]
    }
  }
})
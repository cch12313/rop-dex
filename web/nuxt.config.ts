// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  app: {
    head: {
      title: 'Rop-dex - RO樂園攻略網站',
      meta: [
        { name: 'description', content: 'RO樂園攻略網站，提供技能模擬器等實用工具' },
        { name: 'keywords', content: 'RO樂園, 仙境傳說, 技能模擬器, 攻略' }
      ]
    }
  }
})

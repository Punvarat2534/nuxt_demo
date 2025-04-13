export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/ui','@vesp/nuxt-fontawesome'],
  css: ['~/assets/css/main.css'], 
  ui: {
    theme: {
      colors: ['primary', 'error']
    }
  },fontawesome: {
    icons: {
      solid: ['search'],
    }
  }
})
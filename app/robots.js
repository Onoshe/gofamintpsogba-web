export default function robots() {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
        disallow: '/admin-login/',
      },
      sitemap: 'https://www.gofamintpsogba.org/sitemap.xml',
    }
  }
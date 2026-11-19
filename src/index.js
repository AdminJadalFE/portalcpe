import {createRoot} from 'react-dom/client' 
import {Chart, registerables} from 'chart.js'
import {QueryClient, QueryClientProvider} from 'react-query'  
import {MetronicI18nProvider} from './_metronic/i18n/Metronici18n'
 
import './_metronic/assets/sass/style.scss'
import './_metronic/assets/sass/plugins.scss'
import './_metronic/assets/sass/style.react.scss'
import './portalcpe-theme.css'
import {AppRoutes} from './apps/routing/AppRoutes'

import {AuthProvider} from './apps/modules/auth'

Chart.register(...registerables)

try {
  const savedTheme = localStorage.getItem('portalcpe-theme') === 'dark' ? 'dark' : 'light'
  document.documentElement.setAttribute('data-portal-theme', savedTheme)
  document.documentElement.setAttribute('data-theme', savedTheme)
} catch {
  document.documentElement.setAttribute('data-portal-theme', 'light')
  document.documentElement.setAttribute('data-theme', 'light')
}
 

const container = document.getElementById('root')
if (container) {
  createRoot(container).render(
    // <QueryClientProvider client={queryClient}>
      <MetronicI18nProvider>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
       </MetronicI18nProvider> 
    // </QueryClientProvider>
  )
}

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(`${process.env.PUBLIC_URL}/sw.js`).catch((error) => {
      console.error('No se pudo registrar el service worker de la PWA', error)
    })
  })
}

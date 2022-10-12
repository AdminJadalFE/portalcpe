import {createRoot} from 'react-dom/client' 
import {Chart, registerables} from 'chart.js'
import {QueryClient, QueryClientProvider} from 'react-query'  
import {MetronicI18nProvider} from './_metronic/i18n/Metronici18n'
 
import './_metronic/assets/sass/style.scss'
import './_metronic/assets/sass/plugins.scss'
import './_metronic/assets/sass/style.react.scss'
import {AppRoutes} from './apps/routing/AppRoutes'

import {AuthProvider} from './apps/modules/auth'

Chart.register(...registerables)
 

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

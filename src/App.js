import {Suspense} from 'react'
import {Outlet} from 'react-router-dom'
import {I18nProvider} from './_metronic/i18n/i18nProvider'
import {LayoutProvider} from './_metronic/layout/core'
import {MasterInit} from './_metronic/layout/MasterInit'
// import {AuthInit} from './apps/modules/auth'

import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.min.js`;

const App = () => {
  return (
    <Suspense>
      <I18nProvider>
        <LayoutProvider>
          {/* <AuthInit> */}
            <Outlet />
            <MasterInit />
          {/* </AuthInit> */}
        </LayoutProvider>
      </I18nProvider>
    </Suspense>
  )
}

export {App}

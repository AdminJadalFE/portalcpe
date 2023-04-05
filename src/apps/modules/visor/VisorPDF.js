import React, {useEffect, useState} from 'react' 

import { pdfjs } from 'react-pdf';


import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
 

const VisorPDF = () => { 

    const pdfFile = localStorage.getItem('urlpdfjadal'); 

    const defaultLayoutPluginInstance = defaultLayoutPlugin();
      
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

     
  return ( 
 
    <div style={{ height: '750px' }} >
    <Viewer
        fileUrl={pdfFile}
        plugins={[defaultLayoutPluginInstance]}
        defaultScale={1}
        defaultScaleDelta={1.1}
        defaultScaleValue="page-width"
    />
</div>

  )
}

export {VisorPDF}

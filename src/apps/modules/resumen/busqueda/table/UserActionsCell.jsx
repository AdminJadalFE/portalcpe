/* eslint-disable jsx-a11y/anchor-is-valid */
const UserActionsCell = ({cpe}) => {
  return (
    <span className='portal-summary-actions' aria-label='Descargas del comprobante'>
        <a
            href={cpe.urlCpe}
            className='btn portal-summary-action'
            title='Descargar XML'
            aria-label='Descargar XML'
            target='_blank'
            rel='noreferrer'
        >
            <i className='bi bi-filetype-xml' aria-hidden='true' />
        </a>
        <a
            href={cpe.urlPdf}
            className='btn portal-summary-action'
            title='Descargar PDF'
            aria-label='Descargar PDF'
            target='_blank'
            rel='noreferrer'
        >
            <i className='bi bi-file-earmark-pdf' aria-hidden='true' />
        </a>
        <a 
            href={cpe.urlCdr} 
            className='btn portal-summary-action'
            title='Descargar CDR'
            aria-label='Descargar CDR'
            target='_blank'
            rel='noreferrer'
         >
            <i className='bi bi-file-earmark-check' aria-hidden='true' />
        </a> 
    </span>
  )
}

export {UserActionsCell}

// @ts-nocheck
import clsx from 'clsx' 
import {TypeCell} from './TypeCell'
import {formatPortalResponsiveTableValue} from '../../../../components/PortalResponsiveTableValue'

const responsiveLabels = {
  comprobante: 'Comprobante',
  nombreReceptor: 'Receptor',
  fechaCpe: 'Emisión',
  fechaPublicacion: 'Publicación',
  monedaCpe: 'Moneda',
  totalCpe: 'Total',
  estadoCpe: 'Estado',
  opciones: 'Opciones',
}

const CustomRow = ({row}) => (
  <tr {...row.getRowProps()}>
    {row.cells.map((cell) => {
      const isComprobante = cell.column.id === 'comprobante'
      const hasMobileFallback = !isComprobante && cell.column.id !== 'opciones'
      const mobileValue = hasMobileFallback
        ? formatPortalResponsiveTableValue(
            row.original?.[cell.column.id],
            cell.column.id
          )
        : undefined

      return (
        <td
          {...cell.getCellProps()}
          data-label={responsiveLabels[cell.column.id] || cell.column.id}
          data-mobile-value={hasMobileFallback ? mobileValue : undefined}
          className={clsx({'text-end min-w-80px': cell.column.id === 'actions'})}
        >
          <span className='portal-table-cell-label'>
            {responsiveLabels[cell.column.id] || cell.column.id}
          </span>
          <span className={clsx('portal-table-cell-value', {'portal-table-cell-value--desktop': hasMobileFallback})}>
            {isComprobante ? (
              <span className='portal-cpe-comprobante-summary'>
                <strong>{cell.render('Cell')}</strong>
                <small><TypeCell tipoCpe={row.original?.tipoCpe} /></small>
              </span>
            ) : cell.render('Cell')}
          </span>
          {hasMobileFallback && (
            <span className='portal-table-cell-mobile-value'>{mobileValue}</span>
          )}
        </td>
      )
    })}
  </tr>
)

export {CustomRow}

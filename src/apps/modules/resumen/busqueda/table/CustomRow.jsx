// @ts-nocheck
import clsx from 'clsx' 
import {formatPortalResponsiveTableValue} from '../../../../components/PortalResponsiveTableValue'

const responsiveLabels = {
  tipoCpe: 'Tipo de comprobante',
  serieCpe: 'Serie',
  numeroCpe: 'Número',
  fechaResumen: 'Emisión',
  fechaPublicacion: 'Publicación',
  estadoResumen: 'Estado',
  opciones: 'Opciones',
}

const CustomRow = ({row}) => (
  <tr {...row.getRowProps()}>
    {row.cells.map((cell) => {
      const hasMobileFallback = cell.column.id !== 'opciones'
      const mobileValue = formatPortalResponsiveTableValue(
        row.original?.[cell.column.id],
        cell.column.id
      )

      return (
        <td
          {...cell.getCellProps()}
          data-label={responsiveLabels[cell.column.id] || cell.column.id}
          data-mobile-value={hasMobileFallback ? mobileValue : undefined}
          className={clsx({'text-end min-w-100px': cell.column.id === 'actions'})}
        >
          <span className='portal-table-cell-label'>
            {responsiveLabels[cell.column.id] || cell.column.id}
          </span>
          <span className={clsx('portal-table-cell-value', {'portal-table-cell-value--desktop': hasMobileFallback})}>
            {cell.render('Cell')}
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

// @ts-nocheck
import clsx from 'clsx' 
import {formatPortalResponsiveTableValue} from '../../../../components/PortalResponsiveTableValue'
import {getReportFilterText} from './FilterCell'

const responsiveLabels = {
  tipoReporte: 'Tipo de reporte',
  fechaSolicitud: 'Fecha de reporte',
  estadoReporte: 'Estado del reporte',
  filtroReporte: 'Filtro del reporte',
  opciones: 'Opciones',
}

const CustomRow = ({row}) => (
  <tr {...row.getRowProps()}>
    {row.cells.map((cell) => {
      const hasMobileFallback = cell.column.id !== 'opciones'
      const isFilterColumn = cell.column.id === 'filtroReporte'
      const mobileValue = isFilterColumn
        ? getReportFilterText(row.original)
        : formatPortalResponsiveTableValue(row.original?.[cell.column.id], cell.column.id)

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
            {cell.render('Cell')}
          </span>
          {hasMobileFallback && (
            <span className={clsx('portal-table-cell-mobile-value', {'portal-report-filter-mobile-value': isFilterColumn})}>
              {isFilterColumn ? mobileValue : cell.render('Cell')}
            </span>
          )}
        </td>
      )
    })}
  </tr>
)

export {CustomRow}

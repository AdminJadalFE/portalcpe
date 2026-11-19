const DashboardEmptyState = ({message = 'No hay datos para este periodo'}) => (
  <div className='dashboard-empty-state' role='status'>
    <span className='dashboard-empty-state-icon' aria-hidden='true'>
      <i className='bi bi-bar-chart-line' />
    </span>
    <span className='dashboard-empty-state-title'>Sin datos disponibles</span>
    <span className='dashboard-empty-state-message'>{message}</span>
  </div>
)

export {DashboardEmptyState}

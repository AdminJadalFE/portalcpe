 
const StateCell = ({estadoCpe}) => {

    let estadoColor = '';

    switch (estadoCpe) {
      case "PENDIENTE":
        estadoColor = 'badge badge-light-warning fw-bolder'
        break;

      case "EN_PROCESO":
      case "PROCESANDO":
        estadoColor = 'badge badge-light-info fw-bolder'
        break;

      case "GENERADO":
      case "COMPLETADO":
        estadoColor = 'badge badge-light-success fw-bolder'
        break; 

      case "ERROR":
      case "FALLIDO":
        estadoColor = 'badge badge-light-danger fw-bolder'
        break;
    
      default:
        estadoColor = 'badge badge-light-secondary fw-bolder'
        break;
    }

    return (
      <> {estadoCpe && <div className={`portal-report-status ${estadoColor}`}>{estadoCpe}</div>}</>
    )
}

export {StateCell}

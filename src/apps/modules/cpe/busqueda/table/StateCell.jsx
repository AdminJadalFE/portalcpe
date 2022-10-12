 
const StateCell = ({estadoCpe}) => {

    let estadoColor = '';

    switch (estadoCpe) {
      case "ACEPTADO":
        estadoColor = 'badge badge-light-success fw-bolder'
        break;

      case "RECHAZADO":
        estadoColor = 'badge badge-light-danger fw-bolder'
        break;

      case "ANULADO":
        estadoColor = 'badge badge-light-danger fw-bolder'
        break;
          
      case "BAJA":
        estadoColor = 'badge badge-light-danger fw-bolder'
        break;
    
      default:
        estadoColor = 'badge badge-light-secondary fw-bolder'
        break;
    }

    return (
      <> {estadoCpe && <div className={estadoColor}>{estadoCpe}</div>}</>
    )
}

export {StateCell}

 
const StateCell = ({estadoCpe}) => {

    let estadoColor = '';

    switch (estadoCpe) {
      case "PENDIENTE":
        estadoColor = 'badge badge-light-warning fw-bolder'
        break;

      case "COMPLETADO":
        estadoColor = 'badge badge-light-success fw-bolder'
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

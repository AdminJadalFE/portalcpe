 
const TypeCell = ({tipoCpe}) => {

    let nombreTipoCpe = '';

    switch (tipoCpe) {
      case "RC":
        nombreTipoCpe = 'RESUMEN'
        break; 
      case "RA":
        nombreTipoCpe = 'BAJA'
        break; 
    }

    return (
      <> {tipoCpe && <div>{nombreTipoCpe}</div>}</>
    )
}

export {TypeCell}

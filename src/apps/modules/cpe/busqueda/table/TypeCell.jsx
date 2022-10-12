 
const TypeCell = ({tipoCpe}) => {

    let nombreTipoCpe = '';

    switch (tipoCpe) {
      case "01":
        nombreTipoCpe = 'FACTURA'
        break; 
      case "03":
        nombreTipoCpe = 'BOLETA'
        break;
      case "07":
        nombreTipoCpe = 'N. CRÉDITO'
        break;
      case "08":
        nombreTipoCpe = 'N. DÉBITO'
        break;
      case "09":
        nombreTipoCpe = 'GUÍA'
        break;
      case "20":
        nombreTipoCpe = 'RETENCIÓN'
        break;
      case "40":
        nombreTipoCpe = 'PERCEPCIÓN'
        break; 
    }

    return (
      <> {tipoCpe && <div>{nombreTipoCpe}</div>}</>
    )
}

export {TypeCell}

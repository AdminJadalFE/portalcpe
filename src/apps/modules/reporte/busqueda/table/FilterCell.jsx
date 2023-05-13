 
const FilterCell = ({cpe}) => {

    let strFiltro = '';

    strFiltro = `Fecha desde: ${cpe.fechaDesde}`;
    strFiltro += ` | Fecha hasta: ${cpe.fechaHasta}`;
    strFiltro += cpe.Sucursal != '-' ? ` | Sucursal: ${cpe.Sucursal}` : '';  
    strFiltro += cpe.estadoCpe != '-' ? ` | Estado CPE: ${cpe.estadoCpe}` : '';
    strFiltro += cpe.rucReceptor != '-' ? ` | Receptor: ${cpe.rucReceptor}` : '';
    strFiltro += cpe.tipoCpe != '-' ? ` | Tipo CPE: ${cpe.tipoCpe}` : '';
    strFiltro += cpe.serieCpe != '-' ? ` | Serie: ${cpe.serieCpe}` : '';
    strFiltro += cpe.numeroDesde != '-' ? ` | Nuúmero Desde: ${cpe.numeroDesde}` : '';
    strFiltro += cpe.numeroHasta != '-' ? ` | Número Hasta: ${cpe.numeroHasta}` : '';
 
    return (
      <> {<div>{strFiltro}</div>}</>
    )
}

export {FilterCell}

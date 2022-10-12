import moment from 'moment'; 

const NumericCell = ({totalCpe}) => (
  <> {totalCpe && <div>{dosDecimales(totalCpe)}</div>}</>
)
 
const dosDecimales = (totalCpe) => {
  
  return totalCpe.toFixed(2); 

}

export {NumericCell}

import moment from 'moment'; 

const DateCell = ({fechaCpe, option, indicador}) => (
  <> {fechaCpe && <div>{getDateFormat(fechaCpe, option, indicador)}</div>}</>
)

const getDateFormat = (date, option, indicador) => { 
  if (indicador == '1') {
    date = moment(date).add(5, 'h').format();   
  } 
  return moment(date).format(option); 
}

export {DateCell}

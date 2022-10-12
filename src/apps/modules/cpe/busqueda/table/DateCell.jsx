import moment from 'moment'; 

const DateCell = ({fechaCpe, option}) => (
  <> {fechaCpe && <div>{getDateFormat(fechaCpe, option)}</div>}</>
)

const getDateFormat = (date, option) => { 
  return moment(date).format(option); 
}

export {DateCell}

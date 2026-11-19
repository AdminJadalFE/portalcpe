import moment from 'moment'

const DateCell = ({fechaCpe, option}) => (
  <> {fechaCpe && <div>{moment(fechaCpe).format(option)}</div>}</>
)

export {DateCell}

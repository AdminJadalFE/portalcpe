import {useEffect, useState} from 'react'

const formatQueryDateTime = (value) => {
  if (!value) {
    return 'Sin consulta'
  }

  const date = new Date(value)
  const hours = date.getHours()
  const hour12 = hours % 12 || 12
  const meridiem = hours >= 12 ? 'PM' : 'AM'
  const pad = (number) => String(number).padStart(2, '0')

  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} · ${pad(hour12)}:${pad(date.getMinutes())} ${meridiem}`
}

const LastQuery = ({queryData}) => {
  const [queriedAt, setQueriedAt] = useState(null)

  useEffect(() => {
    if (queryData !== undefined && queryData !== null) {
      setQueriedAt(new Date())
    }
  }, [queryData])

  return (
    <div className='last-query portal-last-query' aria-label='Última vez de consulta'>
      <span>Última vez de consulta</span>
      <strong>{formatQueryDateTime(queriedAt)}</strong>
    </div>
  )
}

export {LastQuery}

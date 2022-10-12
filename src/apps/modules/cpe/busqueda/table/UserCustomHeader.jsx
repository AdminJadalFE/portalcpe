import clsx from 'clsx' 

 
const UserCustomHeader = ({className, title, tableProps}) => {
 
  return (
    <th
      {...tableProps.column.getHeaderProps()}
      className={clsx(
        className)}
      style={{cursor: 'pointer'}}
    >
      {title}
    </th>
  )
}

export {UserCustomHeader}

// @ts-nocheck 
import {UserCustomHeader} from './UserCustomHeader' 
import {UserActionsCell} from './UserActionsCell'
import {StateCell} from './StateCell'
import {DateCell} from './DateCell'
import {NumericCell} from './NumericCell'
import {FilterCell} from './FilterCell'
import {CurrencyCell} from './CurrencyCell'


var formatDate = "YYYY-MM-DD"; 
var formatDateTime = "YYYY-MM-DD hh:mm:ss"; 
 

const usersColumns = [   
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Tipo Reporte' className='min-w-100px' />,
    accessor: 'tipoReporte',
  },  
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Fecha Reporte' className='min-w-100px' />
    ),
    id: 'fechaSolicitud',
    Cell: ({...props}) => <DateCell fechaCpe={props.data[props.row.index].fechaSolicitud} option={formatDateTime} indicador={1}/>,
  },     
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Estado Reporte' className='min-w-100px' />
    ),
    id: 'estadoReporte',
    Cell: ({...props}) => <StateCell estadoCpe={props.data[props.row.index].estadoReporte} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Filtro Reporte' className='min-w-400px' />
    ),
    id: 'filtroReporte',
    Cell: ({...props}) => <FilterCell cpe={props.data[props.row.index]}/>,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Opciones' className='min-w-150px' />
    ),
    id: 'opciones',
    Cell: ({...props}) => <UserActionsCell cpe={props.data[props.row.index]} />,
  },
]

export {usersColumns}

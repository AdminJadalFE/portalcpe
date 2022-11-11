// @ts-nocheck 
import {UserCustomHeader} from './UserCustomHeader' 
import {UserActionsCell} from './UserActionsCell'
import {StateCell} from './StateCell'
import {DateCell} from './DateCell'
import {NumericCell} from './NumericCell'
import {TypeCell} from './TypeCell'
import {CurrencyCell} from './CurrencyCell'


var formatDate = "YYYY-MM-DD"; 
var formatDateTime = "YYYY-MM-DD hh:mm:ss"; 
 

const usersColumns = [  
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Tipo' className='min-w-100px' />
    ),
    id: 'tipoCpe',
    Cell: ({...props}) => <TypeCell tipoCpe={props.data[props.row.index].tipoCpe}/>,
  }, 
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Serie' className='min-w-80px' />,
    accessor: 'serieCpe',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Número' className='min-w-100px' />,
    accessor: 'numeroCpe',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Receptor' className='min-w-180px' />,
    accessor: 'nombreReceptor',
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Emisión' className='min-w-100px' />
    ),
    id: 'fechaCpe',
    Cell: ({...props}) => <DateCell fechaCpe={props.data[props.row.index].fechaCpe} option={formatDate} indicador={1}/>,
  }, 
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Publicación' className='min-w-100px' />
    ),
    id: 'fechaPublicacion',
    Cell: ({...props}) => <DateCell fechaCpe={props.data[props.row.index].fechaPublicacion} option={formatDateTime} indicador={0}/>,
  },    
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Moneda' className='min-w-100px' />
    ),
    id: 'monedaCpe',
    Cell: ({...props}) => <CurrencyCell currency={props.data[props.row.index].monedaCpe}/>,
  },  

  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Total' className='min-w-100px' />
    ),
    id: 'totalCpe',
    Cell: ({...props}) => <NumericCell totalCpe={props.data[props.row.index].totalCpe}/>,
  },  
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Estado' className='min-w-100px' />
    ),
    id: 'estadoCpe',
    Cell: ({...props}) => <StateCell estadoCpe={props.data[props.row.index].estadoCpe} />,
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

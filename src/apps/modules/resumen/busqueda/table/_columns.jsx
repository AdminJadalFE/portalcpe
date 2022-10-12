// @ts-nocheck 
import {UserCustomHeader} from './UserCustomHeader' 
import {UserActionsCell} from './UserActionsCell'
import {StateCell} from './StateCell'
import {DateCell} from './DateCell' 
import {TypeCell} from './TypeCell'

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
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Emisión' className='min-w-100px' />
    ),
    id: 'fechaResumen',
    Cell: ({...props}) => <DateCell fechaCpe={props.data[props.row.index].fechaResumen} option={formatDate}/>,
  }, 
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Publicación' className='min-w-100px' />
    ),
    id: 'fechaPublicacion',
    Cell: ({...props}) => <DateCell fechaCpe={props.data[props.row.index].fechaPublicacion} option={formatDateTime}/>,
  },  
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Estado' className='min-w-100px align-center' />
    ),
    id: 'estadoResumen',
    Cell: ({...props}) => <StateCell estadoCpe={props.data[props.row.index].estadoResumen} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Opciones' className='min-w-180px' />
    ),
    id: 'opciones',
    Cell: ({...props}) => <UserActionsCell cpe={props.data[props.row.index]} />,
  },
]

export {usersColumns}

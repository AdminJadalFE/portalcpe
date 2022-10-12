import {useAuth} from '../../../../../apps/modules/auth'

export function MenuInner() { 

  const {currentEmisor} = useAuth(); 

  return (
    <>
         
      <h1 className="page-heading d-flex text-dark fw-bold fs-3 my-0 flex-column justify-content-center">{currentEmisor.razonSocial}</h1>
 
    </>
  )
}

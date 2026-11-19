import {useAuth} from '../../../../../apps/modules/auth'

export function MenuInner() { 

  const {currentEmisor} = useAuth(); 
  const companyDescription = currentEmisor?.razonSocial
    || currentEmisor?.razonSocialEmisor
    || currentEmisor?.nombreEmisor
    || currentEmisor?.rucEmisor
    || 'Portal CPE';

  return (
    <>
         
      <h1 className="page-heading portal-navbar-company d-flex text-dark fw-bold fs-3 my-0 flex-column justify-content-center">
        {companyDescription}
      </h1>
 
    </>
  )
}

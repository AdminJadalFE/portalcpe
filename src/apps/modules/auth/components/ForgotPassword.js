import {useContext} from 'react'
import {useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx' 
import {useFormik} from 'formik'  
import {updatepassword} from '../services/AuthService';   
import {Link} from 'react-router-dom'
import './Login.css';

const initialValues = {
    email: '',
}
  
const forgotPasswordSchema = Yup.object().shape({
email: Yup.string()
.email('Formato de Correo Incorrecto')
.min(3, 'Debe ingresar mínimo 2 dígitos')
.max(50, 'Debe ingresar máximo 50 dígitos')
    .required('Email es obligatorio'),
}) 

export function ForgotPassword() {

    const [loading, setLoading] = useState(false)
    const [hasErrors, setHasErrors] = useState(undefined)

    const formik = useFormik({
      initialValues,
      validationSchema: forgotPasswordSchema,
      onSubmit: (values, {setStatus, setSubmitting}) => {
        setLoading(true)
        setHasErrors(undefined)
        setTimeout(async () => {

            const user = {
                "emailUsuario":`${values.email}`
            }

            const data = await updatepassword(user) 
 
            console.log(data)

            if (data.status == true) { 
                setHasErrors(false)
                setLoading(false)
              }else{
                setHasErrors(true)
                setLoading(false)
                setSubmitting(false)
                setStatus(data.message)
              }
 
        }, 1000)
      },
    })
  
    

  return (
    <form
    className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
    noValidate
    id='kt_login_password_reset_form'
    onSubmit={formik.handleSubmit}
  >
    <div className='text-center mb-10'>
      {/* begin::Title */}
      <h1 className='text-dark fw-bolder mb-3'>¿Has olvidado la contraseña?</h1>
      {/* end::Title */}

      {/* begin::Link */}
      <div className='text-gray-500 fw-semibold fs-6'>
      Ingrese su correo electrónico para restablecer su contraseña.
      </div>
      {/* end::Link */}
    </div>

    {/* begin::Title */}
    {hasErrors === true && (
      <div className='mb-lg-15 alert alert-danger'>
        <div className='alert-text font-weight-bold'>
            No existe un usuario registrado con el correo ingresado
        </div>
      </div>
    )}

    {hasErrors === false && (
      <div className='mb-10 bg-light-info p-8 rounded'>
        <div className='text-info'>Se ha reestablecido la contraseña correctamente. Por favor revise su correo electrónico</div>
      </div>
    )}
    {/* end::Title */}

    {/* begin::Form group */}
    <div className='fv-row mb-8'>
      <label className='form-label fw-bolder text-gray-900 fs-6'>Email</label>
      <input
        type='email'
        placeholder=''
        autoComplete='off'
        {...formik.getFieldProps('email')}
        className={clsx(
          'form-control bg-transparent',
          {'is-invalid': formik.touched.email && formik.errors.email},
          {
            'is-valid': formik.touched.email && !formik.errors.email,
          }
        )}
      />
      {formik.touched.email && formik.errors.email && (
        <div className='fv-plugins-message-container'>
          <div className='fv-help-block'>
            <span role='alert'>{formik.errors.email}</span>
          </div>
        </div>
      )}
    </div>
    {/* end::Form group */}

    {/* begin::Form group */}
    <div className='d-flex flex-wrap justify-content-center pb-lg-0'>
      <button type='submit' id='kt_password_reset_submit' 
      className='btn btn-dark me-4 colorjadal'>  
        <span className='indicator-label'>Reestablecer</span>
        {loading && (
          <span className='indicator-progress'>
            Espere por favor...
            <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
          </span>
        )}
      </button>
      <Link to='/auth/login'>
        <button
          type='button'
          id='kt_login_password_reset_form_cancel_button'
          className='btn btn-light'
          disabled={formik.isSubmitting || !formik.isValid}
        >
          Cancel
        </button>
      </Link>{' '}
    </div>
    {/* end::Form group */}
  </form>
  )
}

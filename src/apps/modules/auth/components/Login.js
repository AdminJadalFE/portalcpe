import { useContext } from 'react'
import { useState } from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import { useFormik } from 'formik'
import { useAuth } from '../core/Auth'
import { login, getEmisores } from '../services/AuthService';
import { Link } from 'react-router-dom'
import isotipoAzul from '../../../../assets/logos/Isotipo-Azul.png'
import isotipoBlanco from '../../../../assets/logos/Isotipo-Blanco.png'
import './Login.css';

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Formato de Correo Incorrecto')
    .min(3, 'Debe ingresar mínimo 2 dígitos')
    .max(50, 'Debe ingresar máximo 50 dígitos')
    .required('Email es obligatorio'),
  password: Yup.string()
    .min(3, 'Debe ingresar mínimo 2 dígitos')
    .max(50, 'Debe ingresar máximo 50 dígitos')
    .required('Password es obligatorio'),
})

const initialValues = {
  email: '',
  password: '',
}

export function Login() {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { setCurrentUser, setCurrentEmisor, setEmisores } = useAuth()

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true)
      try {
        const user = {
          "emailUsuario": `${values.email}`,
          "claveUsuario": `${values.password}`
        }
        const data = await login(user)
        if (data.status == true) {
          const user = {
            "emailUsuario": `${values.email}`
          }
          const emisores = await getEmisores(user)
          if (emisores) {
            // saveAuth(data) 
            setCurrentUser(data)
            // console.log('setCurrentUser', data);
            localStorage.setItem('data', JSON.stringify(data));

            setEmisores(emisores.content)
            localStorage.setItem('emisores.content', JSON.stringify(emisores.content));

            setCurrentEmisor(emisores.content[0]);
            localStorage.setItem('emisores.content[0]', JSON.stringify(emisores.content[0]));
          } else {
            // saveAuth(undefined)
            setStatus('Usuario Incorrecto')
            setSubmitting(false)
            setLoading(false)
          }
        } else {
          // saveAuth(undefined)
          setStatus('Usuario Incorrecto')
          setSubmitting(false)
          setLoading(false)
        }

      } catch (error) {
        console.error(error)
        // saveAuth(undefined)
        setStatus('Las credenciales ingresadas no son correctas')
        setSubmitting(false)
        setLoading(false)
      }
    },
  })

  return (
    <form
      className='form w-100'
      onSubmit={formik.handleSubmit}
      noValidate
      id='kt_login_signin_form'
    >
      {/* begin::Heading */}
      <div className='text-center mb-11 portal-login-heading'>
        <div className='portal-login-kicker'>Portal de Facturación Electrónica</div>
        <h1 className='text-dark fw-bolder mb-3'>Ingrese sus credenciales</h1>
        <div className='portal-login-logo-frame'>
          <img
            src={isotipoAzul}
            alt='Jadal Global Services'
            className='portal-login-logo portal-login-logo-light'
          />
          <img
            src={isotipoBlanco}
            alt='Jadal Global Services'
            className='portal-login-logo portal-login-logo-dark'
          />
        </div>
        <p className='portal-login-subtitle'>Acceda a su portal de facturación electrónica</p>
      </div>
      {/* begin::Heading */}

      {formik.status && (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      )}

      {/* begin::Form group */}
      <div className='fv-row mb-8'>
        <label className='form-label fs-6 fw-bolder text-dark'>Correo</label>
        <div className='portal-input-wrap'>
          <i className='bi bi-person portal-input-icon' aria-hidden='true' />
          <input
            placeholder='Email'
            {...formik.getFieldProps('email')}
            className={clsx(
              'form-control bg-transparent',
              { 'is-invalid': formik.touched.email && formik.errors.email },
              {
                'is-valid': formik.touched.email && !formik.errors.email,
              }
            )}
            type='email'
            name='email'
            autoComplete='on'
          />
        </div>
        {formik.touched.email && formik.errors.email && (
          <div className='fv-plugins-message-container'>
            <span role='alert'>{formik.errors.email}</span>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='fv-row mb-3'>
        <label className='form-label fw-bolder text-dark fs-6 mb-0'>Contraseña</label>
        <div className='portal-input-wrap'>
          <i className='bi bi-lock portal-input-icon' aria-hidden='true' />
          <input
            type={showPassword ? 'text' : 'password'}
            autoComplete='off'
            {...formik.getFieldProps('password')}
            className={clsx(
              'form-control bg-transparent',
              {
                'is-invalid': formik.touched.password && formik.errors.password,
              },
              {
                'is-valid': formik.touched.password && !formik.errors.password,
              }
            )}
          />
          <button
            type='button'
            className='portal-password-toggle'
            onClick={() => setShowPassword((visible) => !visible)}
            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          >
            <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`} aria-hidden='true' />
          </button>
        </div>
        {formik.touched.password && formik.errors.password && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.password}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Wrapper */}
      <div className='d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8'>
        <div />

        {/* begin::Link */}
        <Link to='/auth/forgot-password' className='link-primary'>
          ¿Has olvidado la contraseña?
        </Link>
        {/* end::Link */}
      </div>
      {/* end::Wrapper */}

      {/* begin::Action */}
      <div className='d-grid mb-10'>
        <button
          type='submit'
          id='kt_sign_in_submit'
          className='btn btn-dark colorjadal'
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className='indicator-label'>Ingresar</span>}
          {loading && (
            <span className='indicator-progress' style={{ display: 'block' }}>
              Espere por favor...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
      </div>
      {/* end::Action */}


    </form>
  )
}

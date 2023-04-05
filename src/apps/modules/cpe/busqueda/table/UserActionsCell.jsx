/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect, useState} from 'react' 
import {MenuComponent} from '../../../../../_metronic/assets/ts/components'
import {SendEmail} from '../services/CpeService'; 
import { KTSVG} from '../../../../../_metronic/helpers' 
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useFormik} from 'formik' 
import clsx from 'clsx' 
import * as Yup from 'yup'
import Swal from 'sweetalert2';
import {Link} from 'react-router-dom' 

const loginSchema = Yup.object().shape({
    email1: Yup.string()
    .email('Formato de Correo Incorrecto')
    .min(3, 'Debe ingresar mínimo 2 dígitos')
    .max(50, 'Debe ingresar máximo 50 dígitos')
    .required('Email es obligatorio'),
    email2: Yup.string()
    .email('Formato de Correo Incorrecto')
    .min(3, 'Debe ingresar mínimo 2 dígitos')
    .max(50, 'Debe ingresar máximo 50 dígitos'),
    email3: Yup.string()
    .email('Formato de Correo Incorrecto')
    .min(3, 'Debe ingresar mínimo 2 dígitos')
    .max(50, 'Debe ingresar máximo 50 dígitos'),
})


const initialValues = {
    email1: '',
    email2: '',
    email3: '',
}
  
function MyVerticallyCenteredModal(props) {

    const [loading, setLoading] = useState(false)

    const {id} = props;

    const formik = useFormik({
        initialValues,
        validationSchema: loginSchema,
        onSubmit: async (values, {setStatus, setSubmitting}) => {
            setLoading(true); 

            try {
                let emails = ''
                emails += values.email1 === '' ? '' : `${values.email1}`
                emails += values.email2 === '' ? '' : `;${values.email2}`
                emails += values.email3 === '' ? '' : `;${values.email3}`

                const data = {
                    "id": id,
                    "emails": emails
                }

                await SendEmail(data);   

                props.onHide();

                Swal.fire({
                    icon: "success",
                    title: `El correo fue enviado correctamente a las bandejas ${emails}`,
                    showConfirmButton: false,
                    timer: 2000
                }) 



            } catch (error) {
                console.error(error)
                setStatus('Las credenciales ingresadas no son correctas')
                setSubmitting(false)
                setLoading(false)
            }
        },
      })
 
      useEffect(() => {
        MenuComponent.reinitialization()
      }, [])

    return ( 

            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Envío de correos  -  CPE : {id}
                </Modal.Title>
                </Modal.Header>
                <Modal.Body> 
                    <form
                        className='form w-100'
                        onSubmit={formik.handleSubmit}
                        noValidate
                        id='kt_login_signin_form'
                    > 
                        <div className='fv-row mb-8'>
                            <label className='form-label fs-6 fw-bolder text-dark'>Destinatario 1</label>
                            <input
                            placeholder='Email' 
                            {...formik.getFieldProps('email1')}
                            className={clsx(
                                'form-control bg-transparent',
                                {'is-invalid': formik.touched.email1 && formik.errors.email1},
                                {
                                'is-valid': formik.touched.email1 && !formik.errors.email1,
                                }
                            )}
                            type='email'
                            name='email1'
                            autoComplete='on'
                            />
                            {formik.touched.email1 && formik.errors.email1 && (
                            <div className='fv-plugins-message-container'>
                                <span role='alert'>{formik.errors.email1}</span>
                            </div>
                            )}
                        </div>

                        <div className='fv-row mb-8'>
                            <label className='form-label fs-6 fw-bolder text-dark'>Destinatario 2</label>
                            <input
                            placeholder='Email' 
                            {...formik.getFieldProps('email2')}
                            className={clsx(
                                'form-control bg-transparent',
                                {'is-invalid': formik.touched.email2 && formik.errors.email2},
                                {
                                'is-valid': formik.touched.email2 && !formik.errors.email2,
                                }
                            )}
                            type='email'
                            name='email2'
                            autoComplete='on'
                            />
                            {formik.touched.email2 && formik.errors.email2 && (
                            <div className='fv-plugins-message-container'>
                                <span role='alert'>{formik.errors.email2}</span>
                            </div>
                            )}
                        </div>

                        <div className='fv-row mb-8'>
                            <label className='form-label fs-6 fw-bolder text-dark'>Destinatario 3</label>
                            <input
                            placeholder='Email' 
                            {...formik.getFieldProps('email3')}
                            className={clsx(
                                'form-control bg-transparent',
                                {'is-invalid': formik.touched.email3 && formik.errors.email3},
                                {
                                'is-valid': formik.touched.email3 && !formik.errors.email3,
                                }
                            )}
                            type='email'
                            name='email3'
                            autoComplete='on'
                            />
                            {formik.touched.email3 && formik.errors.email3 && (
                            <div className='fv-plugins-message-container'>
                                <span role='alert'>{formik.errors.email3}</span>
                            </div>
                            )}
                        </div> 
                        
                        <div className='d-flex flex-row-reverse'>
                            <button type='submit' className='btn btn-dark me-3'>
                                <span className='indicator-label'>Enviar Correos</span>
                            </button> 
                            <Button className='btn btn-dark me-3' onClick={props.onHide}>Cerrar</Button>
                        </div>
                        
                    </form>

                </Modal.Body> 
            </Modal>  

    );
  }
 
   

const UserActionsCell = ({cpe}) => {
 
        const [modalShow, setModalShow] = useState(false);
   
          const setUrlPdf = (urlPdf) => {
            localStorage.setItem('urlpdfjadal', urlPdf);
          }
 
        return (
            <> 
                

 
                <a
                    href={cpe.urlCpe} target="_blank"
                    className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1' 
                    title='Descargar XML'
                >
                    <KTSVG path='/media/icons/duotune/fe/xml.svg' className='svg-icon-3' />
                </a>
                
                {/* <Link to='/visorpdf' 
                      target="_blank" 
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                      title='Descargar PDF'
                      onClick={() => setUrlPdf(cpe.urlPdf)}>
                        <KTSVG path='/media/icons/duotune/fe/pdf.svg' className='svg-icon-3' />
                </Link> */}
                
                <a
                    href={cpe.urlPdf} target="_blank"
                    className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                    title='Descargar PDF'
                >
                    <KTSVG path='/media/icons/duotune/fe/pdf.svg' className='svg-icon-3' />
                </a>



                <a 
                    href={cpe.urlCdr} target="_blank"
                    className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                    title='Descargar CDR'
                >
                    <KTSVG path='/media/icons/duotune/fe/cdr.svg' className='svg-icon-3' />
                </a> 
                <a   
                    onClick={() => setModalShow(true)}
                    className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                    title='Reenviar Correo'
                >
                    <KTSVG path='/media/icons/duotune/fe/mail.svg' className='svg-icon-3' /> 
                </a> 
                {
                    modalShow 
                    ?
                    (
                        <MyVerticallyCenteredModal
                        id={cpe.id}
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
                    )
                    :
                    <></>
                }

            </>
        )
}

export {UserActionsCell}
 
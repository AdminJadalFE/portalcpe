/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect, useState} from 'react' 
import {MenuComponent} from '../../../../../_metronic/assets/ts/components'
import {SendEmail, ResendCpe} from '../services/CpeService'; 
import { KTSVG} from '../../../../../_metronic/helpers' 
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useFormik} from 'formik' 
import clsx from 'clsx' 
import * as Yup from 'yup'
import Swal from 'sweetalert2';
import {Link} from 'react-router-dom' 
import { URL_BUCKET } from '../../../../BackConfig';

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
    phone: '',
}
  
function MyVerticallyCenteredModalWs(props){

    const [loading, setLoading] = useState(false)

    const {id} = props;

    const formik = useFormik({
        initialValues,
        onSubmit: async (values, {setStatus, setSubmitting}) => {
            setLoading(true); 

            try {
                let phone = values.phone;
                
                const whatsappUrl = `https://api.whatsapp.com/send/?phone=51${phone}&text=Hola,%20aqu%C3%AD%20te%20env%C3%ADo%20el%20PDF%20de%20tu%20factura%20${id}%20del%20portal%20de%20Facturacion%20enlace:%20${URL_BUCKET}${id}.pdf&type=phone_number&app_absent=0`;
                window.open(whatsappUrl, '_blank');

                props.onHide();

                Swal.fire({
                    icon: "success",
                    title: `El mensaje fue enviado correctamente a ${phone}`,
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
                Envío al whatsapp - CPE: {id}
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
                        <label className='form-label fs-6 fw-bolder text-dark'>Destinatario +51</label>
                        <input
                        placeholder='Número de teléfono 999999999' 
                        {...formik.getFieldProps('phone')}
                        className={clsx(
                            'form-control bg-transparent',
                            {'is-invalid': formik.touched.phone && formik.errors.phone},
                            {
                            'is-valid': formik.touched.phone && !formik.errors.phone,
                            }
                        )}
                        type='number'
                        name='phone'
                        autoComplete='on'
                        />
                        {formik.touched.phone && formik.errors.phone && (
                        <div className='fv-plugins-message-container'>
                            <span role='alert'>{formik.errors.phone}</span>
                        </div>
                        )}
                    </div>

                    <div className='d-flex flex-row-reverse'>
                        <button type='submit' className='btn btn-dark me-3'>
                            <span className='indicator-label'>Enviar Mensaje</span>
                        </button> 
                        <Button className='btn btn-dark me-3' onClick={props.onHide}>Cerrar</Button>
                    </div>
                    
                </form>

            </Modal.Body> 
        </Modal>  
    );
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

        console.log(cpe)
 
        const [modalShow, setModalShow] = useState(false);
        const [modalShowWs, setModalShowWs] = useState(false);


        const ResendCPEById = async (id) => {  
            const data = {
                "id": id
            } 
            const content = await ResendCpe(data);   

            console.log(content.indicador );

            if(content.indicador == true){
                Swal.fire({
                    icon: "success",
                    title: `${content.message}`,
                    showConfirmButton: false,
                    timer: 2000
                }) 
            }else{
                Swal.fire({
                    icon: "error",
                    title: `${content.message}`,
                    showConfirmButton: false,
                    timer: 2000
                }) 
            }



          } 
      
        return (
            <>  
   
    <Link to=''   
            className='btn btn-light btn-active-light-primary btn-sm'
            data-kt-menu-trigger='click'
            data-kt-menu-placement='bottom-end'>
            Opciones
            <KTSVG path='/media/icons/duotune/arrows/arr072.svg' className='svg-icon-5 m-0' />
    </Link> 
      {/* begin::Menu */}
      <div
        className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-150px py-4'
        data-kt-menu='true'
      >
        {/* begin::Menu item */}
        <div className='menu-item px-3'>  
          <a className='menu-link px-3' href={cpe.urlCpe} target="_blank" title='Descargar XML'>
                <KTSVG path='/media/icons/duotune/fe/xml.svg' className='svg-icon-3' />
                <text>Descargar XML</text>
          </a> 

          <a className='menu-link px-3' href={cpe.urlPdf} target="_blank" title='Descargar XML'>
                <KTSVG path='/media/icons/duotune/fe/xml.svg' className='svg-icon-3' />
                <text>Descargar PDF</text>
          </a> 

          <a className='menu-link px-3' href={cpe.urlCdr} target="_blank" title='Descargar XML'>
                <KTSVG path='/media/icons/duotune/fe/cdr.svg' className='svg-icon-3' />
                <text>Descargar CDR</text>
          </a>

          <Link to={`/visorpdf/${cpe.urlPdf.substring(cpe.urlPdf.lastIndexOf("/") + 1) }`} 
                    target="_blank" 
                    className='menu-link px-3'
                    title='Visualizar PDF'>
                <KTSVG path='/media/icons/duotune/fe/pdf.svg' className='svg-icon-3' />
                <text> Visualizar PDF</text>
            </Link>

          <a className='menu-link px-3' onClick={() => setModalShowWs(true)} title='Enviar Correo'>
                <KTSVG path='/media/icons/duotune/fe/mail.svg' className='svg-icon-3' /> 
                <text>Enviar al Whatsapp</text>
          </a>
          {
                modalShowWs 
                ?
                (
                    <MyVerticallyCenteredModalWs
                    id={cpe.id}
                    show={modalShowWs}
                    onHide={() => setModalShowWs(false)}
                />
                )
                :
                <></>
            }


          <a className='menu-link px-3' onClick={() => setModalShow(true)} title='Enviar Correo'>
                <KTSVG path='/media/icons/duotune/fe/mail.svg' className='svg-icon-3' /> 
                <text>Enviar Correo</text>
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

            <Link to={`/visortraza/${cpe.id}`}   
                    target="_blank" 
                    className='menu-link px-3'
                    title='Ver Traza CPE'>
                <KTSVG path='/media/icons/duotune/abstract/abs015.svg' className='svg-icon-3' />
                <text> Ver Traza CPE</text>
            </Link>

            <a className='menu-link px-3' onClick={() => ResendCPEById(`${cpe.id}`)} title='Enviar Correo'>
                <KTSVG path='/media/icons/duotune/fe/mail.svg' className='svg-icon-3' /> 
                <text>Reenviar CPE</text>
          </a>
  
        </div>
        {/* end::Menu item */}
 
      </div>
      {/* end::Menu */}

   

            </>
        )
}

export {UserActionsCell}
 
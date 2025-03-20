import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

/* AQUI PODRIA PASAR DIRECTAMENTE EL ATRIBUTO DATA, Y LUEGO HACER DATA.ESTADOCPE, O DATA.ID, PARA MAYOR ESCALABILIDAD */
const StateCell = ({ estadoCpe, id }) => {
  console.log(id)
  const [showModal, setShowModal] = useState(false)

  let estadoColor = '';

  switch (estadoCpe) {
    case "ACEPTADO":
      estadoColor = 'badge badge-light-success fw-bolder'
      break;

    case "RECHAZADO":
      estadoColor = 'badge badge-light-danger fw-bolder'
      break;

    case "ANULADO":
      estadoColor = 'badge badge-light-danger fw-bolder'
      break;

    case "BAJA":
      estadoColor = 'badge badge-light-danger fw-bolder'
      break;

    case "ERROR":
      estadoCpe = 'REMITIDO'
      estadoColor = 'badge badge-light-warning fw-bolder'
      break;

    default:
      estadoColor = 'badge badge-light-secondary fw-bolder'
      break;
  }

 /* const handleClickEdit = () => {
    // Aquí abriría un modal donde se cargaria un combobox
    setShowModal(true)

  }*/

  return (
    <div class="d-flex gap-2 align-items-center">{estadoCpe &&
      <div className={estadoColor}>
        {estadoCpe}
      </div>}
      {/*<button style={{ border: 'none', color: '#45458bda', padding: '0', lineHeight: '0', background: 'transparent' }}
        onClick={handleClickEdit}>
        <i class="fas fa-edit" style={{ fontSize: '1.2em' }}></i>
      </button>*/}
      {
        showModal &&
        <EditStateModal
          showModal={showModal}
          onHide={() => setShowModal(false)}
          id={id}
          estadoCpe={estadoCpe}/>
      }
    </div>
  )
}

function EditStateModal({ showModal, onHide, id, estadoCpe }) {
  return (
    <Modal
      show={showModal}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Editar estado - CPE: {id}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h2>Estado actual: {estadoCpe}</h2>
        <Form.Select size="sm">
          <option value="">oli</option>
          <option value="">uwu</option>
        </Form.Select>
      </Modal.Body>
    </Modal>
  )
}

export { StateCell }

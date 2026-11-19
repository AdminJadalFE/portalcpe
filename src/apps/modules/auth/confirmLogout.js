import Swal from 'sweetalert2'

const confirmLogout = async (logout) => {
  const result = await Swal.fire({
    icon: 'warning',
    title: '¿Cerrar sesión?',
    text: '¿Está seguro de que desea cerrar su sesión?',
    showCancelButton: true,
    confirmButtonText: 'Sí, cerrar sesión',
    cancelButtonText: 'Cancelar',
    reverseButtons: true,
    focusCancel: true,
    buttonsStyling: false,
    customClass: {
      popup: 'portal-swal-popup',
      title: 'portal-swal-title',
      htmlContainer: 'portal-swal-text',
      actions: 'portal-swal-actions',
      confirmButton: 'portal-swal-confirm',
      cancelButton: 'portal-swal-cancel',
    },
  })

  if (result.isConfirmed) {
    logout()
  }

  return result.isConfirmed
}

export {confirmLogout}

const CpeLoading = () => {
  const styles = {
    borderRadius: '0.475rem',
    boxShadow: '0 0 50px 0 rgb(82 63 105 / 15%)',
    backgroundColor: '#fff',
    color: '#7e8299',
    fontWeight: '500',
    margin: '0',
    width: 'auto',
    padding: '1rem 2rem',
  }

  return (
    <div style={{display: 'flex', justifyContent: 'center', paddingBottom: '3em'}}>
      <div style={{ ...styles, textAlign: 'center' }}>Obteniendo Datos...</div>
    </div>
  )
}

export { CpeLoading }

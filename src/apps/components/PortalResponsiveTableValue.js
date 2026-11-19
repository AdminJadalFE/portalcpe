const typeLabels = {
  '01': 'FACTURA',
  '03': 'BOLETA',
  '07': 'N. CRÉDITO',
  '08': 'N. DÉBITO',
  '09': 'GUÍA',
  '20': 'RETENCIÓN',
  '40': 'PERCEPCIÓN',
}

const formatPortalResponsiveTableValue = (value, columnId) => {
  if (value === null || value === undefined || value === '') return '—'
  if (columnId === 'tipoCpe') return typeLabels[value] || value
  if (columnId === 'totalCpe' && typeof value === 'number') return value.toFixed(2)
  if (typeof value === 'object') return Object.values(value).filter(Boolean).join(' · ')
  return String(value).replace('T', ' ')
}

export {formatPortalResponsiveTableValue}

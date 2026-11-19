import {useEffect, useRef, useState} from 'react'

const TABLE_VIEW_OPTIONS = [
  {value: 'cards', label: 'Vista resumida'},
  {value: 'scroll', label: 'Tabla con desplazamiento horizontal'},
]

const PortalTableViewControl = ({value, onChange}) => {
  const [open, setOpen] = useState(false)
  const controlRef = useRef(null)
  const selectedOption = TABLE_VIEW_OPTIONS.find((option) => option.value === value) || TABLE_VIEW_OPTIONS[0]

  useEffect(() => {
    if (!open) return undefined

    const handleOutsidePointer = (event) => {
      if (!controlRef.current?.contains(event.target)) setOpen(false)
    }

    document.addEventListener('pointerdown', handleOutsidePointer)
    return () => document.removeEventListener('pointerdown', handleOutsidePointer)
  }, [open])

  return (
    <div className='portal-table-view-control' ref={controlRef}>
      <span>Visualización</span>
      <button
        type='button'
        className='portal-table-view-trigger'
        aria-haspopup='listbox'
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <span>{selectedOption.label}</span>
        <i className='bi bi-chevron-down' aria-hidden='true' />
      </button>
      {open && (
        <div className='portal-table-view-menu' role='listbox' aria-label='Opciones de visualización'>
          {TABLE_VIEW_OPTIONS.map((option) => (
            <button
              type='button'
              role='option'
              aria-selected={option.value === selectedOption.value}
              className={`portal-table-view-option ${option.value === selectedOption.value ? 'is-selected' : ''}`}
              key={option.value}
              onClick={() => {
                onChange(option.value)
                setOpen(false)
              }}
            >
              <span>{option.label}</span>
              {option.value === selectedOption.value && <i className='bi bi-check2' aria-hidden='true' />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export {PortalTableViewControl}

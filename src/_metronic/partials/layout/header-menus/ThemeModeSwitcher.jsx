import {useEffect, useState} from 'react'

const THEME_STORAGE_KEY = 'portalcpe-theme'

const getStoredTheme = () => {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY) === 'dark' ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

const ThemeModeSwitcher = () => {
  const [theme, setTheme] = useState(getStoredTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-portal-theme', theme)
    document.documentElement.setAttribute('data-theme', theme)

    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme)
    } catch {
      // Theme remains available for the current session when storage is unavailable.
    }
  }, [theme])

  const isDark = theme === 'dark'
  const nextThemeLabel = isDark ? 'claro' : 'oscuro'

  return (
    <button
      type='button'
      className={`portal-theme-switch ${isDark ? 'is-dark' : ''}`}
      onClick={() => setTheme((currentTheme) => currentTheme === 'light' ? 'dark' : 'light')}
      aria-pressed={isDark}
      aria-label={`Activar modo ${nextThemeLabel}`}
      title={`Modo ${nextThemeLabel}`}
    >
      <span className='portal-theme-switch-track'>
        <span className='portal-theme-switch-thumb'>
          <i className={`bi ${isDark ? 'bi-moon-stars-fill' : 'bi-sun-fill'}`} aria-hidden='true' />
        </span>
      </span>
    </button>
  )
}

export {ThemeModeSwitcher}

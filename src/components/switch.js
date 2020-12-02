import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { colors } from '../theme'
import '../theme/app.css'
import Connector from '../utils/connector'

// ------------------------------------
// Styles
// ------------------------------------

const lightTheme = {
  bg: colors.gray_light,
  headerBg: colors.gray_heavy,
  footerBg: colors.gray_heavy,
  post: 'white',
  textNormal: colors.gray_dark,
  textLink: colors.blue,
  shadow: colors.shadow,
  hr: `hsla(0, 0%, 100%, 0.2)`,
  snsLink: colors.gray_dark,
  h1: colors.blue,
  h2: colors.gray_heavy,
  h3: colors.gray,
  blockquote: colors.gray,
  tagBg: colors.gray_light,
  backgroundColor: 'var(--bg)',
}

const darkTheme = {
  bg: colors.gray_heavy,
  headerBg: 'transparent',
  footerBg: 'transparent',
  post: colors.black_to_gray,
  textNormal: colors.gray_light,
  textLink: colors.blue_light,
  shadow: 'transparent',
  snsLink: 'white',
  hr: 'hsla(0, 0%, 0%, 0.2)',
  h1: colors.gray_light,
  h2: 'white',
  h3: colors.gray,
  blockquote: colors.gray,
  tagBg: colors.gray_dark,
  backgroundColor: 'var(--bg)',
}

// ------------------------------------
// Classes
// ------------------------------------

const Switch = ({ actions, theme, className }) => {
  // ------------------------------------
  // Actions
  // ------------------------------------
  const toggleSwitch = () => {
    const isDark = theme === 'light'
    const currentTheme = isDark ? darkTheme : lightTheme
    Object.keys(currentTheme).forEach((key) => {
      const cssKey = `--${key}`
      const cssVal = currentTheme[key]
      document.body.style.setProperty(cssKey, cssVal)
    })
    actions.setTheme(isDark ? 'dark' : 'light')
  }

  // ------------------------------------
  // Subscription
  // ------------------------------------
  useEffect(() => {
    const currentTheme = theme === 'light' ? lightTheme : darkTheme
    const all = { ...colors, ...currentTheme }
    Object.keys(all).forEach((key) => {
      const cssKey = `--${key}`
      const cssVal = all[key]
      document.body.style.setProperty(cssKey, cssVal)
    })
  }, [])
  // ------------------------------------
  // Rendering
  // ------------------------------------
  return (
    <button
      type="button"
      className={`switch ${className}`}
      data-isOn={theme === 'light'}
      onClick={toggleSwitch}
      style={{ marginBottom: '0.3rem' }}
    >
      <motion.div
        layout
        className="handle"
        transition={{
          type: 'spring',
          stiffness: 700,
          damping: 30,
        }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <span style={{ fontSize: '1rem' }}>
          {theme === 'light' ? '🌞' : '🌛'}
        </span>
      </motion.div>
    </button>
  )
}

export default (props) => (
  <Connector>
    {({
      actions,
      state: {
        app: { theme },
      },
    }) => <Switch actions={actions.app} theme={theme} {...props} />}
  </Connector>
)

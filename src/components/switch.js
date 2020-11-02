import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { colors } from "../theme"
import "../theme/app.css"

// ------------------------------------
// Styles
// ------------------------------------

const lightTheme = {
  bg: colors.gray_light,
  headerBg: "white",
  post: "white",
  textNormal: colors.gray_dark,
  textLink: colors.blue,
  shadow: colors.shadow,
  hr: `hsla(0, 0%, 100%, 0.2)`,
  backgroundColor: "var(--bg)",
}

const darkTheme = {
  bg: colors.gray_heavy,
  headerBg: "transparent",
  post: colors.black_to_gray,
  textNormal: colors.gray_light,
  textLink: colors.blue_light,
  hr: "hsla(0, 0%, 0%, 0.2)",
  shadow: "transparent",
  backgroundColor: "var(--bg)",
}

// ------------------------------------
// Classes
// ------------------------------------

const Switch = () => {
  // ------------------------------------
  // State
  // ------------------------------------
  const [isOn, setIsOn] = useState(false)

  // ------------------------------------
  // Actions
  // ------------------------------------
  const toggleSwitch = () => {
    const theme = isOn ? darkTheme : lightTheme
    Object.keys(theme).forEach(key => {
      const cssKey = `--${key}`
      const cssVal = theme[key]
      document.body.style.setProperty(cssKey, cssVal)
    })
    setIsOn(!isOn)
  }

  // ------------------------------------
  // Subscription
  // ------------------------------------
  useEffect(() => {
    const theme = { ...colors, ...darkTheme }
    Object.keys(theme).forEach(key => {
      const cssKey = `--${key}`
      const cssVal = theme[key]
      document.body.style.setProperty(cssKey, cssVal)
    })
  }, [])
  // ------------------------------------
  // Rendering
  // ------------------------------------
  return (
    <div className="switch" data-isOn={isOn} onClick={toggleSwitch}>
      <motion.div
        layout
        className="handle"
        transition={{
          type: "spring",
          stiffness: 700,
          damping: 30,
        }}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: 20 }}>{isOn ? "🌞" : "🌛"}</span>
      </motion.div>
    </div>
  )
}

export default Switch

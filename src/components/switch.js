import React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { images } from "../theme"
import "../theme/app.css"

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
}

const styles = {
  icon: {
    width: "100%",
  },
}

const lightTheme = {
  bg: "white",
  post: "white",
  textNormal: "#282a37",
  textLink: "#0372eb",
  shadow: `0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 2.3px 17.9px rgba(0, 0, 0, 0.072)`,
  hr: `hsla(0, 0%, 100%, 0.2)`,
  backgroundColor: "var(--bg)",
}

const darkTheme = {
  bg: "#222431",
  post: `linear-gradient(
    0deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(54, 56, 71, 1) 0%,
    rgba(40, 43, 59, 1) 100%
  )`,
  textNormal: "#d5d6db",
  textLink: "#09c0fb",
  hr: "hsla(0, 0%, 0%, 0.2)",
  shadow: "transparent",
  backgroundColor: "var(--bg)",
}

const Switch = () => {
  const [isOn, setIsOn] = useState(false)
  const toggleSwitch = () => {
    setIsOn(!isOn)
    const theme = isOn ? darkTheme : lightTheme
    Object.keys(theme).forEach(key => {
      const cssKey = `--${key}`
      const cssVal = theme[key]
      document.body.style.setProperty(cssKey, cssVal)
    })
  }
  return (
    <div className="switch" data-isOn={isOn} onClick={toggleSwitch}>
      <motion.div className="handle" layout transition={spring}>
        <img src={isOn ? images.sun : images.moon} style={styles.icon} alt="" />
      </motion.div>
    </div>
  )
}

export default Switch

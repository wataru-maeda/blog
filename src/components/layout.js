import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import Switch from "../components/switch"
import Search from "../components/search"
import { rhythm, scale } from "../utils/typography"

const styles = {
  root: {
    color: "var(--textNormal)",
    background: "var(--bg)",
    backgroundImage: "var(--bg)",
    transition: "color 0.2s ease-out, background 0.2s ease-out",
    minHeight: "100vh",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "var(--bg)",
    backgroundImage: "var(--bg)",
    padding: `${rhythm(1)} ${rhythm(3)}`,
    marginBottom: rhythm(1),
  },
  headerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  h1: {
    ...scale(1 / 2),
    margin: 0,
  },
  link: {
    boxShadow: `none`,
    textDecoration: `none`,
    color: `inherit`,
  },
}

const Header = ({ location, title }) => {
  const blogPath = `${__PATH_PREFIX__}/blog/`
  return (
    <div style={styles.header}>
      <h1 style={styles.h1}>
        <Link
          style={styles.link}
          to={location.pathname === blogPath ? `/blog/` : `/`}
        >
          {title}
        </Link>
      </h1>
      <div style={styles.headerContainer}>
        <Search />
        <span style={{ width: rhythm(1) }} />
        <Switch />
      </div>
    </div>
  )
}

const Layout = ({ children }) => (
  <div style={styles.root}>
    <header>
      <Header {...props} />
    </header>
    <main>{children}</main>
  </div>
)

export default Layout

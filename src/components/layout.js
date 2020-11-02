import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import Switch from "../components/switch"
import { rhythm, scale } from "../utils/typography"

const styles = {
  root: {
    marginLeft: `auto`,
    marginRight: `auto`,
    color: "var(--textNormal)",
    transition: "color 0.2s ease-out, background 0.2s ease-out",
    background: "var(--bg)",
    backgroundImage: "var(--bg)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: `${rhythm(1 / 2)} ${rhythm(3 / 4)}`,
    background: "var(--bg)",
    backgroundImage: "var(--bg)",
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
      <Switch />
    </div>
  )
}

const Layout = props => {
  const { children } = props
  return (
    <Wrapper>
      <div style={styles.root}>
        <header>
          <Header {...props} />
        </header>
        <main>{children}</main>
      </div>
      <Footer></Footer>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  min-height: 100vh;
`

const Footer = styled.footer`
  text-align: center;
  margin: 24px;
`

export default Layout

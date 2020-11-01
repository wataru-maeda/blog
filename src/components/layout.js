import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import { rhythm, scale } from "../utils/typography"
import "../global.css"

const styles = {
  root: {
    marginLeft: `auto`,
    marginRight: `auto`,
    maxWidth: rhythm(24),
    padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
    color: "var(--textNormal)",
    transition: "color 0.2s ease-out, background 0.2s ease-out",
  },
  h1: {
    ...scale(1.2),
    marginBottom: rhythm(1.5),
    marginTop: 0,
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
    <h1 style={styles.h1}>
      <Link
        style={styles.link}
        to={location.pathname === blogPath ? `/blog/` : `/`}
      >
        {title}
      </Link>
    </h1>
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

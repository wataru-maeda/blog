import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'

import Switch from './switch'
import Search from './search'
import { rhythm, scale } from '../utils/typography'
import { styler } from '../theme'
import Icon from './icon'

const styles = styler({
  root: {
    color: 'var(--textNormal)',
    background: 'var(--bg)',
    backgroundImage: 'var(--bg)',
    transition: 'color 0.2s ease-out, background 0.2s ease-out',
    minHeight: '100vh',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'var(--headerBg)',
    padding: `0 ${rhythm(3)}}`,
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  h1: {
    ...scale(1 / 2),
    margin: 0,
  },
  link: {
    fontSize: '1.2rem',
    boxShadow: `none`,
    textDecoration: `none`,
    color: `inherit`,
  },
  category: {
    fontSize: '1.2rem',
    marginLeft: rhythm(2 / 3),
    color: 'var(--snsLink)',
    boxShadow: 'none',
  },
})

const Header = ({ location, categoriesGroup: { group } }) => {
  const blogPath = `${__PATH_PREFIX__}/blog/`
  return (
    <div className={styles.header}>
      <h1 className={styles.h1}>
        <Link
          className={styles.link}
          to={location.pathname === blogPath ? `/blog/` : `/`}
        >
          <Icon name="home" />
        </Link>

        {group.map(({ fieldValue }) => (
          <Link
            className={`sns-link ${styles.category}`}
            to={`/categories/${fieldValue.toLowerCase()}/`}
          >
            {fieldValue}
          </Link>
        ))}
      </h1>
      <div className={styles.headerContainer}>
        <Search />
        <span style={{ width: rhythm(1) }} />
        <Switch />
      </div>
    </div>
  )
}

const Layout = (props) => (data) => {
  // console.log('[##] props', props)
  // console.log('[##] data', data)
  const { children } = props
  return (
    <div className={styles.root}>
      <header style={{ marginBottom: rhythm(1) }}>
        <Header {...props} {...data} />
      </header>
      <main>{children}</main>
    </div>
  )
}

const layoutQuery = graphql`
  query LayoutQuery {
    categoriesGroup: allMdx(limit: 2000) {
      group(field: frontmatter___categories) {
        fieldValue
      }
    }
  }
`

export default (props) => (
  <StaticQuery query={layoutQuery} render={Layout(props)} />
)

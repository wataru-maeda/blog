import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import Switch from './switch'
import Search from './search'
import { rhythm, scale } from '../utils/typography'
import { styler, colors, breakpoints } from '../theme'
import Icon from './icon'
import Connector from '../utils/connector'

// ------------------------------------
// Styles
// ------------------------------------

const styles = styler({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    background: 'var(--headerBg)',
    width: '100%',
    boxShadow: 'var(--shadow)',
    padding: `0 5rem`,
    [breakpoints.tablet]: {
      padding: `0 40px`,
    },
    [breakpoints.phone]: {
      padding: `0 20px`,
    },
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  h1: {
    ...scale(1 / 2),
    margin: 0,
    [breakpoints.phone]: {
      display: 'none',
    },
  },
  link: {
    fontSize: '1.2rem',
    boxShadow: `none`,
    textDecoration: `none`,
    color: `inherit`,
  },
  categoryContainer: {
    [breakpoints.laptop]: {
      display: 'none',
    },
  },
  category: {
    fontSize: '1.2rem',
    marginLeft: `${rhythm(2 / 3)} !important`,
    color: 'white !important',
    boxShadow: 'none',
    textDecoration: 'none',
    '&:hover': {
      color: `${colors.blue_light} !important`,
    },
  },
  menuContainer: {
    display: 'none',
    [breakpoints.phone]: {
      display: 'flex',
    },
  },
  menuButton: {
    background: 'transparent',
    outline: 'none',
    border: 'none',
    marginBottom: 5,
    '&:focus': {
      outline: 0,
      boxShadow: 'none',
    },
  },
  home: {
    color: 'white',
    '&:hover': {
      color: `${colors.blue_light} !important`,
    },
  },
  switch: {
    marginBottom: '20 !important',
  },
})

// ------------------------------------
// Components
// ------------------------------------

const Header = ({ location, actions, isOpen }) => ({
  categoriesGroup: { group },
}) => {
  const blogPath = `${__PATH_PREFIX__}/blog/`
  return (
    <div className={styles.root}>
      <span className={styles.menuContainer}>
        <button
          type="button"
          className={styles.menuButton}
          onClick={() => actions.setSideMenuOpen(!isOpen)}
        >
          <Icon name="bars" className={styles.home} />
        </button>
      </span>
      <h1 className={styles.h1}>
        <Link
          className={styles.link}
          to={location.pathname === blogPath ? `/blog/` : `/`}
        >
          <Icon name="home" className={styles.home} />
        </Link>
        <span className={styles.categoryContainer}>
          {group.map(({ fieldValue }) => (
            <Link
              className={`sns-link ${styles.category}`}
              to={`/categories/${fieldValue.toLowerCase()}/`}
            >
              {fieldValue}
            </Link>
          ))}
        </span>
      </h1>
      <div className={styles.container}>
        <Search />
        <span style={{ width: rhythm(1) }} />
        <Switch className={styles.switch} />
      </div>
    </div>
  )
}

const headerQuery = graphql`
  query {
    categoriesGroup: allMdx(limit: 2000) {
      group(field: frontmatter___categories) {
        fieldValue
      }
    }
  }
`

export default (props) => (
  <Connector>
    {({
      actions,
      state: {
        app: { isOpen },
      },
    }) => (
      <StaticQuery
        query={headerQuery}
        render={Header({ ...props, actions: actions.app, isOpen })}
      />
    )}
  </Connector>
)

import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import Switch from './switch'
import Search from './search'
import { rhythm, scale } from '../utils/typography'
import { styler } from '../theme'
import Icon from './icon'

const styles = styler({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    background: 'var(--headerBg)',
    padding: `0 ${rhythm(3)}}`,
    width: '100%',
    boxShadow: 'var(--shadow)',
  },
  container: {
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
    marginLeft: `${rhythm(2 / 3)} !important`,
    color: 'var(--snsLink) !important',
    boxShadow: 'none',
    textDecoration: 'none',
  },
  home: {
    color: 'var(--snsLink)',
  },
  switch: {
    marginBottom: '20 !important',
    background: 'red',
  },
})

const Header = ({ location }) => ({ categoriesGroup: { group } }) => {
  const blogPath = `${__PATH_PREFIX__}/blog/`
  return (
    <div className={styles.root}>
      <h1 className={styles.h1}>
        <Link
          className={styles.link}
          to={location.pathname === blogPath ? `/blog/` : `/`}
        >
          <Icon name="home" className={styles.home} />
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
  <StaticQuery query={headerQuery} render={Header(props)} />
)

import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import kebabCase from 'lodash/kebabCase'
import Icon from './icon'
import { rhythm } from '../utils/typography'
import { styler } from '../theme'
import '../theme/app.css'

const styles = styler({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundImage: 'var(--post)',
    background: 'var(--post)',
    borderRadius: rhythm(0.3),
    width: rhythm(14),
    marginLeft: rhythm(2),
    marginTop: rhythm(1),
    padding: rhythm(0.6),
  },
  tagContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  header: {
    margin: `0 0 ${rhythm(0.6)}`,
  },
  tag: {
    padding: `${rhythm(0.1)} ${rhythm(0.4)}`,
    borderRadius: 20,
    backgroundColor: 'var(--tagBg)',
    margin: rhythm(0.15),
  },
  link: {
    color: 'var(--textNormal)',
    textDecoration: 'none',
    boxShadow: 'none',
  },
  icon: {
    color: 'var(--snsLink)',
    marginRight: rhythm(0.2),
  },
})

const Tags = ({ tags: { group } }) => (
  <div className={styles.root}>
    <h4 className={styles.header}>タグ一覧</h4>
    <div className={styles.tagContainer}>
      {group.map(({ fieldValue }) => (
        <span className={styles.tag}>
          <Link to={`/tags/${kebabCase(fieldValue)}/`} className={styles.link}>
            <Icon name="hashtag" className={styles.icon} />
            {fieldValue}
          </Link>
        </span>
      ))}
    </div>
  </div>
)

const tagsQuery = graphql`
  query {
    tags: allMdx(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
      }
    }
  }
`

export default () => <StaticQuery query={tagsQuery} render={Tags} />

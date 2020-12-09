import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Tag from './tag'
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
    borderRadius: 8,
    width: 320,
    marginLeft: 60,
    marginTop: 30,
    padding: '10px 20px',
    boxShadow: 'var(--shadow)',
  },
  tagContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  header: {
    margin: `0 0 ${rhythm(0.6)}`,
    color: 'var(--textNormal)',
  },
})

const Tags = ({ className }) => ({ tags: { group } }) => (
  <div className={`${styles.root} ${className}`}>
    <h4 className={styles.header}>タグ一覧</h4>
    <div className={styles.tagContainer}>
      {group.map(({ fieldValue }) => (
        <Tag name={fieldValue} />
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

export default (props) => <StaticQuery query={tagsQuery} render={Tags(props)} />

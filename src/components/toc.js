import React from 'react'
import { PropTypes } from 'prop-types'
import { styler } from '../theme'
import { rhythm } from '../utils/typography'

const styles = styler({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundImage: 'var(--post)',
    background: 'var(--post)',
    borderRadius: rhythm(0.3),
    width: rhythm(13),
    marginLeft: rhythm(2),
    marginTop: rhythm(1),
    padding: rhythm(0.6),
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    // alignItems: 'center',
  },
  header: {
    margin: `0 0 ${rhythm(0.6)}`,
    color: 'var(--textNormal)',
  },
})

const Toc = ({ tableOfContents }) => {
  if (
    !tableOfContents ||
    (Array.isArray(tableOfContents) && tableOfContents.length === 0)
  )
    return null
  return (
    <div className={styles.root}>
      <h4 className={styles.header}>目次</h4>
      <ui className={styles.container}>
        {tableOfContents.map(({ title, url }) => (
          <a href={url}>{title}</a>
        ))}
      </ui>
    </div>
  )
}

Toc.propTypes = {
  tableOfContents: PropTypes.arrayOf(PropTypes.shape({})),
}

Toc.defaultProps = {
  tableOfContents: null,
}

export default Toc

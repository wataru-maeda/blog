import React from 'react'
import { PropTypes } from 'prop-types'
import { Link } from 'gatsby'
import kebabCase from 'lodash/kebabCase'
import { rhythm } from '../utils/typography'
import Icon from './icon'
import { styler } from '../theme'

const styles = styler({
  root: {
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
    fontSize: 14,
  },
})

const Tag = ({ name }) => {
  return (
    <span className={styles.root}>
      <Link to={`/tags/${kebabCase(name)}/`} className={styles.link}>
        <Icon name="hashtag" className={styles.icon} />
        {name}
      </Link>
    </span>
  )
}

Tag.propTypes = {
  name: PropTypes.string,
}

Tag.defaultProps = {
  name: '',
}

export default Tag

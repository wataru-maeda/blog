import React from 'react'
import { Link } from 'gatsby'
import { PropTypes } from 'prop-types'
import Img from 'gatsby-image'
import Tag from './tag'
import { rhythm } from '../utils/typography'
import { styler } from '../theme'
import Icon from './icon'
import '../theme/app.css'

// ------------------------------------
// Styles
// ------------------------------------

const styles = styler({
  root: {
    backgroundImage: 'var(--post)',
    background: 'var(--post)',
    borderRadius: rhythm(0.3),
    marginBottom: rhythm(1),
    overflow: 'hidden',
    textAlign: 'center',
    // width: '48%',
    width: '100%',
  },
  thumbnail: {
    width: '100%',
  },
  title: {
    fontSize: rhythm(2 / 3),
    margin: `${rhythm(1 / 2)} ${rhythm(1 / 2)} ${rhythm(1 / 4)}`,
    color: 'var(--textNormal)',
  },
  date: {
    color: 'var(--textNormal)',
    margin: `0 ${rhythm(1 / 2)} ${rhythm(1)}`,
  },
  p: {
    color: 'var(--textNormal)',
    margin: `0 ${rhythm(1 / 2)} ${rhythm(1 / 4)}`,
  },
  tagsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: rhythm(1),
  },
  link: {
    display: 'inline-block',
    padding: `${rhythm(1 / 4)} ${rhythm(1 / 2)}`,
    marginBottom: rhythm(1 / 2),
    textDecoration: 'none',
    fontWeight: 'bold',
  },
})

// ------------------------------------
// Helpers
// ------------------------------------

const getFluid = (thumbnail) => {
  if (!thumbnail) return null
  if (!thumbnail.childImageSharp) return null
  return thumbnail.childImageSharp.fluid
}

// ------------------------------------
// Classes
// ------------------------------------

const Post = ({
  thumbnail,
  slug,
  title,
  date,
  description,
  excerpt,
  tags,
  categories,
}) => {
  console.log('[##] tags', tags)
  console.log('[##] categories', categories)
  const fluid = getFluid(thumbnail)
  return (
    <div key={slug} className={styles.root}>
      <h3 className={styles.title}>{title}</h3>
      <small className={styles.date}>{date}</small>
      {Array.isArray(categories) && categories.length > 0 && categories[0]}
      {fluid && <Img fluid={fluid} className={styles.thumbnail} alt={title} />}
      <p
        className={styles.p}
        dangerouslySetInnerHTML={{
          __html: description || excerpt,
        }}
      />
      <div className={styles.tagsContainer}>
        {tags && tags.map((name) => <Tag name={name} />)}
      </div>
      <Link className={`${styles.link} readme-link`} to={`${slug}`}>
        READ MORE &nbsp;
        <Icon name="right" />
      </Link>
    </div>
  )
}

Post.propTypes = {
  props: PropTypes.shape({}),
}

Post.defaultProps = {
  props: {},
}

export default Post

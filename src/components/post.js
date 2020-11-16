import React from 'react'
import { Link } from 'gatsby'
import { PropTypes } from 'prop-types'
import Img from 'gatsby-image'
import { rhythm } from '../utils/typography'
import { styler } from '../theme'

// ------------------------------------
// Styles
// ------------------------------------

const styles = styler({
  root: {
    display: 'flex',
    boxShadow: 'none',
    width: '48%',
  },
  container: {
    backgroundImage: 'var(--post)',
    background: 'var(--post)',
    borderRadius: rhythm(0.3),
    marginBottom: rhythm(1),
    overflow: 'hidden',
    textAlign: 'center',
    width: '100%',
  },
  thumbnail: {
    width: '100%',
  },
  h3: {
    fontSize: rhythm(1),
    fontWeight: 'normal',
    margin: `${rhythm(1 / 2)} ${rhythm(1 / 2)} ${rhythm(1 / 4)}`,
  },
  small: {
    color: 'var(--textNormal)',
    margin: `0 ${rhythm(1 / 2)} ${rhythm(1)}`,
  },
  p: {
    color: 'var(--textNormal)',
    margin: `0 ${rhythm(1 / 2)} ${rhythm(1 / 4)}`,
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
    <Link className={styles.root} to={`${slug}`}>
      <div key={slug} className={styles.container}>
        <h3 className={styles.h3}>{title}</h3>
        <small className={styles.small}>{date}</small>
        {fluid && (
          <Img fluid={fluid} className={styles.thumbnail} alt={title} />
        )}
        <p
          className={styles.p}
          dangerouslySetInnerHTML={{
            __html: description || excerpt,
          }}
        />
      </div>
    </Link>
  )
}

Post.propTypes = {
  props: PropTypes.shape({}),
}

Post.defaultProps = {
  props: {},
}

export default Post

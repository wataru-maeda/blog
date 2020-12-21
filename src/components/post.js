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
    width: '100%',
    boxShadow: 'var(--shadow)',
  },
  thumbnail: {
    width: '100%',
  },
  title: {
    fontSize: rhythm(2 / 3),
    margin: `${rhythm(1 / 2)} ${rhythm(1 / 2)} ${rhythm(1 / 4)}`,
    color: 'var(--textNormal)',
    marginBottom: rhythm(0.3),
  },
  date: {
    color: 'var(--textNormal)',
    margin: `0 ${rhythm(1 / 2)} ${rhythm(0.3)}`,
    fontSize: rhythm(0.5),
  },
  categoryLink: {
    display: 'inline-block',
    marginBottom: rhythm(0.3),
  },
  p: {
    color: 'var(--textNormal)',
    margin: `${rhythm(1 / 2)} 20px`,
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

const getCategory = (categories) =>
  Array.isArray(categories) && categories.length > 0 ? categories[0] : null

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
  const fluid = getFluid(thumbnail)
  const category = getCategory(categories)
  return (
    <div key={slug} className={styles.root}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.date}>{date}</div>
      {category && (
        <Link
          to={`/categories/${category.toLowerCase()}`}
          className={styles.categoryLink}
        >
          {category}
        </Link>
      )}
      {fluid && (
        <Link to={`${slug}`}>
          <Img fluid={fluid} className={styles.thumbnail} alt={title} />
        </Link>
      )}
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

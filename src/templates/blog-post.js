import React from 'react'
import { Link, graphql } from 'gatsby'
import { PropTypes } from 'prop-types'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Bio from '../components/bio'
import SEO from '../components/seo'
import { rhythm, scale } from '../utils/typography'
import { styler } from '../theme'

const styles = styler({
  root: {
    color: 'var(--textNormal)',
    background: 'var(--bg)',
    backgroundImage: 'var(--bg)',
    transition: 'color 0.2s ease-out, background 0.2s ease-out',
    minHeight: '100vh',
  },
})

// ------------------------------------
// Helpers
// ------------------------------------

const getImageSource = (post) => {
  if (!post) return null
  if (!post.frontmatter) return null
  if (!post.frontmatter.thumbnail) return null
  if (!post.frontmatter.thumbnail.childImageSharp) return null
  return post.frontmatter.thumbnail.childImageSharp.fluid.src
}

// ------------------------------------
// Classes
// ------------------------------------

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.mdx
  const siteTitle = data.site.siteMetadata.title
  // const tableOfContents = data.mdx.tableOfContents.items
  const { previous, next } = pageContext
  const imageSource = getImageSource(post)
  console.log('[##] site title', siteTitle)
  console.log('[##] location', location)

  return (
    <div className={styles.root}>
      <SEO
        image={imageSource}
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <h1>{post.frontmatter.title}</h1>
      <p
        style={{
          ...scale(-1 / 5),
          display: `block`,
          marginBottom: rhythm(1),
          marginTop: rhythm(-1),
        }}
      >
        {post.frontmatter.date}
      </p>
      <MDXRenderer>{post.body}</MDXRenderer>
      <hr
        style={{
          marginBottom: rhythm(1),
        }}
      />
      <Bio />

      <ul
        style={{
          display: `flex`,
          flexWrap: `wrap`,
          justifyContent: `space-between`,
          listStyle: `none`,
          padding: 0,
        }}
      >
        <li>
          {previous && (
            <Link to={`/blog${previous.fields.slug}`} rel="prev">
              ← {previous.frontmatter.title}
            </Link>
          )}
        </li>
        <li>
          {next && (
            <Link to={`/blog${next.fields.slug}`} rel="next">
              {next.frontmatter.title} →
            </Link>
          )}
        </li>
      </ul>
    </div>
  )
}

BlogPostTemplate.propTypes = {
  props: PropTypes.shape({}),
}

BlogPostTemplate.defaultProps = {
  props: {},
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        thumbnail {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      tableOfContents
    }
  }
`

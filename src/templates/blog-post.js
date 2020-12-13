import React, { useEffect } from 'react'
import { graphql } from 'gatsby'
import { PropTypes } from 'prop-types'
import { useLocation } from '@reach/router'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import ReactGA from 'react-ga'
import { DiscussionEmbed } from 'disqus-react'
import Header from '../components/header'
import Bio from '../components/bio'
import Tags from '../components/tags'
import Archives from '../components/archives'
import SEO from '../components/seo'
import TOC from '../components/toc'
import { styler, breakpoints } from '../theme'
import { rhythm } from '../utils/typography'
import Footer from '../components/footer'

// ------------------------------------
// Styles
// ------------------------------------

const styles = styler({
  root: {
    display: 'flex',
    flexDirection: 'column',
    color: 'var(--textNormal)',
    background: 'var(--bg)',
    backgroundImage: 'var(--bg)',
    transition: 'color 0.2s ease-out, background 0.2s ease-out',
    minHeight: '100vh',
  },
  main: {
    display: 'flex',
    padding: `0 5rem`,
    [breakpoints.tablet]: {
      padding: `0 40px`,
    },
    [breakpoints.phone]: {
      padding: `0 20px`,
    },
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    display: 'inline-block',
    color: 'var(--textLink)',
    fontSize: rhythm(0.7),
  },
  blog: {
    display: 'flex',
    flexDirection: 'column',
  },
  post: {
    width: '100%',
    backgroundImage: 'var(--post)',
    background: 'var(--post)',
    borderRadius: 10,
    padding: 20,
  },
  side: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: rhythm(15),
    [breakpoints.laptop]: {
      display: 'none',
    },
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
// Templates
// ------------------------------------

const BlogPostTemplate = ({ data, location }) => {
  const post = data.mdx
  const siteTitle = data.site.siteMetadata.title
  const tableOfContents = data.mdx.tableOfContents.items
  const imageSource = getImageSource(post)

  // disqus
  const slug = useLocation()
  const { title } = post.frontmatter
  const disqusShortname = process.env.GATSBY_DISQUS_SHORT_NAME
  const disqusConfig = {
    config: { identifier: slug, title },
  }

  // ga
  useEffect(() => {
    const { pathname } = slug || {}
    if (pathname) ReactGA.pageview(pathname)
  }, [slug])

  return (
    <div className={styles.root}>
      <SEO
        image={imageSource}
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <Header location={location} title={siteTitle} />
      <br />
      <div className={styles.main}>
        <div className={styles.blog}>
          <div className={styles.titleContainer}>
            <h1 className={styles.title}>{post.frontmatter.title}</h1>
            <p>{post.frontmatter.date}</p>
          </div>
          <div className={styles.post}>
            <MDXRenderer>{post.body}</MDXRenderer>
            <DiscussionEmbed
              shortname={disqusShortname}
              config={disqusConfig}
            />
          </div>
        </div>
        <div className={styles.side}>
          <Bio />
          <TOC tableOfContents={tableOfContents} />
          <Tags />
          <Archives />
        </div>
      </div>
      <Footer />
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

import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Header from '../components/header'
import Bio from '../components/bio'
import Tags from '../components/tags'
import ArchivesSection from '../components/archives'
import SEO from '../components/seo'
import SearchPosts from '../components/searchPosts'
import { rhythm } from '../utils/typography'
import { styler, colors, breakpoints } from '../theme'

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
    padding: `0 ${rhythm(3)}`,
  },
  title: {
    display: 'inline-block',
    color: 'var(--textNormal)',
    paddingBottom: rhythm(0.5),
    borderBottom: `3px solid ${colors.red}`,
  },
  posts: {
    width: '100%',
    textAlign: 'center',
  },
  side: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: rhythm(15),
    [breakpoints.desktop]: {
      display: 'none',
    },
  },
})

// ------------------------------------
// Helpers
// ------------------------------------

const filterPosts = (postContext, data) => {
  const { start, end } = postContext
  const { edges } = data.allMdx
  return edges.filter(({ node }) => {
    const { postDate } = node.frontmatter
    const postTime = new Date(postDate).getTime()
    const startTime = new Date(start).getTime()
    const endTime = new Date(end).getTime()
    return postTime >= startTime && postTime <= endTime
  })
}

// ------------------------------------
// Component
// ------------------------------------

const Archives = ({ pageContext, navigate, location, data }) => {
  const startDate = new Date(pageContext.end)
  const posts = filterPosts(pageContext, data)
  const { site, localSearchBlog } = data
  const siteTitle = site.siteMetadata.title
  return (
    <div className={styles.root}>
      <SEO title="All posts" />
      <Header location={location} title={siteTitle} />
      <br />
      <div className={styles.main}>
        <div className={styles.posts}>
          <br />
          <h3 className={styles.title}>{`${startDate.getFullYear()}年${
            startDate.getMonth() + 1
          }月の記事 (${posts.length}件)`}</h3>
          <br />
          <br />
          <SearchPosts
            posts={posts}
            localSearchBlog={localSearchBlog}
            navigate={navigate}
            location={location}
          />
        </div>
        <div className={styles.side}>
          <Bio />
          <Tags />
          <ArchivesSection />
        </div>
      </div>
    </div>
  )
}

Archives.propTypes = {
  pageContext: PropTypes.shape({}),
  data: PropTypes.shape({}),
}

Archives.defaultProps = {
  pageContext: {},
  data: {},
}

export default Archives

// ------------------------------------
// Queries
// ------------------------------------

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    localSearchBlog {
      index
      store
    }
    allMdx(limit: 2000, sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            postDate: date
            title
            description
            tags
            categories
            thumbnail {
              childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`

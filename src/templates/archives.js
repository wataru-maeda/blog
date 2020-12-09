import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Base from '../views/base'

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
  const pageTitle = `${startDate.getFullYear()}年${
    startDate.getMonth() + 1
  }月の記事 (${posts.length}件)`
  return (
    <Base
      siteTitle={siteTitle}
      pageTitle={pageTitle}
      posts={posts}
      localSearchBlog={localSearchBlog}
      navigate={navigate}
      location={location}
    />
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

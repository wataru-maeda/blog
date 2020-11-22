import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

// ------------------------------------
// Helpers
// ------------------------------------

const filterPosts = (postContext, data) => {
  const { start, end } = postContext
  const { edges } = data.allMdx
  return edges.filter(({ node }) => {
    const { date } = node.frontmatter
    const postTime = new Date(date).getTime()
    const startTime = new Date(start).getTime()
    const endTime = new Date(end).getTime()
    return postTime >= startTime && postTime <= endTime
  })
}

// ------------------------------------
// Component
// ------------------------------------

const Archives = ({ pageContext, data }) => {
  const posts = filterPosts(pageContext, data)
  console.log('[##] posts', posts)
  return <div>okok</div>
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
    allMdx(limit: 2000, sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date
            postDate: date(formatString: "MMMM DD, YYYY")
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

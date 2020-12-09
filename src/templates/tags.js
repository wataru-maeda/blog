import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Base from '../views/base'

const Tags = ({ pageContext, data, navigate, location }) => {
  const { tag } = pageContext
  const { site, localSearchBlog, allMdx } = data
  const { edges, totalCount } = allMdx
  const siteTitle = site.siteMetadata.title
  const pageTitle = `タグ「${tag.toUpperCase()}」の記事一覧 (${totalCount}件)`
  return (
    <Base
      siteTitle={siteTitle}
      pageTitle={pageTitle}
      posts={edges}
      localSearchBlog={localSearchBlog}
      navigate={navigate}
      location={location}
    />
  )
}

Tags.propTypes = {
  pageContext: PropTypes.shape({}),
  data: PropTypes.shape({}),
}

Tags.defaultProps = {
  pageContext: {},
  data: {},
}

export default Tags

export const pageQuery = graphql`
  query($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    localSearchBlog {
      index
      store
    }
    allMdx(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
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

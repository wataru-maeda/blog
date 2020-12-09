import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import Base from '../pages/base'

const Categories = ({ pageContext, data, navigate, location }) => {
  const { category } = pageContext
  const { site, localSearchBlog, allMdx } = data
  const { edges, totalCount } = allMdx
  const siteTitle = site.siteMetadata.title
  const pageTitle = `カテゴリ「${category.toUpperCase()}」の記事一覧 (${totalCount}件)`
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

Categories.propTypes = {
  pageContext: PropTypes.shape({}),
  data: PropTypes.shape({}),
}

Categories.defaultProps = {
  pageContext: {},
  data: {},
}

export default Categories

export const pageQuery = graphql`
  query($category: String) {
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
      filter: { frontmatter: { categories: { in: [$category] } } }
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

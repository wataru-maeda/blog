import React from 'react'
import { graphql } from 'gatsby'
import Base from './base'

const IndexPage = ({ data, navigate, location }) => {
  const { allMdx, site, localSearchBlog } = data
  const siteTitle = site.siteMetadata.title
  const { edges, totalCount } = allMdx
  const pageTitle = `すべての記事 (${totalCount}件)`
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

export default IndexPage

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
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
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

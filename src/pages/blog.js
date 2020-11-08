import React from 'react'
import { graphql } from 'gatsby'

// import Bio from "../components/bio"
import Layout from '../components/layout'
import SEO from '../components/seo'
// import Button from '../components/button'
import SearchPosts from '../components/searchPosts'

const Blog = ({ data, navigate, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMdx.edges
  const { localSearchBlog } = data

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      {/* <Bio /> */}
      <SearchPosts
        posts={posts}
        localSearchBlog={localSearchBlog}
        navigate={navigate}
        location={location}
      />
    </Layout>
  )
}

export default Blog

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

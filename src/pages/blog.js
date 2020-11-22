import React from 'react'
import { graphql } from 'gatsby'

import Bio from '../components/bio'
import SEO from '../components/seo'
import SearchPosts from '../components/searchPosts'
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

const Blog = ({ data, navigate, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMdx.edges
  const { localSearchBlog } = data
  console.log('[##] site title', siteTitle)

  return (
    <div className={styles.root}>
      <SEO title="All posts" />
      <Bio />
      <SearchPosts
        posts={posts}
        localSearchBlog={localSearchBlog}
        navigate={navigate}
        location={location}
      />
    </div>
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

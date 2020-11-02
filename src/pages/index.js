import React from "react"
import { graphql } from "gatsby"

// import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Post from "../components/post"
import SearchPosts from "../components/searchPosts"

const styles = {
  root: {
    display: "flex",
    width: "100%",
  },
}

class IndexPage extends React.Component {
  render() {
    const { data, navigate, location } = this.props
    const siteTitle = "KISS ブログ"
    const posts = data.allMdx.edges
    const localSearchBlog = data.localSearchBlog
    const props = {
      date: "10/10",
      title: "test",
      description: "ogsogosgoso",
      excerpt: "/test",
      slug: "/test",
    }

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All posts" />
        <div style={styles.root}>
          <Post {...props} />
          <Post {...props} />
          <Post {...props} />
        </div>
        <SearchPosts
          posts={posts}
          localSearchBlog={localSearchBlog}
          navigate={navigate}
          location={location}
        />
      </Layout>
    )
  }
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

import React from "react"
import { graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Post from "../components/post"
import SearchPosts from "../components/searchPosts"

const styles = {
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
}

const whiteColors = {
  // -webkit-font-smoothing: 'antialiased';
  bg: "white",
  post: "white",
  textNormal: "#282a37",
  textLink: "#0372eb",
  shadow: `0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12)`,
  hr: `hsla(0, 0%, 100%, 0.2)`,
  backgroundColor: "var(--bg)",
}

const switchTheme = () => {
  Object.keys(whiteColors).forEach(key => {
    const cssKey = `--${key}`
    const cssVal = whiteColors[key]
    document.body.style.setProperty(cssKey, cssVal)
  })
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
        <button onClick={switchTheme}>test</button>
        <div style={styles.root}>
          <Post {...props} />
          <Post {...props} />
          <Post {...props} />
        </div>
        <Bio />
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
          }
        }
      }
    }
  }
`

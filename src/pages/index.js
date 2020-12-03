import React from 'react'
import { graphql } from 'gatsby'
import Header from '../components/header'
import SideMenu from '../components/sideMenu'
import Bio from '../components/bio'
import Tags from '../components/tags'
import Archives from '../components/archives'
import SEO from '../components/seo'
import SearchPosts from '../components/searchPosts'
import Footer from '../components/footer'
import { rhythm } from '../utils/typography'
import { styler, colors, breakpoints } from '../theme'

const styles = styler({
  root: {
    display: 'flex',
    flexDirection: 'column',
    color: 'var(--textNormal)',
    transition: 'color 0.2s ease-out, background 0.2s ease-out',
    minHeight: '100vh',
    backgroundImage: colors.gray_to_gray,
    background: 'var(--bg)',
  },
  main: {
    display: 'flex',
    padding: `0 5rem`,
    [breakpoints.tablet]: {
      padding: `0 40px`,
    },
    [breakpoints.phone]: {
      padding: `0 20px`,
    },
  },
  title: {
    display: 'inline-block',
    color: 'var(--textNormal)',
    paddingBottom: rhythm(0.5),
    borderBottom: `3px solid ${colors.red}`,
    fontSize: rhythm(0.7),
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
    [breakpoints.laptop]: {
      display: 'none',
    },
  },
})

const IndexPage = ({ data, navigate, location }) => {
  const { allMdx, site, localSearchBlog } = data
  const siteTitle = site.siteMetadata.title
  const { edges, totalCount } = allMdx
  const pageTitle = `すべての記事 (${totalCount}件)`
  return (
    <div className={styles.root}>
      <SEO title={pageTitle} />
      <SideMenu />
      <span id="outer-container">
        <Header location={location} title={siteTitle} />
        <br />
        <div id="page-wrap" className={styles.main}>
          <div className={styles.posts}>
            <h1 className={styles.title}>{pageTitle}</h1>
            <br />
            <SearchPosts
              posts={edges}
              localSearchBlog={localSearchBlog}
              navigate={navigate}
              location={location}
            />
          </div>
          <div className={styles.side}>
            <Bio />
            <Tags />
            <Archives />
          </div>
        </div>
        <Footer />
      </span>
    </div>
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

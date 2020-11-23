import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Header from '../components/header'
import Bio from '../components/bio'
import TagsSection from '../components/tags'
import ArchivesSection from '../components/archives'
import SEO from '../components/seo'
import SearchPosts from '../components/searchPosts'
import { rhythm } from '../utils/typography'
import { styler, colors, breakpoints } from '../theme'

const styles = styler({
  root: {
    display: 'flex',
    flexDirection: 'column',
    color: 'var(--textNormal)',
    background: 'var(--bg)',
    backgroundImage: 'var(--bg)',
    transition: 'color 0.2s ease-out, background 0.2s ease-out',
    minHeight: '100vh',
  },
  main: {
    display: 'flex',
    padding: `0 ${rhythm(3)}`,
  },
  title: {
    display: 'inline-block',
    color: 'var(--textNormal)',
    paddingBottom: rhythm(0.5),
    borderBottom: `3px solid ${colors.red}`,
    fontSize: rhythm(0.9),
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
    [breakpoints.desktop]: {
      display: 'none',
    },
  },
})

const Tags = ({ pageContext, data, navigate, location }) => {
  const { tag } = pageContext
  const { site, localSearchBlog, allMdx } = data
  const { edges, totalCount } = allMdx
  const siteTitle = site.siteMetadata.title
  const pageTitle = `タグ「${tag.toUpperCase()}」の記事一覧 (${totalCount}件)`

  return (
    <div className={styles.root}>
      <SEO title={pageTitle} />
      <Header location={location} title={siteTitle} />
      <br />
      <div className={styles.main}>
        <div className={styles.posts}>
          <br />
          <h1 className={styles.title}>{pageTitle}</h1>
          <br />
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
          <TagsSection />
          <ArchivesSection />
        </div>
      </div>
    </div>
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

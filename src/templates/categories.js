import React from 'react'
import PropTypes from 'prop-types'

// Components
import { Link, graphql } from 'gatsby'

const Categories = ({ pageContext, data }) => {
  const { category } = pageContext
  const { edges, totalCount } = data.allMdx
  const categoryHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged with "${category}"`

  return (
    <div>
      <h1>{categoryHeader}</h1>
      <ul>
        {edges.map(({ node }) => {
          const { slug } = node.fields
          const { title } = node.frontmatter
          return (
            <li key={slug}>
              <Link to={`/blog${slug}`}>{title}</Link>
            </li>
          )
        })}
      </ul>
      <Link to="/categories">All categories</Link>
    </div>
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
            title
          }
        }
      }
    }
  }
`

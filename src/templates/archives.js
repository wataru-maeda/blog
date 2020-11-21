import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
const Archives = ({ pageContext, data }) => {
  console.log('[##] pageContext', pageContext)
  console.log('[##] data', data)
  return <div>okok</div>
}

Archives.propTypes = {
  pageContext: PropTypes.shape({}),
  data: PropTypes.shape({}),
}

Archives.defaultProps = {
  pageContext: {},
  data: {},
}

export default Archives

export const pageQuery = graphql`
  query($start: Date, $end: Date) {
    allMdx(
      limit: 200
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { date: { gte: $start, lt: $end } } }
    ) {
      totalCount
      edges {
        node {
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

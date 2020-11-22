import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import SEO from '../components/seo'
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

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  console.log('[##] site title', siteTitle)
  console.log('[##] location', location)
  return (
    <div className={styles.root}>
      <SEO title="404: Not Found" />
      <h1>Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </div>
  )
}

NotFoundPage.propTypes = {
  props: PropTypes.shape({}),
}

NotFoundPage.defaultProps = {
  props: {},
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

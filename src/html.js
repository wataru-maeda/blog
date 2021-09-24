import React from 'react'
import PropTypes from 'prop-types'
import './theme/app.css'
import { images, colors } from './theme'

const HTML = ({
  htmlAttributes,
  headComponents,
  bodyAttributes,
  preBodyComponents,
  postBodyComponents,
  body,
}) => {
  return (
    <html lang="ja" {...htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link
          type="application/opensearchdescription+xml"
          rel="search"
          href="opensearch.xml"
        />
        {headComponents}
      </head>
      <body {...bodyAttributes}>
        {preBodyComponents}
        <div
          key="loader"
          id="___loader"
          style={{
            alignItems: 'center',
            backgroundColor: colors.gray_dark,
            display: 'flex',
            justifyContent: 'center',
            position: 'absolute',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            zIndex: 100,
          }}
        >
          <img
            src={images.earth}
            alt="loading spinner"
            width="100"
            height="100"
          />
        </div>
        <div
          key="body"
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: body }}
        />
        {postBodyComponents}
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.shape({}),
  headComponents: PropTypes.arrayOf(PropTypes.shape({})),
  bodyAttributes: PropTypes.shape({}),
  preBodyComponents: PropTypes.arrayOf(PropTypes.shape({})),
  body: PropTypes.string,
  postBodyComponents: PropTypes.arrayOf(PropTypes.shape({})),
}

HTML.defaultProps = {
  htmlAttributes: {},
  headComponents: [{}],
  bodyAttributes: {},
  preBodyComponents: [{}],
  body: '',
  postBodyComponents: [{}],
}

export default HTML

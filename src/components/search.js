import React from 'react'
import { PropTypes } from 'prop-types'
import Connector from '../utils/connector'
import { rhythm } from '../utils/typography'
import { colors, styler } from '../theme'

const styles = styler({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottom: `${rhythm(1 / 6)} solid ${colors.green}`,
    marginBottom: 0,
  },
  search: {
    width: 20,
    fill: colors.gray_light,
    marginRight: rhythm(1 / 4),
  },
  input: {
    color: 'var(--textNormal)',
    background: 'transparent',
    border: 'none',
  },
})

const Search = ({ actions, keyword }) => {
  // ------------------------------------
  // Actions
  // ------------------------------------
  const onChange = ({ target: { value } }) => {
    actions.updateKeyword(value)
  }

  // ------------------------------------
  // Renderings
  // ------------------------------------
  return (
    <div className={styles.root}>
      <svg
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className={styles.search}
      >
        <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
      </svg>
      <input
        value={keyword}
        onChange={onChange}
        placeholder="記事を検索"
        className={styles.input}
      />
    </div>
  )
}

Search.propTypes = {
  action: PropTypes.shape({}),
  keyword: PropTypes.string,
}

Search.defaultProps = {
  action: {},
  keyword: '',
}

export default (props) => (
  <Connector>
    {({
      actions,
      state: {
        search: { keyword },
      },
    }) => <Search actions={actions.search} keyword={keyword} {...props} />}
  </Connector>
)

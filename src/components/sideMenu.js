import React from 'react'
import { PropTypes } from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import { stack as Elastic } from 'react-burger-menu'
import { rhythm } from '../utils/typography'
import Tags from './tags'
import Archives from './archives'
import { rem, styler } from '../theme'
import Connector from '../utils/connector'

// ------------------------------------
// Styles
// ------------------------------------

const styles = styler({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: '100%',
  },
  header: {
    margin: `0 0 ${rhythm(0.6)}`,
    color: 'var(--textNormal)',
    textAlign: 'center',
  },
  button: {
    borderRadius: 3,
    background: 'transparent',
    outline: 'none',
    border: 'none',
    cursor: 'pointer',
    marginBottom: 10,
    '&:focus': {
      outline: 0,
      boxShadow: 'none',
    },
  },
  buttonTitle: {
    fontSize: 18,
    color: 'var(--textLink)',
    margin: 0,
    padding: 0,
  },
  items: {
    marginLeft: 0,
    marginTop: 20,
    width: 270,
    boxShadow: 'none',
  },
})

const menuStyles = rem({
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    left: '36px',
    top: '36px',
    display: 'none',
  },
  bmCrossButton: {
    height: '24px',
    width: '24px',
    margin: 8,
  },
  bmCross: {
    background: 'white',
  },
  bmMenu: {
    padding: '2.5em 0 1.5em 0',
    fontSize: '1.15em',
    background: 'var(--sideMenuBackground)',
  },
  bmMorphShape: {
    fill: 'black',
  },
  bmItemList: {
    padding: '0.8em',
  },
  bmItem: {
    outline: 0,
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)',
  },
})

// ------------------------------------
// Component
// ------------------------------------

const Button = ({ label, onClick }) => (
  <button type="button" className={styles.button} onClick={onClick}>
    <p className={styles.buttonTitle}>{label}</p>
  </button>
)

// ------------------------------------
// Subview
// ------------------------------------

const SideMenu = ({ actions, isOpen }) => ({ categoriesGroup: { group } }) => {
  // rendering
  return (
    <Elastic
      left
      isOpen={isOpen}
      styles={menuStyles}
      pageWrapId="page-wrap"
      outerContainerId="outer-container"
      onStateChange={(newState) => {
        actions.setSideMenuOpen(newState.isOpen)
      }}
    >
      <div className={styles.root}>
        <h4 className={styles.header}>カテゴリ一覧</h4>
        <Button label="Home" onClick={() => null} />
        {Array.isArray(group) &&
          group.map(({ fieldValue }) => (
            <Button label={fieldValue} onClick={() => null} />
          ))}
        <br />
        <Tags className={styles.items} />
        <Archives className={styles.items} />
      </div>
    </Elastic>
  )
}

SideMenu.propTypes = {
  style: PropTypes.shape({}),
}

SideMenu.defaultProps = {
  style: {},
}

const sideMenuQuery = graphql`
  query {
    categoriesGroup: allMdx(limit: 2000) {
      group(field: frontmatter___categories) {
        fieldValue
      }
    }
  }
`

export default (props) => (
  <Connector>
    {({ actions, state: { app } }) => (
      <StaticQuery
        query={sideMenuQuery}
        render={SideMenu({
          ...props,
          actions: actions.app,
          isOpen: app.isOpen,
        })}
      />
    )}
  </Connector>
)

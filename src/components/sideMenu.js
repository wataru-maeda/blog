import React from 'react'
import { PropTypes } from 'prop-types'
import { stack as Elastic } from 'react-burger-menu'
// import { styler, images, colors } from '../theme'
import { rem } from '../theme'
import Connector from '../utils/connector'

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
    background: 'black',
    padding: '2.5em 0 1.5em 0',
    fontSize: '1.15em',
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

const SideMenu = ({ actions, isOpen }) => {
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
      <span>Hello side menu</span>
    </Elastic>
  )
}

SideMenu.propTypes = {
  style: PropTypes.shape({}),
}

SideMenu.defaultProps = {
  style: {},
}

export default (props) => (
  <Connector>
    {({ actions, state: { app } }) => (
      <SideMenu actions={actions.app} isOpen={app.isOpen} {...props} />
    )}
  </Connector>
)

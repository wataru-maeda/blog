import React from 'react'
import { PropTypes } from 'prop-types'
import { styler } from '../theme'
import { rhythm } from '../utils/typography'

const styles = styler({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    background: 'var(--footerBg)',
    padding: `${rhythm(0.5)} ${rhythm(3)}}`,
    width: '100%',
    borderTop: `1px solid white`,
  },
  copyRight: {
    fontSize: rhythm(0.5),
    color: 'white',
    margin: 0,
    padding: 0,
  },
})

const footer = ({ className, style }) => (
  <div className={`${styles.root} ${className}`} style={style}>
    <span />
    <p
      className={styles.copyRight}
    >{`© ${new Date().getFullYear()} Wataru Maeda`}</p>
  </div>
)

footer.propTypes = {
  className: PropTypes.string,
  style: PropTypes.shape({}),
}

footer.defaultProps = {
  className: '',
  style: {},
}

export default footer

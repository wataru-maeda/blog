import React from 'react'
import { PropTypes } from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEnvelope,
  faGlobe,
  faHashtag,
  faHome,
} from '@fortawesome/free-solid-svg-icons'
import {
  faGithub,
  faTwitter,
  faFacebook,
} from '@fortawesome/free-brands-svg-icons'

const icons = {
  email: faEnvelope,
  website: faGlobe,
  github: faGithub,
  twitter: faTwitter,
  facebook: faFacebook,
  hashtag: faHashtag,
  home: faHome,
}

const Icon = ({ name, className, style }) => (
  <FontAwesomeIcon icon={icons[name]} className={className} style={style} />
)

Icon.propTypes = {
  className: PropTypes.string,
  style: PropTypes.shape({}),
}

Icon.defaultProps = {
  className: '',
  style: {},
}

export default Icon

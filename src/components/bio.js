import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'
import Icon from './icon'

import { rhythm } from '../utils/typography'
import { styler } from '../theme'
import '../theme/app.css'

const styles = styler({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundImage: 'var(--post)',
    background: 'var(--post)',
    borderRadius: rhythm(0.3),
    width: rhythm(14),
    marginLeft: rhythm(2),
    padding: rhythm(0.6),
  },
  profile: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: rhythm(0.4),
  },
  snsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const Bio = (data) => {
  const { author, social } = data.site.siteMetadata
  return (
    <div className={styles.root}>
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author}
        className={styles.profile}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />
      <p style={{ textAlign: 'center' }}>
        Lorem ipsum is placeholder text commonly used in the graphic, print, and
        publishing industries for previewing layouts and visual mockups.
      </p>
      <div className={styles.snsContainer}>
        {Object.keys(social).map((key) => {
          let uri
          switch (key) {
            case 'email':
              uri = `mailto: ${social[key]}`
              break
            case 'github':
              uri = `https://github.com/${social[key]}`
              break
            case 'twitter':
              uri = `https://twitter.com/${social[key]}`
              break
            case 'facebook':
              uri = `https://www.facebook.com/profile.php?id=${social[key]}`
              break
            case 'website':
              uri = social[key]
              break
            default:
              break
          }
          return (
            <a href={uri} target="_blank" rel="noreferrer" className="sns-link">
              <Icon
                name={key}
                style={{ color: 'var(--snsLink)', margin: `0 ${rhythm(0.4)}` }}
              />
            </a>
          )
        })}
      </div>
    </div>
  )
}

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        social {
          twitter
          facebook
          github
          website
          email
        }
      }
    }
  }
`

export default () => <StaticQuery query={bioQuery} render={Bio} />

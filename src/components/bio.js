import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faGlobe } from "@fortawesome/free-solid-svg-icons"
import {
  faGithub,
  faTwitter,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons"
import Image from "gatsby-image"

import { rhythm } from "../utils/typography"
import "../theme/app.css"

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundImage: "var(--post)",
    background: "var(--post)",
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}

const Bio = data => {
  const { author, social } = data.site.siteMetadata
  return (
    <div style={styles.root}>
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author}
        style={styles.profile}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />
      <p style={{ textAlign: "center" }}>
        Lorem ipsum is placeholder text commonly used in the graphic, print, and
        publishing industries for previewing layouts and visual mockups.
      </p>
      <div style={styles.snsContainer}>
        {Object.keys(social).map(key => {
          let icon
          let uri
          switch (key) {
            case "email":
              icon = faEnvelope
              uri = `mailto: ${social[key]}`
              break
            case "github":
              icon = faGithub
              uri = `https://github.com/${social[key]}`
              break
            case "twitter":
              icon = faTwitter
              uri = `https://twitter.com/${social[key]}`
              break
            case "facebook":
              icon = faFacebook
              uri = `https://www.facebook.com/profile.php?id=${social[key]}`
              break
            case "website":
              icon = faGlobe
              uri = social[key]
              break
            default:
              break
          }
          return (
            <a href={uri} target="_blank" className="sns-link">
              <FontAwesomeIcon
                icon={icon}
                style={{ color: "white", margin: `0 ${rhythm(0.4)}` }}
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

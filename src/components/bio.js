import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

import { rhythm } from "../utils/typography"

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
    padding: rhythm(0.4),
  },
  profile: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: rhythm(0.4),
  },
}

const Bio = data => {
  const { author, social } = data.site.siteMetadata
  console.log("[##] social", social)
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
      <p>
        Lorem ipsum is placeholder text commonly used in the graphic, print, and
        publishing industries for previewing layouts and visual mockups.
      </p>
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
          github
          email
        }
      }
    }
  }
`

export default () => <StaticQuery query={bioQuery} render={Bio} />

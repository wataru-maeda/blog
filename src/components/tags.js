import React from "react"
import { Link } from "gatsby"
import { StaticQuery, graphql } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHashtag } from "@fortawesome/free-solid-svg-icons"
import kebabCase from "lodash/kebabCase"
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
    marginTop: rhythm(1),
    padding: rhythm(0.6),
  },
  tagContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  header: {
    margin: `0 0 ${rhythm(0.6)}`,
  },
  tag: {
    padding: `${rhythm(0.1)} ${rhythm(0.4)}`,
    borderRadius: 20,
    backgroundColor: "var(--tagBg)",
    margin: rhythm(0.15),
  },
  link: {
    color: "var(--textNormal)",
    textDecoration: "none",
    boxShadow: "none",
  },
}

const Tags = ({ tags }) => {
  const { group } = tags
  return (
    <div style={styles.root}>
      <h4 style={styles.header}>タグ一覧</h4>
      <div style={styles.tagContainer}>
        {group.map(({ fieldValue }) => (
          <span style={styles.tag}>
            <Link to={`/tags/${kebabCase(fieldValue)}/`} style={styles.link}>
              <FontAwesomeIcon
                icon={faHashtag}
                style={{ color: "var(--snsLink)", marginRight: rhythm(0.2) }}
              />
              {fieldValue}
            </Link>
          </span>
        ))}
      </div>
    </div>
  )
}

const tagsQuery = graphql`
  query {
    tags: allMdx(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
      }
    }
  }
`

export default () => <StaticQuery query={tagsQuery} render={Tags} />

import React, { useState, useEffect } from "react"
import { useFlexSearch } from "react-use-flexsearch"
import * as queryString from "query-string"

import Post from "./post"
import { rhythm } from "../utils/typography"
import Connector from "../utils/connector"

const SearchedPosts = ({ results }) =>
  results.length > 0 ? (
    results.map(node => {
      const props = {
        date: node.date,
        title: node.title || node.slug,
        description: node.description,
        excerpt: node.excerpt,
        slug: node.slug,
      }
      return <Post {...props} />
    })
  ) : (
    <p style={{ textAlign: "center" }}>
      Sorry, couldn't find any posts matching this search.
    </p>
  )

const AllPosts = ({ posts }) => (
  <div style={{ margin: `${rhythm(1)} 0 ${rhythm(2)}` }}>
    {posts.map(({ node }) => {
      const props = {
        date: node.frontmatter.date,
        title: node.frontmatter.title || node.fields.slug,
        description: node.frontmatter.description,
        excerpt: node.frontmatter.excerpt,
        slug: node.fields.slug,
        thumbnail: node.frontmatter.thumbnail,
      }
      return <Post {...props} />
    })}
  </div>
)

const SearchPosts = ({
  posts,
  localSearchBlog,
  location,
  navigate,
  keyword,
}) => {
  const { search } = queryString.parse(location.search)
  const [query, setQuery] = useState(search || "")

  const results = useFlexSearch(
    query,
    localSearchBlog.index,
    JSON.parse(localSearchBlog.store)
  )

  useEffect(() => {
    navigate(keyword ? `/blog/?search=${keyword}` : "/blog/")
    setQuery(keyword)
  }, [keyword])

  return query ? (
    <SearchedPosts results={results} />
  ) : (
    <AllPosts posts={posts} />
  )
}

export default props => (
  <Connector>
    {({
      state: {
        search: { keyword },
      },
    }) => <SearchPosts keyword={keyword} {...props} />}
  </Connector>
)

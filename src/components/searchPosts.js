import React, { useState, useEffect } from 'react'
import { useFlexSearch } from 'react-use-flexsearch'
import * as queryString from 'query-string'

import Post from './post'
import Connector from '../utils/connector'

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    width: '100%',
  },
}

const SearchedPosts = ({ results }) => (
  <>
    {results.length > 0 ? (
      results.map((node) => {
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
      <p style={{ textAlign: 'center' }}>
        Sorry, couldn't find any posts matching this search.
      </p>
    )}
  </>
)

const AllPosts = ({ posts }) => (
  <>
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
  </>
)

const SearchPosts = ({
  posts,
  localSearchBlog,
  location,
  navigate,
  keyword,
}) => {
  const { search } = queryString.parse(location.search)
  const [query, setQuery] = useState(search || '')

  const results = useFlexSearch(
    query,
    localSearchBlog.index,
    JSON.parse(localSearchBlog.store),
  )

  useEffect(() => {
    navigate(keyword ? `?search=${keyword}` : '/')
    setQuery(keyword)
  }, [keyword])

  return (
    <div style={styles.root}>
      {query ? <SearchedPosts results={results} /> : <AllPosts posts={posts} />}
    </div>
  )
}

export default (props) => (
  <Connector>
    {({
      state: {
        search: { keyword },
      },
    }) => <SearchPosts keyword={keyword} {...props} />}
  </Connector>
)

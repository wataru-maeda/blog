import React, { useState, useEffect } from 'react'
import { useFlexSearch } from 'react-use-flexsearch'
import * as queryString from 'query-string'

import Post from './post'
import { styler } from '../theme'
import Connector from '../utils/connector'

const styles = styler({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    width: '100%',
  },
})

const SearchedPosts = ({ results }) => (
  <>
    {results.length > 0 ? (
      results.map((node) => {
        console.log('[##] node', node)
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
        Sorry, couldn&apos;t find any posts matching this search.
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
        tags: node.frontmatter.tags,
        categories: node.frontmatter.categories,
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
    <div className={styles.root}>
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

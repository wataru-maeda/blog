const path = require(`path`)
const _ = require('lodash')
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const tagTemplate = path.resolve('src/templates/tags.js')
  const categoryTemplate = path.resolve('src/templates/categories.js')
  const archivedTemplate = path.resolve('src/templates/archives.js')

  return graphql(
    `
      {
        allMdx(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                year: date(formatString: "YYYY")
                month: date(formatString: "MM")
              }
            }
          }
        }
        tagsGroup: allMdx(limit: 1000) {
          group(field: frontmatter___tags) {
            fieldValue
          }
        }
        categoriesGroup: allMdx(limit: 1000) {
          group(field: frontmatter___categories) {
            fieldValue
          }
        }
      }
    `,
  ).then((result) => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.allMdx.edges

    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node

      createPage({
        path: `${post.node.fields.slug}`,
        component: blogPost,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    })

    // Extract tag data from query
    const tags = result.data.tagsGroup.group
    const categories = result.data.categoriesGroup.group

    // create tag pages
    tags.forEach((tag) => {
      createPage({
        path: `/tags/${_.kebabCase(tag.fieldValue)}/`,
        component: tagTemplate,
        context: {
          tag: tag.fieldValue,
        },
      })
    })

    // create category page
    categories.forEach((category) => {
      createPage({
        path: `/categories/${_.kebabCase(category.fieldValue)}/`,
        component: categoryTemplate,
        context: {
          category: category.fieldValue,
        },
      })
    })

    // create archive pages
    // https://qiita.com/kyohei8/items/c112a49359e9ca360393
    const yymms = posts.map(
      ({ node: { frontmatter } }) => `${frontmatter.year}-${frontmatter.month}`,
    )
    const uniques = [...new Set(yymms)]
    uniques.map((yymm) => {
      const year = yymm.split('-')[0]
      const month = yymm.split('-')[1]
      const lastDayOfMonth = new Date(year, month, 0)
      const start = new Date(`${year}-${month}-01T00:00:00.000Z`)
      const end = new Date(
        `${year}-${month}-${lastDayOfMonth.getDate()}T23:59:59.999Z`,
      )
      createPage({
        path: `/archives/${year}/${month}/`,
        component: archivedTemplate,
        context: {
          start,
          end,
        },
      })
    })

    return null
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

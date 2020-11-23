module.exports = {
  siteMetadata: {
    title: `KISS ブログ`,
    author: `Wataru Maeda`,
    description: `シンプルにわかりやすく書いたテックブログ`,
    siteUrl: `https://kiss-blog.netlify.app/`,
    social: {
      twitter: `wmaeda_ca`,
      facebook: `100011319736559`,
      github: `WataruMaeda`,
      website: `https://watarumaeda.com/`,
      email: `w.maeda.jp@gmail.com`,
    },
  },
  plugins: [
    'gatsby-plugin-dark-mode',
    `gatsby-plugin-netlify-cms`,
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-remark`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-plugin-local-search',
      options: {
        name: 'blog',
        engine: 'flexsearch',
        engineOptions: {
          encode: 'icase',
          tokenize: 'forward',
          async: false,
        },
        query: `
          {
            allMdx {
              nodes {
                id
                fields { slug }
                excerpt
                rawBody
                frontmatter {
                  title
                  description
                  date(formatString: "MMMM DD, YYYY")
                  tags
                  categories
                }
              }
            }
          }
        `,
        ref: 'id',
        index: ['title', 'rawBody'],
        store: [
          'id',
          'slug',
          'date',
          'title',
          'excerpt',
          'description',
          'tags',
          'categories',
        ],
        normalizer: ({ data }) =>
          data.allMdx.nodes.map((node) => ({
            id: node.id,
            slug: node.fields.slug,
            rawBody: node.rawBody,
            excerpt: node.excerpt,
            title: node.frontmatter.title,
            description: node.frontmatter.description,
            date: node.frontmatter.date,
            tags: node.frontmatter.tags,
            categories: node.frontmatter.categories,
          })),
      },
    },
    `gatsby-plugin-feed-mdx`,
    `gatsby-plugin-root-import`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-remark-vscode`,
          },
          {
            resolve: `gatsby-remark-copy-linked-files`,
          },
          {
            resolve: `gatsby-remark-smartypants`,
          },
        ],
        plugins: [`gatsby-remark-images`],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `G-WZQ8MEE3P8`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `KISS ブログ`,
        short_name: `KISS`,
        start_url: `/blog`,
        icon: `content/assets/gatsby-icon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `kiss-4`,
      },
    },
  ],
}

const resolveConfig = require("tailwindcss/resolveConfig")
const tailwindConfig = require("./tailwind.config.js")
const fullConfig = resolveConfig(tailwindConfig)

module.exports = {
  siteMetadata: {
    title: `Deno Indonesia`,
    description: `Deno Indonesia adalah pengembang komunitas Deno runtime.`,
    author: `@dannyeka`,
    social: [
      {
        name: `twitter`,
        url: `https://twitter.com/LandDeno`,
      },
      {
        name: `author`,
        url: `https://ekaprasetia.com`,
      },
    ],
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        // background_color: `#663399`,
        // theme_color: `#663399`,
        background_color: fullConfig.theme.colors.white,
        theme_color: fullConfig.theme.colors.teal["400"],
        display: `minimal-ui`,
        icon: `src/images/deno.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          require(`tailwindcss`)(tailwindConfig),
          // require(`autoprefixer`),
          ...(process.env.NODE_ENV === `production`
            ? [require(`cssnano`)]
            : []),
        ],
      },
    },

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}

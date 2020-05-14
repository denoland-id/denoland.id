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
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/deno.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,

    // Plugin blog
    {
      resolve: `gatsby-theme-blog`,
      options: {
        // basePath defaults to `/`
        basePath: `/blog`,
        //contentPath: `content/posts`,
        //assetPath: `assets`,
        //mdxOtherwiseConfigured: true,
      },
    },
  ],
}

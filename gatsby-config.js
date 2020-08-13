const activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development"
console.log(`!!! ACTIVE_ENV: ${activeEnv}`)

require("dotenv").config({
  path: `.env.${activeEnv}`,
})

const targetAddress = new URL(process.env.TARGET_ADDRESS || `https://joshellington.com`);

module.exports = {
  siteMetadata: {
    title: `Josh Ellington`,
    description: `joshellington.com`,
    author: `@joshellington`,
    siteUrl: `https://joshellington.com`,
  },
  plugins: [
    { resolve: `gatsby-plugin-react-helmet` },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "fonts",
        path: `${__dirname}/src/fonts/`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    { resolve: "gatsby-plugin-sass" },
    {
      resolve: "gatsby-plugin-canonical-urls",
      options: {
        siteUrl: targetAddress.href.slice(0, -1)
      }
    },
  ]
}

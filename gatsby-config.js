const activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development"
console.log(`!!! ACTIVE_ENV: ${activeEnv}`)

require("dotenv").config({
  path: `.env.${activeEnv}`,
})

const targetAddress = new URL(
  process.env.TARGET_ADDRESS || `https://votebymail2020.us`
)

module.exports = {
  siteMetadata: {
    title: `VoteByMail2020.us`,
    description: `Learn how your state votes by mail in 2020.`,
    author: `@joshellington`,
    siteUrl: `https://votebymail2020.us`,
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

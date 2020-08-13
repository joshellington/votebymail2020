// See: https://www.gatsbyjs.org/docs/node-apis/

const express = require("express")

exports.onCreateDevServer = ({ app }) => {
  app.use(express.static("public"))
}

import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Layout = ({ mainClass, children }) => {
  const data = useStaticQuery(graphql`
    query SiteGlobalQuery {
      site: site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <main className={mainClass}>{children}</main>
    </>
  )
}

export default Layout
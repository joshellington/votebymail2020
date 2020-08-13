import React from "react"

const Layout = ({ mainClass, children }) => {
  return (
    <>
      <main className={mainClass}>{children}</main>
    </>
  )
}

export default Layout
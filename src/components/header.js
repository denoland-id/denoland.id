import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
// import { darkgrey } from "color-name"

const Header = ({ siteTitle }) => (
  <header className="bg-black">
    <div className="flex justify-center p-4 md:p-4">
      <h1 className="font-bold text-4xl flex items-center text-white no-underline">
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header

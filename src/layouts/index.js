import * as PropTypes from "prop-types"
import React from "react"
import HomeIcon from "react-icons/lib/fa/Home"
import { Link, PageRenderer } from "gatsby"

// Load the css for the Space Mono font.
import "typeface-space-mono"

import CustomModal from "../components/Modal"

import "./Layout.scss"

let windowWidth

class Layout extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    isModal: PropTypes.bool,
  }

  render() {
    const { location } = this.props
    let isModal = false
    if (!windowWidth && typeof window !== `undefined`) {
      windowWidth = window.innerWidth
    }
    if (this.props.isModal && windowWidth > 750) {
      isModal = true
    }

    if (isModal && CustomModal) {
      return (
        <React.Fragment>
          <PageRenderer location={{ pathname: `/` }} />
          <CustomModal isOpen={true} location={location}>
            {this.props.children}
          </CustomModal>
        </React.Fragment>
      )
    }

    return (
      <div className="layoutWrapper">
        <div className="bg">
          <div className="containerHeader">
            <Link to="/" className="homeLink">
              <h1>
                <HomeIcon className="homeIcon" />
                <span className="title">ImageGallery</span>
              </h1>
            </Link>
            <Link to="/about/" className="aboutLink">
              About
            </Link>
          </div>
        </div>
        <div className="containerBody">{this.props.children}</div>
      </div>
    )
  }
}

export default Layout

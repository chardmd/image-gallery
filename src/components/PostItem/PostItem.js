import * as PropTypes from "prop-types"
import React, { useState } from "react"
import GroupIcon from "react-icons/lib/fa/group"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"

import "./PostItem.scss"

let touched = false

const propTypes = {
  post: PropTypes.shape({
    smallImage: PropTypes.object,
    likes: PropTypes.number,
    id: PropTypes.string.isRequired,
  }).isRequired,
}

const Post = ({ post }) => {
  const [hovering, setHovering] = useState(false)
  const { smallImage, likes, id } = post
  const { small } = smallImage.childImageSharp
  return (
    <Link
      to={`/${id}/`}
      onTouchStart={() => (touched = true)}
      onMouseEnter={() => {
        if (!touched) {
          setHovering(true)
        }
      }}
      onMouseLeave={() => {
        if (!touched) {
          setHovering(false)
        }
      }}
      className="PostItem"
    >
      <div className="imageWrapper">
        <Img fluid={{ ...small }} className="imageItem" />
        <div className="pad" />
      </div>
      {/* overlay */}
      {hovering && (
        <div className="likes">
          <GroupIcon className="groupIcon" />
          {` `}
          {likes}
        </div>
      )}
    </Link>
  )
}

export default Post

export const postFragment = graphql`
  fragment Post_details on PostsJson {
    id
    likes
    smallImage: image {
      childImageSharp {
        small: fluid(maxWidth: 292, maxHeight: 292) {
          src
          srcSet
          aspectRatio
          sizes
          tracedSVG
        }
      }
    }
  }
`

import React from "react";

import { graphql } from "gatsby";

import "./Post-Detail.scss";

class PostDetail extends React.Component {
  render() {
    const {
      bigImage,
      likes,
      id,
      username,
      weeksAgo,
      text,
      avatar,
    } = this.props.post;

    const { big } = bigImage.childImageSharp;

    const UserBar = () => (
      <div className="UseBar">
        <img src={avatar} alt={username} className="postDetailAvatar" />
        <h5 className="postDetailUsername">{username}</h5>
      </div>
    );

    const PostDetails = () => (
      <div className="PostDetails">
        <div className="wrapper">
          <strong className="likes">{likes} likes</strong>
          <strong className="strong">{weeksAgo}w</strong>
        </div>
        <div>
          <strong>{username}</strong> {text}
        </div>
      </div>
    );

    return (
      <div onClick={(e) => e.stopPropagation()} className="ModuleDetail">
        <div className="moduleDetailWrapper">
          <UserBar />
          <div className="container">
            <PostDetails />
          </div>
        </div>
        <div to={`/${id}/`} className="imageWrapper">
          <div className="imageContainer">
            <img
              alt={""}
              key={big.src}
              src={big.src}
              srcSet={big.srcSet}
              fluid="(min-width: 640px) 640px, 100vw"
              className="imageItem"
            />
            <div className="pad" />
          </div>
        </div>
        <div className="detail">
          <PostDetails />
        </div>
      </div>
    );
  }
}

export default PostDetail;

export const postDetailFragment = graphql`
  fragment PostDetail_details on PostsJson {
    # Specify the fields from the post we need.
    username
    avatar
    likes
    id
    text
    # Date fields have special arguments. This one computes
    # how many weeks have passed since the post was created.
    # All calculations like this (like all GraphQL query
    # activity) happens at build-time! So has minimal cost
    # for the client.
    weeksAgo: time(difference: "weeks")
    bigImage: image {
      childImageSharp {
        # Here we query for *multiple* image thumbnails to be
        # created. So with no effort on our part, 100s of
        # thumbnails are created. This makes iterating on
        # designs effortless as we change the args
        # for the query and we get new thumbnails.
        big: fluid(maxWidth: 640) {
          src
          srcSet
        }
      }
    }
  }
`;

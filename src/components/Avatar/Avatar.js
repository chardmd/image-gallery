import * as PropTypes from "prop-types";
import React from "react";
import { graphql } from "gatsby";

import "./Avatar.scss";

const propTypes = {
  user: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }),
};

function Avatar({ user }) {
  return <img src={user.avatar} alt={user.username} className="ModuleAvatar" />;
}

Avatar.propTypes = propTypes;

export default Avatar;
export const userFragment = graphql`
  fragment Avatar_user on PostsJson {
    avatar
    username
  }
`;

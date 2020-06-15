import * as PropTypes from "prop-types"
import chunk from "lodash/chunk"
import React from "react"
import { graphql } from "gatsby"

import Avatar from "../components/Avatar"
import PostItem from "../components/PostItem"
import Layout from "../layouts"

import "./Index.scss"

// This would normally be in a Redux store or some other global data store.
if (typeof window !== `undefined`) {
  window.postsToShow = 12
}

class Index extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    data: PropTypes.shape({
      user: PropTypes.object,
      allPostsJson: PropTypes.object,
    }),
  }

  constructor() {
    super()
    let postsToShow = 12
    if (typeof window !== `undefined`) {
      postsToShow = window.postsToShow
    }

    this.state = {
      showingMore: postsToShow > 12,
      postsToShow,
    }
  }

  update() {
    const distanceToBottom =
      document.documentElement.offsetHeight -
      (window.scrollY + window.innerHeight)
    if (this.state.showingMore && distanceToBottom < 100) {
      this.setState({ postsToShow: this.state.postsToShow + 12 })
    }
    this.ticking = false
  }

  handleScroll = () => {
    if (!this.ticking) {
      this.ticking = true
      requestAnimationFrame(() => this.update())
    }
  }

  componentDidMount() {
    window.addEventListener(`scroll`, this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener(`scroll`, this.handleScroll)
    window.postsToShow = this.state.postsToShow
  }

  render() {
    let { allPostsJson, user } = this.props.data

    const posts = allPostsJson.edges.map(e => e.node)

    user = user.edges[0].node

    return (
      <Layout location={this.props.location}>
        <div className="postLayoutContainer">
          {/* user profile */}
          <div className="userAvatar">
            <div className="wrapper">
              <Avatar user={user} />
            </div>
            <div className="userNameWrapper">
              <h3>{user.username}</h3>
              <p>
                <strong>{posts.length}</strong> posts
                <strong className="pushLeft">192k</strong> followers
              </p>
            </div>
          </div>
          {/* posts */}
          {chunk(posts.slice(0, this.state.postsToShow), 3).map((chunk, i) => (
            <div key={`chunk-${i}`} className="postWrapper">
              {chunk.map(node => (
                <PostItem
                  key={node.id}
                  post={node}
                  location={this.props.location}
                  onClick={post => this.setState({ activePost: post })}
                />
              ))}
            </div>
          ))}
          {!this.state.showingMore && (
            <a
              className="loadMore"
              onClick={() => {
                this.setState({
                  postsToShow: this.state.postsToShow + 12,
                  showingMore: true,
                })
              }}
            >
              Load More
            </a>
          )}
        </div>
      </Layout>
    )
  }
}

export default Index

export const pageQuery = graphql`
  query {
    user: allPostsJson(limit: 1) {
      edges {
        node {
          username
          ...Avatar_user
        }
      }
    }
    allPostsJson {
      edges {
        node {
          id
          text
          weeksAgo: time(difference: "weeks")
          ...Post_details
          ...PostDetail_details
        }
      }
    }
  }
`

import React from "react";
import Layout from "../../layouts";

import "./About.scss";

class About extends React.Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <div className="About">
          <h1>About ImageGallery</h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>
      </Layout>
    );
  }
}

export default About;

const path = require("path");

module.exports = {
  siteMetadata: {
    title: "ImageGallery",
  },
  plugins: [
    /*
     * Gatsby's data processing layer begins with “source”
     * plugins.  You can source data nodes from anywhere but
     * most sites, like ImageGallery, will include data from
     * the filesystem so we start here with
     * “gatsby-source-filesystem”.
     *
     * A site can have as many instances of
     * gatsby-source-filesystem as you need.  Each plugin
     * instance is configured with a root path where it then
     * recursively reads in files and adds them to the data
     * tree.
     */
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "data",
        path: path.join(__dirname, "data"),
      },
    },
    // This plugin exposes helper functions for processing
    // images with the NPM package “sharp”. It's used by
    // several other plugins.
    "gatsby-plugin-sharp",
    // This plugin identifies file nodes that are images and
    // transforms these to create new “ImageSharp” nodes.
    // With them you can resize images and
    // generate responsive image thumbnails.
    "gatsby-transformer-sharp",
    // This plugin transforms JSON file nodes.
    "gatsby-transformer-json",
    // This plugin takes your configuration and generates a
    // web manifest file so ImageGallery can be added to your
    // homescreen on Android.
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "ImageGallery",
        short_name: "ImageGallery",
        start_url: "/",
        background_color: "#f7f7f7",
        theme_color: "#191919",
        display: "minimal-ui",
      },
    },
    "gatsby-plugin-sass",
    // This plugin generates a service worker and AppShell
    // html file so the site works offline and is otherwise
    // resistant to bad networks. Works with almost any
    // site!
    "gatsby-plugin-offline",
    // This plugin sets up Google Analytics for you.
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "UA-168810586-1", // tmp
      },
    },
    {
      resolve: "gatsby-plugin-typography",
      options: {
        pathToConfigModule: "src/utils/typography",
      },
    },
    // Automatically generates a _headers file and a _redirects file
    // at the root of the public folder to configure HTTP headers and redirects on Netlify.
    "gatsby-plugin-netlify",
  ],
};

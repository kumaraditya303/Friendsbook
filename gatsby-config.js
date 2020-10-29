module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [`gatsby-plugin-sass`],
  proxy: {
    prefix: "/api",
    url: "http://127.0.0.1:8001",
  },
}

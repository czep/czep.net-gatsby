const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const { tabulate } = require(`./src/utils/tabulate`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const indexTemplate = path.resolve(`./src/templates/index.js`);
  const postTemplate = path.resolve(`./src/templates/blog-post.js`);
  const pageTemplate = path.resolve(`./src/templates/page.js`);
  const topicTemplate = path.resolve(`./src/templates/topic.js`);
  const query = await graphql(`
    query {
      blogPages: allMarkdownRemark(
        filter: {frontmatter: {layout: {eq: "page"}}}
      ) {
        edges {
          node {
            frontmatter {
              layout
              path
              title
            }
          }
        }
      }
      blogPosts: allMarkdownRemark(
        filter: {frontmatter: {layout: {eq: "post"}}}
        sort: { fields: [frontmatter___date], order: DESC }
        limit: 9999
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              layout
              path
              date
              title
              topics
            }
            excerpt
          }
        }
      }
    }
  `);

  if (query.errors) {
    throw query.errors;
  }

  const blogPages = query.data.blogPages.edges;
  const blogPosts = query.data.blogPosts.edges;

  // create blog posts
  blogPosts.forEach((post, index) => {
    const previous = index === blogPosts.length - 1 ? null : blogPosts[index + 1].node;
    const next = index === 0 ? null : blogPosts[index - 1].node;

    createPage({
      path: post.node.fields.slug,
      component: postTemplate,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  });

  // create index pages
  const postsPerPage = 10;
  const numPages = Math.ceil(blogPosts.length / postsPerPage);
  Array.from({ length: numPages }).forEach((_, i) => {
    console.log(`Creating index page: ${i+1}`);
    createPage({
      path: i === 0 ? `/` : `/page${i + 1}/`,
      component: indexTemplate,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  });

  // create topic pages
  let rawTopics = [];
  blogPosts.map(p => rawTopics = [...rawTopics, p.node.frontmatter.topics]);
  let allTopics = [];
  rawTopics.map(t => allTopics = [...allTopics, t.split(" ")]);
  const topicCounts = tabulate(allTopics.flat());
  console.log("Building map of topic counts...");
  console.log(topicCounts);

  [...topicCounts].map(([topic, postCount]) => {
    createPage({
      path: `/topics/${topic}/`,
      component: topicTemplate,
      context: {
        topicRegex: `/${topic}/`,
        topic: `${topic}`
      }
    });
  });

  // create markdown pages
  blogPages.forEach((page) => {
    createPage({
      path: page.node.frontmatter.path,
      component: pageTemplate
    })
  });

}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const filename = createFilePath({ node, getNode });

    if (node.frontmatter.layout === 'post') {

      const [, postDate, postSlug] = filename.match(
        /^\/(?:drafts\/)?([\d]{4}-[\d]{2}-[\d]{2})-{1}(.+)\/$/
      );

      const postYear = postDate.substring(2, 4);
      const slug = `/${postYear}/${postSlug}.html`;

      createNodeField({
        name: `slug`,
        node,
        value: slug,
      })
    }
  }
}

import React from "react";
import { Link, graphql } from "gatsby";

import Bio from "../components/bio";
import Layout from "../components/layout";
import Metatags from "../components/metatags";

const TopicPage = (props) => {

  const siteTitle = props.data.site.siteMetadata.title;
  const posts = props.data.allMarkdownRemark.edges;
  const topic = props.pageContext.topic;
  const topicDisplay = topic.charAt(0).toUpperCase() + topic.slice(1);

  let currentYear = null;
  posts.forEach((post) => {
    if (currentYear === null || currentYear !== post.node.frontmatter.date.substring(0,4)) {
      post.node.isNewYear = true;
      currentYear = post.node.frontmatter.date.substring(0,4);
    } else {
      post.node.isNewYear = false;
    }
  });

  return (
    <Layout location={props.location} title={siteTitle}>
      <Metatags title={`Topic: ${topic}`} path={props.path} />
      <div className="post-content">
        <h1>{topicDisplay}</h1>

        {posts.map(({ node }) => {
          const yr = node.frontmatter.date.substring(0, 4);
          const dt = node.frontmatter.date.substring(5, 99);

          const yearHeader = node.isNewYear ? <h2>{yr}</h2> : '';

          return (
            <div key={`${node.fields.slug}`}>
            {yearHeader}
            <div className="post-date">
              {dt}
            </div>
            <Link className="post-link" to={node.fields.slug}>
              {node.frontmatter.title}
            </Link>
            </div>
          )
        })}
      </div>
      <Bio />
    </Layout>
  )

};

export default TopicPage;

export const topicQuery = graphql`
  query($topicRegex: String!) {
    allMarkdownRemark(
      filter: {
        frontmatter: {
          layout: {eq: "post"},
          topics: {regex: $topicRegex }
        }
      }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            layout
            path
            date(formatString: "YYYY DD MMMM")
            title
            topics
          }
          excerpt
          wordCount {
            words
          }
          timeToRead
        }
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`;


import React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
const { tabulate } = require(`../utils/tabulate`);


const Sidebar = (props) => {

  const sidebarQuery = useStaticQuery(graphql`
    query {
      topics: allMarkdownRemark(filter: {frontmatter: {layout: {eq: "post"}}}, sort: {fields: frontmatter___date, order: ASC}) {
        nodes {
          frontmatter {
            topics
          }
        }
      }
      recentPosts: allMarkdownRemark(filter: {frontmatter: {layout: {eq: "post"}}}, sort: {fields: frontmatter___date, order: DESC}, limit: 10) {
        nodes {
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
  `);

  // get the set of unique topics, sorted by first appearance
  const posts = sidebarQuery.topics.nodes;
  let rawTopics = [];
  posts.map(p => rawTopics = [...rawTopics, p.frontmatter.topics]);
  let allTopics = [];
  rawTopics.map(t => allTopics = [...allTopics, t.split(" ")]);
  const topicCounts = tabulate(allTopics.flat());

  // get recent posts
  const recentPosts = sidebarQuery.recentPosts.nodes;

  return (
    <nav className="site-nav">
      <div id="links">
        <h2>Links</h2>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about/">About</a></li>
            <li><a href="/degauss.html">Much Earlier</a></li>
            <li><a href="/feed.xml">RSS feed</a></li>
          </ul>
      </div>
      <div id="topic_list">
        <h2>Topics</h2>
          <ul>
            {
              [...topicCounts].map(([topic, postCount]) => {
                return (
                  <li key={`${topic}`}><Link to={`/topics/${topic}`}>{`${topic} (${postCount})`}</Link></li>
                )
              })
            }
          </ul>
      </div>

      <div id="recent_entries">
        <h2>Recent Entries</h2>
        <ul>
          {
            recentPosts.map(post => {
              return (
                <li key={`${post.fields.slug}`}><Link to={`${post.fields.slug}`}>{post.frontmatter.title}</Link></li>
              )
            })
          }
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;

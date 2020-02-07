import React from "react";
import { graphql } from "gatsby";

import Bio from "../components/bio";
import Layout from "../components/layout";
import Metatags from "../components/metatags";

const BlogPageTemplate = (props) => {

  const siteTitle = props.data.site.siteMetadata.title;
  const page = props.data.allMarkdownRemark.nodes[0];

  return (
    <Layout location={props.location} title={siteTitle}>
      <Metatags title={page.frontmatter.title} path={props.path} />
      <div className="post-content" dangerouslySetInnerHTML={{ __html: page.html }}>
      </div>
      <Bio />
    </Layout>
  )

};

export default BlogPageTemplate;

export const pageQuery = graphql`
  query BlogPage($path: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: {
        frontmatter: {
          layout: {eq: "page"},
          path: {eq: $path}
        }
      }) {
    nodes {
      frontmatter {
        path
        title
        layout
      }
      html
    }
  }
  }
`

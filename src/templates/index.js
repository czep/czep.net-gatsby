import React from "react";
import { Link, graphql } from "gatsby";

import Bio from "../components/bio";
import Layout from "../components/layout";
import Metatags from "../components/metatags";

const BlogIndex = (props) => {

  const siteTitle = props.data.site.siteMetadata.title;
  const posts = props.data.allMarkdownRemark.edges;
  const { currentPage, numPages } = props.pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage = currentPage - 1 === 1 ? "/" : `/page${currentPage - 1}/`;
  const nextPage = `/page${currentPage + 1}/`;

  return (
    <Layout location={props.location} title={siteTitle}>
      <Metatags title="czep" />

      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug;

        const wc = Number.parseFloat(Number.parseInt(node.wordCount.words) / 1000.0).toFixed(1).toString() + 'k';
        const topics = node.frontmatter.topics.split(" ");

        return (
          <article key={node.fields.slug}>
            <header>
              <h2>
                <Link className="post-link" to={node.fields.slug}>
                  {title}
                </Link>
              </h2>
              <p className="post-meta">
                <span className="meta-item">{node.frontmatter.date}</span>
                ⋄
                <a className="post-author" href="/about/">czep</a>
                ⋄
                <span className="category">
                  {topics.map((topic, i) => {
                    return (
                      <span key="{topic}">
                      <Link to={`/topics/${topic}/`}>{topic}</Link>
                      {i !== topics.length - 1 ? '⋄' : ''}
                      </span>
                    )
                  })}
                </span>
                ⋄
                <span className="meta-item">{wc} words / {node.timeToRead} minutes</span>
              </p>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </section>
          </article>
        );
      })}

      <div className="pagination">
        {!isFirst && (
          <Link to={prevPage} className="previous" rel="prev">
            &laquo; Prev
          </Link>
        )}
        <span className="page_number"> Page {currentPage} of {numPages} </span>
        {!isLast && (
          <Link to={nextPage} className="next" rel="next">
            Next &raquo;
          </Link>
        )}
      </div>
      <Bio />
    </Layout>
  );
}

export default BlogIndex;

export const listQuery = graphql`
  query blogPosts($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      filter: {frontmatter: {layout: {eq: "post"}}}
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            layout
            path
            date(formatString: "DD MMM YYYY")
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


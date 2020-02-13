import React from "react";
import { Link, graphql } from "gatsby";

import Bio from "../components/bio";
import Layout from "../components/layout";
import Metatags from "../components/metatags";

const BlogPost = (props) => {
  const post = props.data.markdownRemark;
  const siteTitle = props.data.site.siteMetadata.title;
  const { previous, next } = props.pageContext;
  const postContent = post.html.split("<!--excerpt-->")[1];
  const topics = post.frontmatter.topics.split(" ");
  const wc = Number.parseFloat(Number.parseInt(post.wordCount.words) / 1000.0).toFixed(1).toString() + 'k';

  return (
    <Layout location={props.location} title={siteTitle}>
      <Metatags
        title={post.frontmatter.title}
        description={post.excerpt}
        path={props.path}
      />
      <article>
        <header>
          <h1>
            {post.frontmatter.title}
          </h1>
          <p className="post-meta">
            <span className="meta-item">{post.frontmatter.date}</span>
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
            <span className="meta-item">{wc} words / {post.timeToRead} minutes</span>
          </p>
        </header>
        <section dangerouslySetInnerHTML={{ __html: postContent }} />
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>

      <nav>
        <ul>
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
      <Bio />
    </Layout>
  );

}

export default BlogPost;

export const blogPostQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "DD MMM YYYY")
        topics
      }
      wordCount {
        words
      }
      timeToRead
    }
  }
`;

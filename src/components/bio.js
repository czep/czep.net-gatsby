import React, { Fragment } from "react";
import { useStaticQuery, graphql } from "gatsby";
import Img from 'gatsby-image';

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(relativePath: {eq: "blog/Scott_Czepiel.png"}) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed_withWebp_tracedSVG
          }
        }
      }
      site {
        siteMetadata {
          author
          social {
            twitter
            github
          }
        }
      }
    }
  `);

  const { author, social } = data.site.siteMetadata;
  const show = false;
  const sampleBio = show ? (
    <Fragment>
      <Img
          fixed={data.avatar.childImageSharp.fixed}
          imgStyle={{ borderRadius: '20px' }}
      />
      <p>Author: {author}</p>
      <p>Twitter: {social.twitter}</p>
      <p>Github: {social.github}</p>
    </Fragment>
  ) : '';

  return (
    <div className="bio">
      {sampleBio}
    </div>
  )
}

export default Bio;

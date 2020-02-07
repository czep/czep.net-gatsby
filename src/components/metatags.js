import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

const Metatags = ({ description, lang, meta, title, path }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            siteUrl
            title
            description
            author
            social {
              twitter
              github
            }
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;
  const url = path ? `${site.siteMetadata.siteUrl}${path}` : `${site.siteMetadata.siteUrl}`;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        { name: `description`, content: metaDescription, },
        { property: `og:title`, content: title, },
        { property: `og:description`, content: metaDescription, },
        { property: `og:type`, content: `website`, },
        { property: `og:site_name`, content: `czep.net`, },
        { property: `og:url`, content: url, },
        { name: `twitter:card`, content: `summary`, },
        { name: `twitter:creator`, content: site.siteMetadata.social.twitter, },
        { name: `twitter:title`, content: title, },
        { name: `twitter:description`, content: metaDescription, },
        { name: 'robots', content: 'index, follow' },
      ].concat(meta)}
    />
  );
}

Metatags.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
};

Metatags.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
};

export default Metatags;

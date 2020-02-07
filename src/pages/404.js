import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import Metatags from "../components/metatags";

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout location={location} title={siteTitle}>
      <Metatags title="404: Not Found" />
      <h1>Not Found</h1>
    </Layout>
  );
}

export default NotFoundPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

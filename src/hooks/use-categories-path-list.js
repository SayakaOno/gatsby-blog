// @flow
import { useStaticQuery, graphql } from 'gatsby';

const useCategoriesPathList = () => {
  const { allSitePage } = useStaticQuery(
    graphql`
      query useCategoriesPathListQuery {
        allSitePage(filter: { path: { regex: "//category//" } }) {
          nodes {
            path
          }
        }
      }
    `
  );

  return allSitePage.nodes;
};

export default useCategoriesPathList;

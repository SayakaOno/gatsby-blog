// @flow
import { useStaticQuery, graphql } from 'gatsby';

const useUrlsPathList = () => {
  const { allSitePage } = useStaticQuery(
    graphql`
      query useUrlsPathListQuery {
        allSitePage {
          nodes {
            path
          }
        }
      }
    `
  );

  return allSitePage.nodes;
};

export default useUrlsPathList;

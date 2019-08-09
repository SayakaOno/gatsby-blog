// @flow
import { useStaticQuery, graphql } from 'gatsby';

const useTagsPathList = () => {
  const { allSitePage } = useStaticQuery(
    graphql`
      query useTagsPathListQuery {
        allSitePage(filter: { path: { regex: "//tag//" } }) {
          nodes {
            path
          }
        }
      }
    `
  );

  return allSitePage.nodes;
};

export default useTagsPathList;

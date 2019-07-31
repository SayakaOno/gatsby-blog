// @flow
import { useStaticQuery, graphql } from 'gatsby';

const useTagsListJa = () => {
  const { allMarkdownRemark } = useStaticQuery(
    graphql`
      query TagsListJaQuery {
        allMarkdownRemark(
          filter: {
            frontmatter: {
              template: { eq: "post" }
              draft: { ne: true }
              language: { eq: "ja" }
            }
          }
        ) {
          group(field: frontmatter___tags) {
            fieldValue
            totalCount
          }
        }
      }
    `
  );

  return allMarkdownRemark.group;
};

export default useTagsListJa;

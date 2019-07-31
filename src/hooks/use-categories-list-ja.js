// @flow
import { useStaticQuery, graphql } from 'gatsby';

const useCategoriesListJa = () => {
  const { allMarkdownRemark } = useStaticQuery(
    graphql`
      query CategoriesListJaQuery {
        allMarkdownRemark(
          filter: {
            frontmatter: {
              template: { eq: "post" }
              draft: { ne: true }
              language: { eq: "ja" }
            }
          }
        ) {
          group(field: frontmatter___category) {
            fieldValue
            totalCount
          }
        }
      }
    `
  );

  return allMarkdownRemark.group;
};

export default useCategoriesListJa;

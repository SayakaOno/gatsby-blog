// @flow
import { useStaticQuery, graphql } from 'gatsby';

const usePostsTitlesList = () => {
  const { allMarkdownRemark } = useStaticQuery(
    graphql`
      query PostsListQuery {
        allMarkdownRemark(
          filter: {
            frontmatter: { template: { eq: "post" }, draft: { ne: true } }
          }
        ) {
          edges {
            node {
              frontmatter {
                slug
                title
              }
            }
          }
        }
      }
    `
  );

  return allMarkdownRemark.edges;
};

export default usePostsTitlesList;

export const getTitle = slug => {
  let post = usePostsTitlesList().filter(edge => {
    return edge.node.frontmatter.slug === slug;
  });
  return post[0].node.frontmatter.title;
};

// @flow
import { useStaticQuery, graphql } from 'gatsby';

const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query SiteMetaData {
        site {
          siteMetadata {
            author {
              name {
                en
                ja
              }
              bio {
                en
                ja
              }
              photo
              contacts {
                email {
                  en
                  ja
                }
                twitter {
                  en
                  ja
                }
                github {
                  en
                  ja
                }
                rss {
                  en
                  ja
                }
              }
            }
            menu {
              label {
                en
                ja
              }
              path
            }
            url
            title
            subtitle
            copyright
            disqusShortname
          }
        }
      }
    `
  );

  return site.siteMetadata;
};

export default useSiteMetadata;

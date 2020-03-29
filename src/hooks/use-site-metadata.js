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
                portfolio {
                  en
                  ja
                }
                github {
                  en
                  ja
                }
                linkedin {
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
            titleJa
            subtitle
            subtitleJa
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

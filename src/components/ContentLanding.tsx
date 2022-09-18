import { graphql, useStaticQuery } from 'gatsby';
import * as React from 'react';
import { FC } from 'react';

const ContentLanding: FC = () => {
    const data: Queries.LandingQuery = useStaticQuery(graphql`
        query Landing {
            contentfulLandingSection {
                linkName
                anchor
                animation {
                    url
                }
                content {
                    raw
                }
                links {
                    url
                    icon {
                        url
                        title
                    }
                }
            }
        }
    `);

    if (!data.contentfulLandingSection) {
        return null;
    }

    const { anchor } = data.contentfulLandingSection;

    return (
        <>
            <a className={anchor || ''} />
            <section>{'Landing'}</section>
        </>
    );
};

export default ContentLanding;

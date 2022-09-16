import { graphql, useStaticQuery } from 'gatsby';
import * as React from 'react';

const ContentWork: React.FC = () => {
    const data: Queries.WorkQuery = useStaticQuery(graphql`
        query Work {
            contentfulWorkSection {
                posts {
                    title
                    slug
                }
                linkName
                anchor
                count
            }
        }
    `);

    if (!data.contentfulWorkSection) {
        return null;
    }

    const { anchor } = data.contentfulWorkSection;

    return (
        <>
            <a id={anchor || ''} />
            <section>{'Work'}</section>
        </>
    );
};

export default ContentWork;

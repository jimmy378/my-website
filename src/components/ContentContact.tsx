import { graphql, useStaticQuery } from 'gatsby';
import * as React from 'react';

const ContentContact: React.FC = () => {
    const data: Queries.ContactQuery = useStaticQuery(graphql`
        query Contact {
            contentfulContactSection {
                anchor
                linkName
            }
        }
    `);

    if (!data.contentfulContactSection) {
        return null;
    }

    const { anchor } = data.contentfulContactSection;

    return (
        <>
            <a id={anchor || ''} />
            <section>{'Contact'}</section>
        </>
    );
};

export default ContentContact;

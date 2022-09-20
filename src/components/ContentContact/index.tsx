import './styles.scss';

import { graphql, useStaticQuery } from 'gatsby';
import * as React from 'react';
import { FC } from 'react';

const ContentContact: FC = () => {
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

    const { anchor, linkName } = data.contentfulContactSection;

    return (
        <>
            <a className={anchor || ''} />
            <section className={anchor || ''}>
                <h1>{linkName || ''}</h1>
            </section>
        </>
    );
};

export default ContentContact;

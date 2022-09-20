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

    const { anchor } = data.contentfulContactSection;

    return (
        <>
            <a className={anchor || ''} />
            <section className={anchor || ''}></section>
        </>
    );
};

export default ContentContact;

import './styles.scss';

import { graphql, useStaticQuery } from 'gatsby';
import * as React from 'react';
import { FC } from 'react';

const ContentWork: FC = () => {
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

    const { anchor, linkName } = data.contentfulWorkSection;

    return (
        <>
            <a className={anchor || ''} />
            <section className={anchor || ''}>
                <h1>{linkName || ''}</h1>
            </section>
        </>
    );
};

export default ContentWork;

import { graphql, useStaticQuery } from 'gatsby';
import * as React from 'react';
import { FC } from 'react';

const ContentSkills: FC = () => {
    const data: Queries.SkillsQuery = useStaticQuery(graphql`
        query Skills {
            contentfulSkillsSection {
                anchor
                linkName
                skills {
                    image {
                        url
                    }
                    title
                    content {
                        raw
                    }
                }
            }
        }
    `);

    if (!data.contentfulSkillsSection) {
        return null;
    }

    const { anchor } = data.contentfulSkillsSection;

    return (
        <>
            <a className={anchor || ''} />
            <section className={anchor || ''}></section>
        </>
    );
};

export default ContentSkills;

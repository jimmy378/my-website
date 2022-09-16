import { graphql, useStaticQuery } from 'gatsby';
import * as React from 'react';

const ContentSkills: React.FC = () => {
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
            <a id={anchor || ''} />
            <section>{'Skills'}</section>
        </>
    );
};

export default ContentSkills;

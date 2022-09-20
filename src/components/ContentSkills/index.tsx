import './styles.scss';

import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
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
                        gatsbyImageData
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

    const { anchor, linkName, skills } = data.contentfulSkillsSection;

    return (
        <>
            <a className={anchor || ''} />
            <section className={anchor || ''}>
                <h1>{linkName || ''}</h1>
                {skills?.map((skill, index) => (
                    <article key={`skill-${index}`}>
                        <div className="content">
                            {skill?.content &&
                                renderRichText(skill.content as any, {})}
                        </div>
                        {skill?.image?.gatsbyImageData && (
                            <GatsbyImage
                                alt={skill.title || ''}
                                className="image"
                                image={skill.image.gatsbyImageData}
                            />
                        )}
                    </article>
                ))}
            </section>
        </>
    );
};

export default ContentSkills;

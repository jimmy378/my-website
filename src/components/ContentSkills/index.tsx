import './styles.scss';

import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import * as React from 'react';
import { FC } from 'react';

const ContentSkills: FC = () => {
    const data: Queries.SkillsQuery = useStaticQuery(graphql`
        query Skills {
            contentfulHomePage {
                skillsSection
                skillsAnchor
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

    if (!data.contentfulHomePage) {
        return null;
    }

    const { skills, skillsAnchor, skillsSection } = data.contentfulHomePage;

    return (
        <>
            <a className={skillsAnchor || ''} />
            <section className={skillsAnchor || ''}>
                <h1>{skillsSection || ''}</h1>
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

import './styles.scss';

import { motion } from 'framer-motion';
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
                    <motion.article
                        initial={{ opacity: 0, y: 100 }}
                        key={`skill-${index}`}
                        transition={{ duration: 1, ease: 'easeInOut' }}
                        viewport={{
                            margin: '0px 0px -200px 0px',
                            once: true,
                        }}
                        whileInView={{ opacity: 1, y: 0 }}
                    >
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
                    </motion.article>
                ))}
            </section>
        </>
    );
};

export default ContentSkills;

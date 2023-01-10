import './ContentSkills.scss';

import { motion } from 'framer-motion';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import * as React from 'react';
import { FC } from 'react';
import { isMobile } from 'react-device-detect';

import Animation from '../Animation/Animation';

const ContentSkills: FC = () => {
    const data: Queries.SkillsQuery = useStaticQuery(graphql`
        query Skills {
            contentfulHomePage {
                skillsSection
                skillsAnchor
                skillsHeading {
                    url
                }
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

    const { skills, skillsAnchor, skillsHeading } = data.contentfulHomePage;

    return (
        <>
            <a className={skillsAnchor || ''} />
            <section className={skillsAnchor || ''}>
                <Animation
                    animationUrl={skillsHeading?.url || ''}
                    customClass="animation-header"
                    renderer="svg"
                    triggerOnEnter={true}
                />
                {skills?.map((skill, index) => (
                    <motion.article
                        initial={{ opacity: 0, y: isMobile ? 0 : 100 }}
                        key={`skill-${index}`}
                        transition={{ duration: 1, ease: 'easeInOut' }}
                        viewport={{
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

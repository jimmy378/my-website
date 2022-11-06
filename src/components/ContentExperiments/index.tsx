import './styles.scss';

import { motion } from 'framer-motion';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import React, { Fragment, useEffect, useState } from 'react';
import { FC } from 'react';
import { isMobile } from 'react-device-detect';

import CrossIcon from '../../icons/cross.svg';
import Animation from '../Animation';
import Dropdown from '../Dropdown';

const ContentExperiments: FC = () => {
    const data: Queries.ExperimentsQuery = useStaticQuery(graphql`
        query Experiments {
            contentfulHomePage {
                experimentsSection
                experimentsAnchor
                experimentsCount
                experimentsHeading {
                    url
                }
                experiments {
                    title
                    thumbnail {
                        gatsbyImageData(layout: FULL_WIDTH)
                    }
                    tags {
                        tags
                    }
                }
            }
        }
    `);

    if (!data.contentfulHomePage) {
        return null;
    }

    const {
        experiments,
        experimentsAnchor,
        experimentsCount,
        experimentsHeading,
    } = data.contentfulHomePage;
    const [count, setCount] = useState(experimentsCount || 3);
    const [tags, setTags] = useState<string[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [filteredExperiments, setFilteredExperiments] = useState(experiments);

    useEffect(() => {
        let newTags: string[] = [];
        if (experiments) {
            for (const experiment of experiments) {
                const experimentTags = experiment?.tags?.tags;
                if (experimentTags) {
                    newTags = [...newTags, ...(experimentTags as any)];
                }
            }
        }
        setTags([...new Set(newTags)]);
    }, []);

    useEffect(() => {
        let newExperiments = experiments;
        if (selectedTags.length > 0) {
            newExperiments =
                experiments?.filter((experiment) =>
                    experiment?.tags?.tags?.some((tag) =>
                        selectedTags.includes(tag || '')
                    )
                ) || [];
        }
        setFilteredExperiments(newExperiments);
    }, [selectedTags]);

    const updateSelectedTags = (selected: string) => {
        if (selectedTags.includes(selected)) {
            setSelectedTags(selectedTags.filter((tag) => tag !== selected));
        } else {
            setSelectedTags([...selectedTags, selected]);
        }
    };

    return (
        <>
            <a className={experimentsAnchor || ''} />
            <section className={experimentsAnchor || ''}>
                <div className="filters">
                    <Animation
                        animationUrl={experimentsHeading?.url || ''}
                        customClass="animation-header"
                        renderer="svg"
                        triggerOnEnter={true}
                    />
                    <div className="options">
                        {selectedTags.map((tag) => (
                            <button
                                key={tag}
                                onClick={() => updateSelectedTags(tag)}
                            >
                                {tag}
                                <CrossIcon />
                            </button>
                        ))}
                        {selectedTags.length > 0 && (
                            <button onClick={() => setSelectedTags([])}>
                                {'Clear'}
                                <CrossIcon />
                            </button>
                        )}
                    </div>
                    <Dropdown
                        onSelect={updateSelectedTags}
                        options={tags.map((tag) => ({
                            selected: selectedTags.includes(tag),
                            text: tag,
                        }))}
                        title="Filters"
                    />
                </div>
                <div className="grid">
                    {filteredExperiments
                        ?.slice(0, count)
                        .map((experiment, index) => (
                            <Fragment key={experiment?.title}>
                                <motion.article
                                    initial={{
                                        opacity: 0,
                                        y: isMobile ? 0 : 100,
                                    }}
                                    transition={{ duration: 1, type: 'spring' }}
                                    viewport={{
                                        once: true,
                                    }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                >
                                    {experiment?.thumbnail?.gatsbyImageData && (
                                        <GatsbyImage
                                            alt={experiment.title || ''}
                                            className="image"
                                            image={
                                                experiment.thumbnail
                                                    .gatsbyImageData
                                            }
                                        />
                                    )}
                                    <p>{experiment?.title}</p>
                                </motion.article>
                            </Fragment>
                        ))}
                </div>
                {(filteredExperiments?.length || 0) > count && (
                    <button
                        onClick={() =>
                            setCount(count + (experimentsCount || 3))
                        }
                    >
                        {'Show more'}
                    </button>
                )}
            </section>
        </>
    );
};

export default ContentExperiments;

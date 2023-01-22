import './ContentFeatured.scss';

import { motion } from 'framer-motion';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import React, { Fragment, useEffect, useState } from 'react';
import { FC } from 'react';
import { isMobile } from 'react-device-detect';

import CrossIcon from '../../icons/cross.svg';
import Animation from '../Animation/Animation';
import Dropdown from '../Dropdown/Dropdown';

const ContentFeatured: FC = () => {
    const data: Queries.FeaturedQuery = useStaticQuery(graphql`
        query Featured {
            contentfulHomePage {
                featuredSection
                featuredAnchor
                featuredHeading {
                    url
                }
                featured {
                    slug
                    title
                    thumbnail {
                        gatsbyImageData(layout: FULL_WIDTH)
                    }
                    description {
                        raw
                    }
                    tags {
                        tags
                    }
                    isPrivate
                }
            }
        }
    `);

    if (!data.contentfulHomePage) {
        return null;
    }

    const { featured, featuredAnchor, featuredHeading } =
        data.contentfulHomePage;
    const [tags, setTags] = useState<string[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [filteredPosts, setFilteredPosts] = useState(featured);

    useEffect(() => {
        let newTags: string[] = [];
        if (featured) {
            for (const post of featured) {
                const postTags = post?.tags?.tags;
                if (postTags) {
                    newTags = [...newTags, ...(postTags as any)];
                }
            }
        }
        setTags([...new Set(newTags)]);
    }, []);

    useEffect(() => {
        let newPosts = featured;
        if (selectedTags.length > 0) {
            newPosts =
                featured?.filter((post) =>
                    post?.tags?.tags?.some((tag) =>
                        selectedTags.includes(tag || '')
                    )
                ) || [];
        }
        setFilteredPosts(newPosts);
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
            <a className={featuredAnchor || ''} />
            <section className={featuredAnchor || ''}>
                <div className="filters">
                    <Animation
                        animationUrl={featuredHeading?.url || ''}
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
                {filteredPosts?.map((post, index) => {
                    if (post?.isPrivate) {
                        return null;
                    }
                    return (
                        <Fragment key={post?.slug}>
                            <motion.article
                                initial={{ opacity: 0, y: isMobile ? 0 : 100 }}
                                transition={{ duration: 1, type: 'spring' }}
                                viewport={{
                                    once: true,
                                }}
                                whileInView={{ opacity: 1, y: 0 }}
                            >
                                <a href={post?.slug || ''}></a>
                                {post?.thumbnail?.gatsbyImageData && (
                                    <GatsbyImage
                                        alt={post.title || ''}
                                        className="image"
                                        image={post.thumbnail.gatsbyImageData}
                                    />
                                )}
                                <div className="content">
                                    <ul>
                                        {post?.tags?.tags?.map((tag, index) => (
                                            <Fragment key={tag}>
                                                <li>{tag}</li>
                                                {index <
                                                (post.tags?.tags?.length
                                                    ? post.tags?.tags?.length -
                                                      1
                                                    : 0) ? (
                                                    <span />
                                                ) : null}
                                            </Fragment>
                                        ))}
                                    </ul>
                                    <h2>{post?.title}</h2>
                                    {post?.description &&
                                        renderRichText(
                                            post?.description as any,
                                            {}
                                        )}
                                    <span>{'Read more'}</span>
                                </div>
                            </motion.article>
                            {index < filteredPosts.length - 1 ? (
                                <div className="divider" />
                            ) : null}
                        </Fragment>
                    );
                })}
            </section>
        </>
    );
};

export default ContentFeatured;

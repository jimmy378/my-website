import './ContentGallery.scss';

import { motion } from 'framer-motion';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import React, { Fragment, useEffect, useState } from 'react';
import { FC } from 'react';
import { isMobile } from 'react-device-detect';

import CrossIcon from '../../icons/cross.svg';
import Animation from '../Animation/Animation';
import Dropdown from '../Dropdown/Dropdown';
import Modal from '../Modal/Modal';

const ContentGallery: FC = () => {
    const data: Queries.GalleryQuery = useStaticQuery(graphql`
        query Gallery {
            contentfulHomePage {
                gallerySection
                galleryAnchor
                galleryCount
                galleryHeading {
                    url
                }
                gallery {
                    slug
                    title
                    thumbnail {
                        gatsbyImageData(layout: FULL_WIDTH)
                    }
                    content {
                        raw
                        references {
                            ... on ContentfulComponentIframe {
                                contentful_id
                                __typename
                                link {
                                    link
                                }
                            }
                            ... on ContentfulAsset {
                                contentful_id
                                __typename
                                gatsbyImageData(layout: FULL_WIDTH)
                            }
                        }
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

    const { gallery, galleryAnchor, galleryCount, galleryHeading } =
        data.contentfulHomePage;
    const [count, setCount] = useState(isMobile ? 3 : galleryCount || 3);
    const [tags, setTags] = useState<string[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [filteredPosts, setFilteredPosts] = useState(gallery);
    const [selectedPost, setSelectedPost] = useState<any>();

    useEffect(() => {
        let newTags: string[] = [];
        if (gallery) {
            for (const post of gallery) {
                const experimentTags = post?.tags?.tags;
                if (experimentTags) {
                    newTags = [...newTags, ...(experimentTags as any)];
                }
            }
        }
        setTags([...new Set(newTags)]);
    }, []);

    useEffect(() => {
        let newExperiments = gallery;
        if (selectedTags.length > 0) {
            newExperiments =
                gallery?.filter((post) =>
                    post?.tags?.tags?.some((tag) =>
                        selectedTags.includes(tag || '')
                    )
                ) || [];
        }
        setFilteredPosts(newExperiments);
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
            <a className={galleryAnchor || ''} />
            <section className={galleryAnchor || ''}>
                <div className="filters">
                    <Animation
                        animationUrl={galleryHeading?.url || ''}
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
                    {filteredPosts?.slice(0, count).map((post) => (
                        <Fragment key={post?.title}>
                            <motion.article
                                initial={{
                                    opacity: 0,
                                    y: isMobile ? 0 : 100,
                                }}
                                onClick={() => setSelectedPost(post)}
                                transition={{ duration: 1, type: 'spring' }}
                                viewport={{
                                    once: true,
                                }}
                                whileInView={{ opacity: 1, y: 0 }}
                            >
                                {post?.thumbnail?.gatsbyImageData && (
                                    <GatsbyImage
                                        alt={post.title || ''}
                                        className="image"
                                        image={post.thumbnail.gatsbyImageData}
                                    />
                                )}
                                <a href={post?.slug || ''}></a>
                                <p>{post?.title}</p>
                            </motion.article>
                        </Fragment>
                    ))}
                </div>
                {(filteredPosts?.length || 0) > count && (
                    <button
                        onClick={() => setCount(count + (galleryCount || 3))}
                    >
                        {'Show more'}
                    </button>
                )}
            </section>
        </>
    );
};

export default ContentGallery;

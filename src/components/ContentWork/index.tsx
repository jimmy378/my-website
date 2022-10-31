import './styles.scss';

import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import React, { Fragment, useEffect, useState } from 'react';
import { FC } from 'react';

import CrossIcon from '../../icons/cross.svg';
import Dropdown from '../Dropdown';

const ContentWork: FC = () => {
    const data: Queries.WorkQuery = useStaticQuery(graphql`
        query Work {
            contentfulHomePage {
                workSection
                workAnchor
                workCount
                posts {
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
                }
            }
        }
    `);

    if (!data.contentfulHomePage) {
        return null;
    }

    const { posts, workAnchor, workCount, workSection } =
        data.contentfulHomePage;
    const [tags, setTags] = useState<string[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [filteredPosts, setFilteredPosts] = useState(posts);

    useEffect(() => {
        let newTags: string[] = [];
        if (posts) {
            for (const post of posts) {
                const postTags = post?.tags?.tags;
                if (postTags) {
                    newTags = [...newTags, ...(postTags as any)];
                }
            }
        }
        setTags([...new Set(newTags)]);
    }, []);

    useEffect(() => {
        if (selectedTags.length === 0) {
            setFilteredPosts(posts);
        } else {
            setFilteredPosts(
                posts?.filter((post) =>
                    post?.tags?.tags?.some((tag) =>
                        selectedTags.includes(tag || '')
                    )
                ) || []
            );
        }
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
            <a className={workAnchor || ''} />
            <section className={workAnchor || ''}>
                <div className="filters">
                    <h1>{workSection || ''}</h1>
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
                {filteredPosts?.map((post, index) => (
                    <Fragment key={post?.slug}>
                        <article>
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
                                                ? post.tags?.tags?.length - 1
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
                        </article>
                        {index < (posts || []).length - 1 ? (
                            <div className="divider" />
                        ) : null}
                    </Fragment>
                ))}
            </section>
        </>
    );
};

export default ContentWork;

import './styles.scss';

import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import React, { useEffect, useState } from 'react';
import { FC } from 'react';

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
                    <div>
                        {selectedTags.map((tag) => (
                            <button key="tag">{tag}</button>
                        ))}
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
                {posts?.map((post) => (
                    <article key={post?.slug}>
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
                                    <>
                                        <li key={tag}>{tag}</li>
                                        {index <
                                        (post.tags?.tags?.length
                                            ? post.tags?.tags?.length - 1
                                            : 0) ? (
                                            <span />
                                        ) : null}
                                    </>
                                ))}
                            </ul>
                            <h2>{post?.title}</h2>
                            {post?.description &&
                                renderRichText(post?.description as any, {})}
                            <span>{'Read more'}</span>
                        </div>
                    </article>
                ))}
            </section>
        </>
    );
};

export default ContentWork;

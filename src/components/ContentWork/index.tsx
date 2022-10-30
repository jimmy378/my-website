import './styles.scss';

import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import * as React from 'react';
import { FC } from 'react';

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
                }
            }
        }
    `);

    if (!data.contentfulHomePage) {
        return null;
    }

    const { posts, workAnchor, workCount, workSection } =
        data.contentfulHomePage;

    return (
        <>
            <a className={workAnchor || ''} />
            <section className={workAnchor || ''}>
                <h1>{workSection || ''}</h1>
                {posts?.map((post) => (
                    <article key={post?.slug}>
                        {post?.thumbnail?.gatsbyImageData && (
                            <GatsbyImage
                                alt={post.title || ''}
                                className="image"
                                image={post.thumbnail.gatsbyImageData}
                            />
                        )}
                        <div className="content">
                            <h2>{post?.title}</h2>
                            {post?.description &&
                                renderRichText(post?.description as any, {})}
                            <a href={post?.slug || ''}>{'Read more'}</a>
                        </div>
                    </article>
                ))}
            </section>
        </>
    );
};

export default ContentWork;

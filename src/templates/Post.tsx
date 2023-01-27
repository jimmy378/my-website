import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/700.css';
import '../styles/index.scss';
import './Post.scss';
import 'react-medium-image-zoom/dist/styles.css';

import { graphql, HeadFC, PageProps } from 'gatsby';
import React, { Fragment, useEffect, useState } from 'react';

import Header from '../components/Header/Header';
import RichText from '../components/RichText/RichText';

const PostPage = ({ data }: PageProps<Queries.PostPageQuery>) => {
    if (typeof window === 'undefined') {
        return <></>;
    }
    if (!data.contentfulPost) {
        return <></>;
    }
    const { content, tags, title } = data.contentfulPost;
    const [anchors, setAnchors] = useState<{ anchor: string; title: string }[]>(
        []
    );

    useEffect(() => {
        const blocks = content?.references || [];
        const newAnchors: { anchor: string; title: string }[] = [];
        blocks.forEach((block) => {
            if (block?.__typename === 'ContentfulComponentAnchor') {
                const { anchor, title } = block;
                newAnchors.push({
                    anchor: anchor || '',
                    title: title || '',
                });
            }
        });
        setAnchors(newAnchors);
    }, []);

    return (
        <main>
            <Header isHomePage={false} />
            <section className="content">
                {anchors.length > 0 && (
                    <aside>
                        <ul>
                            <li>
                                <a href={`#top`}>{'Top of page'}</a>
                            </li>
                            {anchors.map((anchor) => (
                                <li key={anchor.title}>
                                    <a href={`#${anchor.anchor}`}>
                                        {anchor.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </aside>
                )}
                <a className="post-anchor top" />
                <ul className="tags">
                    {tags?.tags?.map((tag, index) => (
                        <Fragment key={tag}>
                            <li>{tag}</li>
                            {index <
                            (tags?.tags?.length
                                ? tags?.tags?.length - 1
                                : 0) ? (
                                <span />
                            ) : null}
                        </Fragment>
                    ))}
                </ul>
                <h1>{title || ''}</h1>
                <RichText content={content} />
            </section>
        </main>
    );
};

export const Head: HeadFC<Queries.PostPageQuery> = ({ data }) => {
    if (!data.contentfulPost) {
        return <></>;
    }
    const { seoDescription, seoTitle } = data.contentfulPost;
    return (
        <>
            <title>{`James Anderson | ${seoTitle || ''}`}</title>
            <meta content={seoDescription || ''} name="description"></meta>
        </>
    );
};

export default PostPage;

export const query = graphql`
    query PostPage($slug: String!) {
        contentfulPost(slug: { eq: $slug }) {
            title
            slug
            content {
                raw
                references {
                    ... on ContentfulComponentAnchor {
                        contentful_id
                        __typename
                        title
                        anchor
                    }
                    ... on ContentfulComponentVideo {
                        contentful_id
                        __typename
                        id
                        videoLink
                    }
                    ... on ContentfulComponentIframe {
                        contentful_id
                        __typename
                        link {
                            link
                        }
                    }
                    ... on ContentfulAsset {
                        contentful_id
                        description
                        __typename
                        gatsbyImageData(layout: FULL_WIDTH)
                    }
                    ... on ContentfulComponentGallery {
                        contentful_id
                        __typename
                        images {
                            description
                            gatsbyImageData(layout: FULL_WIDTH)
                        }
                    }
                }
            }
            tags {
                tags
            }
            seoTitle
            seoDescription
        }
    }
`;

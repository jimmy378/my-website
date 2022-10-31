import '../styles/index.scss';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/700.css';
import './Post.scss';

import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import { graphql, HeadFC, PageProps } from 'gatsby';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import React, { Fragment } from 'react';

import Header from '../components/Header';
import PostIframe from '../components/PostIframe';
import PostImage from '../components/PostImage';
import PostVideo from '../components/PostVideo';

const richTextOptions = {
    renderNode: {
        [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
            const { gatsbyImageData } = node.data.target;
            return <PostImage imageData={gatsbyImageData} />;
        },
        [BLOCKS.EMBEDDED_ENTRY]: (node: any) => {
            const { __typename, link, videoLink } = node.data.target;
            switch (__typename) {
                case 'ContentfulComponentVideo':
                    return <PostVideo link={videoLink} />;
                case 'ContentfulComponentIframe':
                    return <PostIframe link={link} />;

                default:
                    return <></>;
            }
        },
    },
};

const PostPage = ({ data }: PageProps<Queries.PostPageQuery>) => {
    if (typeof window === 'undefined') {
        return <></>;
    }
    if (!data.contentfulPost) {
        return <></>;
    }
    const { content, tags, title } = data.contentfulPost;

    return (
        <main>
            <Header isHomePage={false} />
            <section className="content">
                <ul>
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
                <>
                    {content && (
                        <>{renderRichText(content as any, richTextOptions)}</>
                    )}
                </>
            </section>
        </main>
    );
};

export const Head: HeadFC<Queries.PostPageQuery> = ({ data }) => {
    if (!data.contentfulPost) {
        return <></>;
    }
    const { content, seoDescription, seoTitle, tags, title } =
        data.contentfulPost;
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
                    ... on ContentfulComponentVideo {
                        contentful_id
                        __typename
                        id
                        videoLink
                    }
                    ... on ContentfulComponentIframe {
                        contentful_id
                        __typename
                        link
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
            seoTitle
            seoDescription
        }
    }
`;

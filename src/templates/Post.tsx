import '../styles/index.scss';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/700.css';
import './Post.scss';
import 'react-medium-image-zoom/dist/styles.css';

import { graphql, HeadFC, PageProps } from 'gatsby';
import React, { Fragment } from 'react';

import Header from '../components/Header';
import RichText from '../components/RichText';

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
                        __typename
                        gatsbyImageData(layout: FULL_WIDTH)
                    }
                    ... on ContentfulComponentGallery {
                        contentful_id
                        __typename
                        images {
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

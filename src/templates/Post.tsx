import '../styles/index.scss';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/700.css';

import { HeadFC } from 'gatsby';
import * as React from 'react';

import Header from '../components/Header';

const PostPage = () => {
    if (typeof window === 'undefined') {
        return <></>;
    }

    return (
        <main>
            <Header isHomePage={false} />
        </main>
    );
};

export const Head: HeadFC<Queries.IndexPageQuery> = ({ data }) => (
    <>
        <title>{data.site?.siteMetadata?.title || ''}</title>
        <meta
            content={data.site?.siteMetadata?.description || ''}
            name="description"
        ></meta>
    </>
);

export default PostPage;

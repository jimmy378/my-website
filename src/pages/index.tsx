import '../styles/index.scss';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/700.css';

import { graphql, HeadFC } from 'gatsby';
import * as React from 'react';

import ContentContact from '../components/ContentContact/ContentContact';
import ContentFeatured from '../components/ContentFeatured/ContentFeatured';
import ContentGallery from '../components/ContentGallery/ContentGallery';
import ContentLanding from '../components/ContentLanding/ContentLanding';
import ContentSkills from '../components/ContentSkills/ContentSkills';
import Header from '../components/Header/Header';

const IndexPage = () => {
    if (typeof window === 'undefined') {
        return <></>;
    }

    return (
        <main>
            <Header />
            <ContentLanding />
            <ContentFeatured />
            <ContentGallery />
            <ContentSkills />
            <ContentContact />
        </main>
    );
};

export const Head: HeadFC<Queries.IndexPageQuery> = ({ data }) => {
    if (!data.contentfulHomePage) {
        return <></>;
    }
    const { seoDescription, seoTitle } = data.contentfulHomePage;
    return (
        <>
            <title>{seoTitle || ''}</title>
            <meta content={seoDescription || ''} name="description"></meta>
        </>
    );
};

export default IndexPage;

export const query = graphql`
    query IndexPage {
        contentfulHomePage {
            seoTitle
            seoDescription
        }
    }
`;

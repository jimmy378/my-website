import '../styles/index.scss';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/700.css';

import { graphql, HeadFC } from 'gatsby';
import * as React from 'react';

import ContentContact from '../components/ContentContact';
import ContentLanding from '../components/ContentLanding';
import ContentSkills from '../components/ContentSkills';
import ContentWork from '../components/ContentWork';
import Header from '../components/Header';

const IndexPage = () => {
    if (typeof window === 'undefined') {
        return <></>;
    }

    return (
        <main>
            <Header />
            <ContentLanding />
            <ContentWork />
            <ContentSkills />
            <ContentContact />
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

export default IndexPage;

export const query = graphql`
    query IndexPage {
        site {
            siteMetadata {
                description
                title
            }
        }
    }
`;

import type { HeadFC, PageProps } from 'gatsby';
import React from 'react';

const IndexPage: React.FC<PageProps> = () => {
    return <main></main>;
};

export default IndexPage;

export const Head: HeadFC = () => (
    <>
        <title>{`James Anderson - Product Designer and Web Developer`}</title>
        <meta
            content={`I'm a motion graphics artist, web designer and illustrator based in Sydney, Australia.`}
            name="description"
        />
    </>
);

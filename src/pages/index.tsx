import { graphql, HeadFC, PageProps } from 'gatsby';
import * as React from 'react';

const IndexPage = ({ data }: PageProps<Queries.IndexPageQuery>) => {
    if (!data.contentfulPage) {
        return <></>;
    }
    const page = data.contentfulPage;

    return <main>{'My Website'}</main>;
};

export const Head: HeadFC<Queries.IndexPageQuery> = ({ data }) => {
    if (!data.contentfulPage) {
        return <></>;
    }
    const { metaTags, title } = data.contentfulPage;
    return (
        <>
            <title>{title || ''}</title>
            {metaTags?.map((tag, index) => {
                if (!tag) {
                    return <></>;
                }
                const { content, name, nameType } = tag;
                return (
                    <meta
                        content={content?.content || ''}
                        key={`meta=${index}`}
                        name={
                            nameType === 'name' ? name || undefined : undefined
                        }
                        property={
                            nameType === 'property'
                                ? name || undefined
                                : undefined
                        }
                    />
                );
            })}
        </>
    );
};

export default IndexPage;

export const query = graphql`
    query IndexPage {
        contentfulPage(name: { eq: "Home" }) {
            slug
            title
            metaTags {
                name
                nameType
                content {
                    content
                }
            }
            canonical
            sections
            name
        }
    }
`;

import path from 'path';

export const createPages = async ({ actions, graphql }: any) => {
    const { data } = await graphql(`
        query {
            allContentfulPost {
                edges {
                    node {
                        title
                        slug
                    }
                }
            }
        }
    `);
    data.allContentfulPost.edges.forEach((edge: any) => {
        const slug = edge.node.slug;
        actions.createPage({
            component: path.resolve('./src/templates/Post.tsx'),
            context: { slug: slug },
            path: slug,
        });
    });
};

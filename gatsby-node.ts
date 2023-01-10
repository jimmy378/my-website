import path from 'path';

export const createPages = async ({ actions, graphql }: any) => {
    const { data } = await graphql(`
        query AllPosts {
            allContentfulPost {
                edges {
                    node {
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

export const onCreateWebpackConfig = ({ actions, getConfig, stage }: any) => {
    if (stage === 'build-javascript' || stage === 'develop') {
        const config = getConfig();

        const miniCssExtractPlugin = config.plugins.find(
            (plugin: any) => plugin.constructor.name === 'MiniCssExtractPlugin'
        );

        if (miniCssExtractPlugin)
            miniCssExtractPlugin.options.ignoreOrder = true;

        actions.replaceWebpackConfig(config);
    }
};

import dotenv from 'dotenv';
import type { GatsbyConfig } from 'gatsby';

dotenv.config({
    path: `.env.${process.env.NODE_ENV}`,
});

const config: GatsbyConfig = {
    graphqlTypegen: true,
    plugins: [
        {
            options: {
                accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
                spaceId: process.env.CONTENTFUL_SPACE_ID,
            },
            resolve: 'gatsby-source-contentful',
        },
        'gatsby-plugin-image',
        'gatsby-plugin-sharp',
        'gatsby-transformer-sharp',
        'gatsby-plugin-sass',
        'gatsby-plugin-sitemap',
        {
            options: {
                icon: 'src/images/icon.png',
            },
            resolve: 'gatsby-plugin-manifest',
        },
        {
            options: {
                rule: {
                    include: /icons/,
                },
            },
            resolve: 'gatsby-plugin-react-svg',
        },
        {
            options: {
                fonts: [
                    {
                        family: `Montserrat`,
                        variants: [`400`, `700`],
                    },
                ],
            },
            resolve: `gatsby-plugin-prefetch-google-fonts`,
        },
        'gatsby-plugin-mdx',
        'gatsby-plugin-webpack-bundle-analyser-v2',
        {
            __key: 'images',
            options: {
                name: 'images',
                path: './src/images/',
            },
            resolve: 'gatsby-source-filesystem',
        },
        {
            __key: 'pages',
            options: {
                name: 'pages',
                path: './src/pages/',
            },
            resolve: 'gatsby-source-filesystem',
        },
        {
            options: {
                gtagConfig: {
                    anonymize_ip: true,
                    cookie_expires: 0,
                },
                pluginConfig: {
                    head: false,
                    respectDNT: true,
                },
                trackingIds: [
                    process.env.GA_TRACKING_ID, // Google Analytics / GA
                ],
            },
            resolve: `gatsby-plugin-google-gtag`,
        },
    ],
    siteMetadata: {
        description: `I'm a motion graphics artist, web designer and illustrator based in Sydney, Australia.`,
        siteUrl: `https://jamesandersondesign.com.au/`,
        title: `My website`,
    },
};

export default config;

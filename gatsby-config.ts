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
                accessToken: process.env.CONTENTFUL_API_KEY,
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
        'gatsby-plugin-mdx',
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
        siteUrl: `https://jamesandersondesign.com.au/`,
        title: `My website`,
    },
};

export default config;
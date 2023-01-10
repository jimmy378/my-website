import dotenv from 'dotenv';
import type { GatsbyConfig } from 'gatsby';

dotenv.config({
    path: `.env.${process.env.NODE_ENV}`,
});

const config: GatsbyConfig = {
    graphqlTypegen: true,
    plugins: [
        'gatsby-plugin-sass',
        'gatsby-plugin-image',
        'gatsby-plugin-sitemap',
        'gatsby-plugin-mdx',
        'gatsby-plugin-sharp',
        'gatsby-transformer-sharp',
        {
            __key: 'images',
            options: {
                name: 'images',
                path: './src/images/',
            },
            resolve: 'gatsby-source-filesystem',
        },
        {
            __key: 'animations',
            options: {
                name: 'animations',
                path: './src/animations/',
            },
            resolve: 'gatsby-source-filesystem',
        },
        {
            __key: 'icons',
            options: {
                name: 'icons',
                path: './src/icons/',
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
                trackingIds: [process.env.GA_TRACKING_ID],
            },
            resolve: `gatsby-plugin-google-gtag`,
        },
    ],
    siteMetadata: {
        description: `I'm a motion graphics artist, web designer and illustrator based in Sydney, Australia.`,
        siteUrl: `https://jamesandersondesign.com.au/`,
        title: `James Anderson - Product Designer and Web Developer`,
    },
};

export default config;

import './styles.scss';

import { BLOCKS } from '@contentful/rich-text-types';
import Vimeo from '@u-wave/react-vimeo';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import React, { FC } from 'react';

import PostGallery from '../PostGallery';
import PostIframe from '../PostIframe';
import PostImage from '../PostImage';
import PostVideo from '../PostVideo';

const richTextOptions = {
    renderNode: {
        [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
            const { gatsbyImageData } = node.data.target;
            return <PostImage imageData={gatsbyImageData} />;
        },
        [BLOCKS.EMBEDDED_ENTRY]: (node: any) => {
            const { __typename, images, link, videoLink } = node.data.target;
            switch (__typename) {
                case 'ContentfulComponentVideo':
                    return <PostVideo link={videoLink} />;
                case 'ContentfulComponentIframe':
                    return <PostIframe link={link} />;
                case 'ContentfulComponentGallery':
                    return <PostGallery images={images} />;

                default:
                    return <></>;
            }
        },
    },
};

type Props = {
    content: any;
};

const RichText: FC<Props> = ({ content }) => (
    <>{content && renderRichText(content as any, richTextOptions)}</>
);

export default RichText;

import './PostImage.scss';

import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React, { FC } from 'react';
import Zoom from 'react-medium-image-zoom';

type Props = {
    imageData: any;
};

const PostImage: FC<Props> = ({ imageData }) => (
    <Zoom>
        <div className="post-image">
            <GatsbyImage alt="" image={getImage(imageData as any)!} />
        </div>
    </Zoom>
);

export default PostImage;

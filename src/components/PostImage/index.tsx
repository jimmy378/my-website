import './styles.scss';

import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React, { FC } from 'react';

type Props = {
    imageData: any;
};

const PostImage: FC<Props> = ({ imageData }) => (
    <div className="post-image">
        <GatsbyImage alt="" image={getImage(imageData as any)!} />
    </div>
);

export default PostImage;

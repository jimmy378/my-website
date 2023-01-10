import 'react-medium-image-zoom/dist/styles.css';
import './PostGallery.scss';

import React, { FC } from 'react';

import PostImage from '../PostImage/PostImage';

type Props = {
    images: any[];
};

const PostGallery: FC<Props> = ({ images }) => (
    <div className="post-gallery">
        {images.map((image, index) => (
            <PostImage imageData={image} key={`image-${index}`} />
        ))}
    </div>
);

export default PostGallery;

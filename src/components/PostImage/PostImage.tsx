import './PostImage.scss';

import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React, { FC } from 'react';
import Zoom from 'react-medium-image-zoom';

type Props = {
    description: string;
    imageData: any;
};

const PostImage: FC<Props> = ({ description, imageData }) => {
    return (
        <Zoom>
            <div className="post-image">
                <figure>
                    <GatsbyImage
                        alt={description}
                        image={getImage(imageData as any)!}
                        title={description}
                    />
                    <figcaption>{description}</figcaption>
                </figure>
            </div>
        </Zoom>
    );
};

export default PostImage;

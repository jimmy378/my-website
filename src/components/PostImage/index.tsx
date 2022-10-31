import './styles.scss';

import React, { FC } from 'react';

type Props = {
    imageData: any;
};

const PostImage: FC<Props> = ({ imageData }) => (
    <div className="post-image"></div>
);

export default PostImage;

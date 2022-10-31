import './styles.scss';

import React, { FC } from 'react';

type Props = {
    link: string;
};

const PostVideo: FC<Props> = ({ link }) => <div className="post-video"></div>;

export default PostVideo;

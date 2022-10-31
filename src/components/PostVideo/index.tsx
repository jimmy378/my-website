import './styles.scss';

import Vimeo from '@u-wave/react-vimeo';
import React, { FC } from 'react';

type Props = {
    link: string;
};

const PostVideo: FC<Props> = ({ link }) => (
    <div className="post-video">
        <Vimeo autoplay={false} responsive={true} video={link} />
    </div>
);

export default PostVideo;

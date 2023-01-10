import './PostIframe.scss';

import React, { FC } from 'react';

type Props = {
    link: {
        link: string;
    };
};

const PostIframe: FC<Props> = ({ link }) => (
    <div className="post-iframe">
        <iframe frameBorder="0" height="100%" src={link.link}></iframe>
    </div>
);

export default PostIframe;

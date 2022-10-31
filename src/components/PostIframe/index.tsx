import './styles.scss';

import React, { FC } from 'react';

type Props = {
    link: string;
};

const PostIframe: FC<Props> = ({ link }) => (
    <div className="post-iframe">
        <iframe frameBorder="0" height="100%" src={link}></iframe>
    </div>
);

export default PostIframe;

import './Link.scss';

import * as React from 'react';

type Props = {
    href: string;
    icon: string;
    title: string;
};

const Link: React.FC<Props> = ({ href, icon, title }) => (
    <a
        aria-label={title}
        className="link"
        href={href}
        rel="noreferrer nofollow"
        target="blank"
    >
        <img src={icon} />
    </a>
);

export default Link;

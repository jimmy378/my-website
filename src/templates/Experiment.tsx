import './Experiment.scss';

import React, { FC } from 'react';

import RichText from '../components/RichText/RichText';

type Props = {
    experiment: any;
};

const Experiment: FC<Props> = ({ experiment }) => {
    const { content, title } = experiment;
    return (
        <div className="experiment">
            <h1>{title || ''}</h1>
            <RichText content={content} />
        </div>
    );
};

export default Experiment;

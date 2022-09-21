import '../styles/index.scss';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/700.css';

import { HeadFC } from 'gatsby';
import * as React from 'react';

const NotFoundPage = () => {
    return <main>{'404'}</main>;
};

export default NotFoundPage;

export const Head: HeadFC = () => <title>Not found</title>;

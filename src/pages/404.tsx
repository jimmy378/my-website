import { HeadFC } from 'gatsby';
import * as React from 'react';

const NotFoundPage = () => {
    return <main>{'404'}</main>;
};

export default NotFoundPage;

export const Head: HeadFC = () => <title>Not found</title>;

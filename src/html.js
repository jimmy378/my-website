import PropTypes from 'prop-types';
import React from 'react';

export default function HTML(props) {
    return (
        <html {...props.htmlAttributes}>
            <head>
                <meta charSet="utf-8" />
                <meta content="ie=edge" httpEquiv="x-ua-compatible" />
                <meta
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                    name="viewport"
                />
                {props.headComponents}
            </head>
            <body {...props.bodyAttributes}>
                <form
                    hidden
                    name="contact-form"
                    netlify // eslint-disable-line
                    netlify-honeypot="address" // eslint-disable-line
                >
                    <input name="name" type="text" />
                    <input name="email" type="email" />
                    <textarea name="message"></textarea>
                </form>
                {props.preBodyComponents}
                <div
                    dangerouslySetInnerHTML={{ __html: props.body }}
                    id="___gatsby"
                    key={`body`}
                />
                {props.postBodyComponents}
            </body>
        </html>
    );
}

HTML.propTypes = {
    body: PropTypes.string,
    bodyAttributes: PropTypes.object,
    headComponents: PropTypes.array,
    htmlAttributes: PropTypes.object,
    postBodyComponents: PropTypes.array,
    preBodyComponents: PropTypes.array,
};

import PropTypes from 'prop-types';
import React from 'react';

export default function HTML(props) {
    return (
        <html {...props.htmlAttributes}>
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PMCM6VX');
                        `,
                    }}
                />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
(function (m, a, z, e) {
    var s, t;
    try {
        t = m.sessionStorage.getItem('maze-us');
    } catch (err) {
        /** Empty */
    }
    if (!t) {
        t = new Date().getTime();
        try {
            m.sessionStorage.setItem('maze-us', t);
        } catch (err) {
            /** Empty */
        }
    }

    s = a.createElement('script');
    s.src = z + '?t=' + t + '&apiKey=' + e;
    s.async = true;
    a.getElementsByTagName('head')[0].appendChild(s);
    m.mazeUniversalSnippetApiKey = e;
})(
    window,
    document,
    'https://snippet.maze.co/maze-universal-loader.js',
    '776fce4f-c81f-4fa1-8105-b910ef81cdad'
)
                        `,
                    }}
                />
                <meta charSet="utf-8" />
                <meta content="ie=edge" httpEquiv="x-ua-compatible" />
                <meta
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                    name="viewport"
                />
                {props.headComponents}
            </head>
            <body {...props.bodyAttributes}>
                <noscript>
                    <iframe
                        height="0"
                        src="https://www.googletagmanager.com/ns.html?id=GTM-PMCM6VX"
                        style={{ display: 'none', visibility: 'hidden' }}
                        width="0"
                    ></iframe>
                </noscript>
                <form
                    hidden
                    name="contact-form"
                    data-netlify="true" // eslint-disable-line
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

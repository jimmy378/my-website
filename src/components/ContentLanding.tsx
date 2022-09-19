import { graphql, useStaticQuery } from 'gatsby';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import lottie from 'lottie-web';
import * as React from 'react';
import { FC, useEffect, useRef, useState } from 'react';

import Link from './Link';
import Spinner from './Spinner';

const ContentLanding: FC = () => {
    const data: Queries.LandingQuery = useStaticQuery(graphql`
        query Landing {
            contentfulLandingSection {
                linkName
                anchor
                animation {
                    url
                }
                content {
                    raw
                }
                links {
                    url
                    title
                    icon {
                        url
                        title
                    }
                }
            }
        }
    `);

    if (!data.contentfulLandingSection) {
        return null;
    }

    const playerRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(true);
    const { anchor, animation, content, links } = data.contentfulLandingSection;

    useEffect(() => {
        const anim = lottie.loadAnimation({
            autoplay: true,
            container: playerRef.current as any,
            loop: true,
            path: animation?.url || '',
            renderer: 'svg',
        });

        const onDomLoaded = () => {
            console.log('hi');
            setLoading(false);
        };
        anim.addEventListener('DOMLoaded', () => onDomLoaded());

        return () => {
            anim.removeEventListener('DOMLoaded', () => onDomLoaded());
            anim.destroy();
        };
    }, []);

    return (
        <>
            <a className={anchor || ''} />
            <section className={anchor || ''}>
                <div className="content">
                    {content && renderRichText(content as any, {})}
                    <div className="links">
                        {links?.map((link) => (
                            <Link
                                href={link?.url || ''}
                                icon={link?.icon?.url || ''}
                                key={link?.title}
                                title={link?.title || ''}
                            />
                        ))}
                    </div>
                </div>
                <div className="animation">
                    {loading && <Spinner />}
                    <div ref={playerRef} />
                </div>
            </section>
        </>
    );
};

export default ContentLanding;

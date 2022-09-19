import { graphql, useStaticQuery } from 'gatsby';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import lottie from 'lottie-web';
import * as React from 'react';
import { FC, useEffect, useRef, useState } from 'react';

import CaretDownIcon from '../icons/caret_down.svg';
import WaveIcon from '../icons/wave.svg';
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
            contentfulWorkSection {
                anchor
            }
        }
    `);

    if (!data.contentfulLandingSection) {
        return null;
    }

    const playerRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(true);
    const [displayMobileAnimation, setDisplayMobileAnimation] = useState(false);
    const { anchor, animation, content, links } = data.contentfulLandingSection;

    useEffect(() => {
        const anim = lottie.loadAnimation({
            autoplay: true,
            container: playerRef.current as any,
            loop: true,
            path: animation?.url || '',
            renderer: 'svg',
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid',
            },
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
                {!displayMobileAnimation && (
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
                            <a
                                aria-label={'Show animation'}
                                className="link wave"
                                onClick={() =>
                                    setDisplayMobileAnimation(
                                        !displayMobileAnimation
                                    )
                                }
                            >
                                <WaveIcon />
                            </a>
                        </div>
                    </div>
                )}
                <div
                    className={`animation ${
                        displayMobileAnimation ? 'visible' : ''
                    }`.trim()}
                >
                    {loading && <Spinner />}
                    <div className="player" ref={playerRef} />
                </div>
                <a
                    className="continue"
                    href={`#${data.contentfulWorkSection?.anchor || ''}`}
                >
                    <CaretDownIcon />
                </a>
            </section>
        </>
    );
};

export default ContentLanding;

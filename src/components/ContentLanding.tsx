import { graphql, useStaticQuery } from 'gatsby';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import lottie from 'lottie-web';
import * as React from 'react';
import { FC, useEffect, useRef, useState } from 'react';

import CaretDownIcon from '../icons/caret_down.svg';
import CrossIcon from '../icons/cross.svg';
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
    const [continueVisible, setContinueVisible] = useState(true);
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
            setLoading(false);
        };
        anim.addEventListener('DOMLoaded', () => onDomLoaded());

        const handleClick = () => {
            setDisplayMobileAnimation(false);
        };
        addEventListener('mousedown', handleClick);

        const onScroll = () => setContinueVisible(scrollY === 0);
        addEventListener('scroll', onScroll);

        return () => {
            anim.removeEventListener('DOMLoaded', () => onDomLoaded());
            anim.destroy();
            removeEventListener('mousedown', handleClick);
            removeEventListener('scroll', onScroll);
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
                {displayMobileAnimation && (
                    <a aria-label={'Show animation'} className="link close">
                        <CrossIcon />
                    </a>
                )}
                {!displayMobileAnimation && (
                    <a
                        className={`continue ${
                            continueVisible ? 'visible' : ''
                        }`.trim()}
                        href={`#${data.contentfulWorkSection?.anchor || ''}`}
                    >
                        <CaretDownIcon />
                    </a>
                )}
            </section>
        </>
    );
};

export default ContentLanding;

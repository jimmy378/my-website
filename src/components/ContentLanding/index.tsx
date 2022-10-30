import './styles.scss';

import { graphql, useStaticQuery } from 'gatsby';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import lottie from 'lottie-web';
import * as React from 'react';
import { FC, useEffect, useRef, useState } from 'react';

import CaretDownIcon from '../../icons/caret_down.svg';
import CrossIcon from '../../icons/cross.svg';
import WaveIcon from '../../icons/wave.svg';
import Link from '../Link';
import Spinner from '../Spinner';

const ContentLanding: FC = () => {
    const data: Queries.LandingQuery = useStaticQuery(graphql`
        query Landing {
            contentfulHomePage {
                landingAnchor
                landingSection
                landingAnimation {
                    url
                }
                landingContent {
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
                workAnchor
            }
        }
    `);

    if (!data.contentfulHomePage) {
        return null;
    }

    const playerRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(true);
    const [displayMobileAnimation, setDisplayMobileAnimation] = useState(false);
    const [continueVisible, setContinueVisible] = useState(true);
    const {
        landingAnchor,
        landingAnimation,
        landingContent,
        links,
        workAnchor,
    } = data.contentfulHomePage;

    useEffect(() => {
        const anim = lottie.loadAnimation({
            autoplay: true,
            container: playerRef.current as any,
            loop: true,
            path: landingAnimation?.url || '',
            renderer: 'canvas',
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

        const handleResize = () => {
            (lottie as any).resize();
        };
        addEventListener('resize', handleResize);
        addEventListener('orientationchange', handleResize);
        return () => {
            anim.removeEventListener('DOMLoaded', () => onDomLoaded());
            anim.destroy();
            removeEventListener('mousedown', handleClick);
            removeEventListener('scroll', onScroll);
            removeEventListener('resize', handleResize);
            removeEventListener('orientationchange', handleResize);
        };
    }, []);

    return (
        <>
            <a className={landingAnchor || ''} />
            <section className={landingAnchor || ''}>
                {!displayMobileAnimation && (
                    <div className="content">
                        {landingContent &&
                            renderRichText(landingContent as any, {})}
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
                        href={`#${workAnchor || ''}`}
                    >
                        <CaretDownIcon />
                    </a>
                )}
            </section>
        </>
    );
};

export default ContentLanding;

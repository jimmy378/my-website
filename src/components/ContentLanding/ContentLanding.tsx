import './ContentLanding.scss';

import { motion } from 'framer-motion';
import { graphql, useStaticQuery } from 'gatsby';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import * as React from 'react';
import { FC, useEffect, useState } from 'react';

import CaretDownIcon from '../../icons/caret_down.svg';
import CrossIcon from '../../icons/cross.svg';
import WaveIcon from '../../icons/wave.svg';
import Animation from '../Animation/Animation';
import Link from '../Link/Link';
import Spinner from '../Spinner/Spinner';

const ContentLanding: FC = () => {
    const data: Queries.LandingQuery = useStaticQuery(graphql`
        query Landing {
            contentfulHomePage {
                landingAnchor
                landingSection
                landingHeading {
                    url
                }
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
                featuredAnchor
            }
        }
    `);

    if (!data.contentfulHomePage) {
        return null;
    }

    const [loading, setLoading] = useState(true);
    const [displayMobileAnimation, setDisplayMobileAnimation] = useState(false);
    const [continueVisible, setContinueVisible] = useState(true);
    const {
        featuredAnchor,
        landingAnchor,
        landingAnimation,
        landingContent,
        landingHeading,
        links,
    } = data.contentfulHomePage;

    useEffect(() => {
        const handleClick = () => {
            setDisplayMobileAnimation(false);
        };
        addEventListener('mousedown', handleClick);
        const onScroll = () => setContinueVisible(scrollY === 0);
        addEventListener('scroll', onScroll);
        return () => {
            removeEventListener('mousedown', handleClick);
            removeEventListener('scroll', onScroll);
        };
    }, []);

    return (
        <>
            <a className={landingAnchor || ''} />
            <section className={landingAnchor || ''}>
                {!displayMobileAnimation && (
                    <motion.div
                        animate={{ opacity: 1 }}
                        className="content"
                        initial={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <Animation
                            animationUrl={landingHeading?.url || ''}
                            customClass="animation-header home"
                            renderer="svg"
                        />
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
                    </motion.div>
                )}
                <div
                    className={`animation ${
                        displayMobileAnimation ? 'visible' : ''
                    }`.trim()}
                >
                    {loading && <Spinner />}
                    <Animation
                        animationUrl={landingAnimation?.url || ''}
                        loop={true}
                        onLoaded={() => setLoading(false)}
                    />
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
                        href={`#${featuredAnchor || ''}`}
                    >
                        <CaretDownIcon />
                    </a>
                )}
            </section>
        </>
    );
};

export default ContentLanding;

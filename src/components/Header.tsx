import { graphql, useStaticQuery } from 'gatsby';
import * as React from 'react';
import { FC, useEffect, useRef, useState } from 'react';

import BurgerIcon from '../icons/burger.svg';
import CloseIcon from '../icons/cross.svg';
import Link from './Link';

const Header: FC = () => {
    const data: Queries.HeaderQuery = useStaticQuery(graphql`
        query Header {
            file(name: { eq: "icon_black" }) {
                publicURL
            }
            contentfulLandingSection {
                anchor
                linkName
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
                linkName
            }
            contentfulSkillsSection {
                anchor
                linkName
            }
            contentfulContactSection {
                anchor
                linkName
            }
        }
    `);

    if (
        !data.contentfulLandingSection ||
        !data.contentfulWorkSection ||
        !data.contentfulSkillsSection ||
        !data.contentfulContactSection
    ) {
        return null;
    }

    const landing = data.contentfulLandingSection;
    const work = data.contentfulWorkSection;
    const skills = data.contentfulSkillsSection;
    const contact = data.contentfulContactSection;

    const headerRef = useRef<HTMLHeadingElement>(null);
    const blurRef = useRef<HTMLDivElement>(null);
    const [focusedAnchor, setfocusedAnchor] = useState<string>(
        landing.anchor || ''
    );
    const [activeAnchor, setActiveAnchor] = useState<string | null>();
    const [displayDrawer, setDisplayDrawer] = useState(false);

    const anchors = [
        landing.anchor || '',
        work.anchor || '',
        skills.anchor || '',
        contact.anchor || '',
    ];

    useEffect(() => {
        history.scrollRestoration = 'manual';
        if (!location.hash) {
            const section = document.querySelector(`.${landing.anchor}`);
            if (section) {
                scrollIntoView(
                    section,
                    location.hash.substring(1) || landing.anchor || ''
                );
            }
        }

        const onScroll = () => {
            if (headerRef.current) {
                if (scrollY > 0) {
                    headerRef.current.classList.add('visible');
                } else {
                    setSection(landing.anchor || '');
                    headerRef.current.classList.remove('visible');
                }
                if (innerHeight + scrollY >= document.body.offsetHeight) {
                    setSection(contact.anchor || '');
                }
            }
        };
        addEventListener('scroll', onScroll);

        const onOutsideClick = (e: MouseEvent) => {
            if (e.target === blurRef.current) {
                setDisplayDrawer(false);
            }
        };
        addEventListener('mousedown', onOutsideClick);

        const onHashChange = (e: HashChangeEvent) => {
            e.preventDefault();
            const section = document.querySelector(
                `a.${location.hash.substring(1) || landing.anchor}`
            );
            if (section) {
                scrollIntoView(
                    section,
                    location.hash.substring(1) || landing.anchor || ''
                );
            }
        };
        addEventListener('hashchange', onHashChange);

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setSection(entries[0].target.className);
                }
            },
            {
                rootMargin: '-50% 0% -50% 0%',
            }
        );
        anchors.forEach((anchor) => {
            observer.observe(
                document.querySelector(`section.${anchor}`) as any
            );
        });

        return () => {
            removeEventListener('scroll', onScroll);
            removeEventListener('hashchange', onHashChange);
            anchors.forEach((anchor) => {
                observer.unobserve(
                    document.querySelector(`section.${anchor}`) as any
                );
            });
            removeEventListener('mousedown', onOutsideClick);
        };
    }, []);

    const getAnchorClass = (anchor: string | null): string => {
        if (activeAnchor) {
            return activeAnchor === anchor ? 'focused' : '';
        }
        return focusedAnchor === anchor ? 'focused' : '';
    };

    const scrollIntoView = (section: Element, anchor: string) => {
        section?.scrollIntoView({
            behavior: 'smooth',
        });
        setSection(anchor);
    };

    const setSection = (anchor: string) => {
        setfocusedAnchor(anchor);
        if (location.hash !== `#${anchor}`) {
            history.pushState({}, '', `#${anchor}`);
        }
    };

    const anchorClicked = (anchor: string) => {
        setActiveAnchor(anchor);
        setDisplayDrawer(false);
        setTimeout(() => {
            setActiveAnchor(null);
        }, 1000);
    };

    const renderLinks = () => {
        return (
            <>
                <a
                    className={`header-link ${getAnchorClass(
                        landing.anchor
                    )}`.trim()}
                    href={`#${landing.anchor || ''}`}
                    onClick={() => anchorClicked(landing.anchor || '')}
                >
                    {landing.linkName || ''}
                </a>
                <a
                    className={`header-link ${getAnchorClass(
                        work.anchor
                    )}`.trim()}
                    href={`#${work.anchor || ''}`}
                    onClick={() => anchorClicked(work.anchor || '')}
                >
                    {work.linkName || ''}
                </a>
                <a
                    className={`header-link ${getAnchorClass(
                        skills.anchor
                    )}`.trim()}
                    href={`#${skills.anchor || ''}`}
                    onClick={() => anchorClicked(skills.anchor || '')}
                >
                    {skills.linkName || ''}
                </a>
                <a
                    className={`header-link ${getAnchorClass(
                        contact.anchor
                    )}`.trim()}
                    href={`#${contact.anchor || ''}`}
                    onClick={() => anchorClicked(contact.anchor || '')}
                >
                    {contact.linkName || ''}
                </a>
            </>
        );
    };

    return (
        <>
            <header ref={headerRef}>
                <div>
                    <img src={data.file?.publicURL || ''} />
                    <nav>{renderLinks()}</nav>
                </div>
                <a
                    aria-label={'Show navigation'}
                    className="link nav"
                    onClick={() => setDisplayDrawer(!displayDrawer)}
                >
                    {displayDrawer ? <CloseIcon /> : <BurgerIcon />}
                </a>
            </header>
            <div
                className={`blur ${displayDrawer ? 'visible' : ''}`.trim()}
                ref={blurRef}
            />
            <nav
                className={`drawer-nav ${
                    displayDrawer ? 'visible' : ''
                }`.trim()}
            >
                <img src={data.file?.publicURL || ''} />
                {renderLinks()}
                <div className="links">
                    {data.contentfulLandingSection.links?.map((link) => (
                        <Link
                            href={link?.url || ''}
                            icon={link?.icon?.url || ''}
                            key={link?.title}
                            title={link?.title || ''}
                        />
                    ))}
                </div>
            </nav>
        </>
    );
};

export default Header;

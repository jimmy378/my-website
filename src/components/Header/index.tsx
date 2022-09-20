import './styles.scss';

import { motion, PanInfo, useDragControls } from 'framer-motion';
import { graphql, useStaticQuery } from 'gatsby';
import * as React from 'react';
import { FC, useEffect, useRef, useState } from 'react';

import BurgerIcon from '../../icons/burger.svg';
import CloseIcon from '../../icons/cross.svg';
import Link from '../Link';

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
    const [scrollPos, setScrollPos] = useState(0);
    const dragControls = useDragControls();

    const anchors = [
        { anchor: landing.anchor || '', linkName: landing.linkName },
        { anchor: work.anchor || '', linkName: work.linkName },
        { anchor: skills.anchor || '', linkName: skills.linkName },
        { anchor: contact.anchor || '', linkName: contact.linkName },
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
            setScrollPos(scrollY);
            if (headerRef.current) {
                if (scrollY > 0) {
                    headerRef.current.classList.add('visible');
                } else {
                    setSection(landing.anchor || '');
                    headerRef.current.classList.remove('visible');
                }
                if (innerHeight + scrollY >= document.body.offsetHeight - 1) {
                    setSection(contact.anchor || '');
                    const firstInput = document.querySelector('input');
                    if (firstInput) {
                        setTimeout(() => {
                            firstInput.focus();
                        }, 0);
                    }
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
                document.querySelector(`section.${anchor.anchor}`) as any
            );
        });

        return () => {
            removeEventListener('scroll', onScroll);
            removeEventListener('hashchange', onHashChange);
            anchors.forEach((anchor) => {
                observer.unobserve(
                    document.querySelector(`section.${anchor.anchor}`) as any
                );
            });
            removeEventListener('mousedown', onOutsideClick);
        };
    }, []);

    useEffect(() => {
        if (displayDrawer) {
            document.body.classList.add('drawer-open');
        } else {
            document.body.classList.remove('drawer-open');
        }
    }, [displayDrawer]);

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
        return anchors.map((anchor) => (
            <a
                className={`header-link ${getAnchorClass(
                    anchor.anchor
                )}`.trim()}
                href={`#${anchor.anchor || ''}`}
                key={anchor.linkName}
                onClick={() => anchorClicked(anchor.anchor || '')}
                tabIndex={scrollPos > 0 ? 0 : -1}
            >
                {anchor.linkName || ''}
            </a>
        ));
    };

    const onDragEnd = (e: PointerEvent, info: PanInfo) => {
        const offset = info.offset.x;
        if (offset > 25) {
            setDisplayDrawer(false);
        }
    };

    const startDrag = (event: React.PointerEvent<HTMLDivElement>) => {
        console.log(event);
        dragControls.start(event, { snapToCursor: false });
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
            <motion.nav
                animate={{
                    boxShadow: displayDrawer
                        ? '24px 0 42px rgba(0, 18, 53, 0.1)'
                        : '24px 0 42px rgba(0, 18, 53, 0)',
                    x: displayDrawer ? 0 : innerWidth * 0.7,
                }}
                className={`drawer-nav ${
                    displayDrawer ? 'visible' : ''
                }`.trim()}
                drag="x"
                dragConstraints={{
                    bottom: 0,
                    left: 0,
                    right: 0,
                    top: 0,
                }}
                dragControls={dragControls}
                dragElastic={{ left: 0, right: 0.5 }}
                dragListener={false}
                initial={{
                    boxShadow: '24px 0 42px rgba(0, 18, 53, 0)',
                    x: innerWidth * 0.7,
                }}
                onDragEnd={onDragEnd}
                transition={{
                    duration: 0.5,
                    ease: 'easeOut',
                    type: 'tween',
                }}
            >
                <div
                    className="closer"
                    onClick={() => setDisplayDrawer(false)}
                    onPointerDown={startDrag}
                />
                <div className="slider" onPointerDown={startDrag} />
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
            </motion.nav>
        </>
    );
};

export default Header;

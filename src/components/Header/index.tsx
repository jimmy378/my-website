import './styles.scss';

import { motion, PanInfo, useDragControls } from 'framer-motion';
import { graphql, useStaticQuery } from 'gatsby';
import * as React from 'react';
import { FC, useEffect, useRef, useState } from 'react';

import BurgerIcon from '../../icons/burger.svg';
import CloseIcon from '../../icons/cross.svg';
import Link from '../Link';

type Props = {
    isHomePage?: boolean;
};

const Header: FC<Props> = ({ isHomePage = true }) => {
    const data: Queries.HeaderQuery = useStaticQuery(graphql`
        query Header {
            file(name: { eq: "icon_black" }) {
                publicURL
            }
            contentfulHomePage {
                landingSection
                landingAnchor
                links {
                    url
                    title
                    icon {
                        url
                        title
                    }
                }
                workSection
                workAnchor
                skillsSection
                skillsAnchor
                contactSection
                contactAnchor
            }
        }
    `);

    if (!data.contentfulHomePage) {
        return null;
    }

    const {
        contactAnchor,
        contactSection,
        landingAnchor,
        landingSection,
        links,
        skillsAnchor,
        skillsSection,
        workAnchor,
        workSection,
    } = data.contentfulHomePage;

    const headerRef = useRef<HTMLHeadingElement>(null);
    const blurRef = useRef<HTMLDivElement>(null);
    const [focusedAnchor, setfocusedAnchor] = useState<string>(
        landingAnchor || ''
    );
    const [activeAnchor, setActiveAnchor] = useState<string | null>();
    const [displayDrawer, setDisplayDrawer] = useState(false);
    const [scrollPos, setScrollPos] = useState(0);
    const dragControls = useDragControls();

    const anchors = [
        { anchor: workAnchor || '', linkName: workSection },
        { anchor: skillsAnchor || '', linkName: skillsSection },
        { anchor: contactAnchor || '', linkName: contactSection },
    ];

    if (isHomePage) {
        anchors.unshift({
            anchor: landingAnchor || '',
            linkName: landingSection,
        });
    }

    useEffect(() => {
        history.scrollRestoration = 'manual';
        if (!location.hash) {
            const section = document.querySelector(`.${landingAnchor}`);
            if (section) {
                scrollIntoView(
                    section,
                    location.hash.substring(1) || landingAnchor || ''
                );
            }
        } else {
            const section = document.querySelector(
                `.${location.hash.substring(1) || landingAnchor || ''}`
            );
            if (section) {
                scrollIntoView(
                    section,
                    location.hash.substring(1) || landingAnchor || ''
                );
            }
        }

        const onScroll = () => {
            setScrollPos(scrollY);
            if (headerRef.current) {
                if (scrollY > 0) {
                    headerRef.current.classList.add('visible');
                } else {
                    setSection(landingAnchor || '');
                    headerRef.current.classList.remove('visible');
                }
                if (innerHeight + scrollY >= document.body.offsetHeight - 1) {
                    setSection(contactAnchor || '');
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
                `a.${location.hash.substring(1) || landingAnchor}`
            );
            if (section) {
                scrollIntoView(
                    section,
                    location.hash.substring(1) || landingAnchor || ''
                );
            }
        };
        addEventListener('hashchange', onHashChange);

        let observer: IntersectionObserver;
        if (isHomePage) {
            observer = new IntersectionObserver(
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
        }

        return () => {
            removeEventListener('scroll', onScroll);
            removeEventListener('hashchange', onHashChange);
            removeEventListener('mousedown', onOutsideClick);
            if (isHomePage && observer) {
                anchors.forEach((anchor) => {
                    observer.unobserve(
                        document.querySelector(
                            `section.${anchor.anchor}`
                        ) as any
                    );
                });
            }
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
                href={
                    isHomePage
                        ? `#${anchor.anchor || ''}`
                        : `${window.location.origin}#${anchor.anchor}`
                }
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
        dragControls.start(event, { snapToCursor: false });
    };

    return (
        <>
            <header className={isHomePage ? 'home-page' : ''} ref={headerRef}>
                <div>
                    <a href="/">
                        <img src={data.file?.publicURL || ''} />
                    </a>
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
                    {links?.map((link) => (
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

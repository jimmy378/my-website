import { graphql, useStaticQuery } from 'gatsby';
import * as React from 'react';
import { FC, useEffect, useRef } from 'react';

const Header: FC = () => {
    const data: Queries.HeaderQuery = useStaticQuery(graphql`
        query Header {
            file(name: { eq: "icon_black" }) {
                publicURL
            }
            contentfulLandingSection {
                anchor
                linkName
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

    const headerRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const onScroll = () => {
            if (headerRef.current) {
                if (scrollY > 0) {
                    headerRef.current.classList.add('visible');
                } else {
                    headerRef.current.classList.remove('visible');
                }
            }
        };
        addEventListener('scroll', onScroll);

        return () => {
            removeEventListener('scroll', onScroll);
        };
    }, []);

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

    return (
        <header ref={headerRef}>
            <div>
                <img src={data.file?.publicURL || ''} />
                <nav>
                    <a href={`#${landing.anchor || ''}`}>
                        {landing.linkName || ''}
                    </a>
                    <a href={`#${work.anchor || ''}`}>{work.linkName || ''}</a>
                    <a href={`#${skills.anchor || ''}`}>
                        {skills.linkName || ''}
                    </a>
                    <a href={`#${contact.anchor || ''}`}>
                        {contact.linkName || ''}
                    </a>
                </nav>
            </div>
        </header>
    );
};

export default Header;

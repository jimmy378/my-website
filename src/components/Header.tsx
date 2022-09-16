import { graphql, useStaticQuery } from 'gatsby';
import * as React from 'react';

const Header: React.FC = () => {
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
        <header>
            <div>
                <img src={data.file?.publicURL || ''} />
                <div>
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
                </div>
            </div>
        </header>
    );
};

export default Header;

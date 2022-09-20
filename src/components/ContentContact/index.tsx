import './styles.scss';

import { graphql, useStaticQuery } from 'gatsby';
import lottie from 'lottie-web';
import * as React from 'react';
import { FC, useEffect, useRef, useState } from 'react';

import Spinner from '../Spinner';

const ContentContact: FC = () => {
    const data: Queries.ContactQuery = useStaticQuery(graphql`
        query Contact {
            contentfulContactSection {
                anchor
                animation {
                    url
                }
                linkName
            }
        }
    `);

    if (!data.contentfulContactSection) {
        return null;
    }

    const { anchor, animation, linkName } = data.contentfulContactSection;
    const playerRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const anim = lottie.loadAnimation({
            autoplay: true,
            container: playerRef.current as any,
            loop: true,
            path: animation?.url || '',
            renderer: 'svg',
            rendererSettings: {
                preserveAspectRatio: 'xMidYMax',
            },
        });

        const onDomLoaded = () => {
            setLoading(false);
        };
        anim.addEventListener('DOMLoaded', () => onDomLoaded());

        return () => {
            anim.removeEventListener('DOMLoaded', () => onDomLoaded());
            anim.destroy();
        };
    }, []);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <>
            <a className={anchor || ''} />
            <section className={anchor || ''}>
                <div className="content">
                    <h1>{linkName || ''}</h1>
                    <form onSubmit={onSubmit}>
                        <span className="input">
                            <input
                                id="name"
                                name="name"
                                required
                                type="text"
                            ></input>
                            <label htmlFor="name">{'Name'}</label>
                            <span />
                        </span>
                        <span className="input">
                            <input
                                id="email"
                                inputMode="email"
                                name="email"
                                required
                                type="email"
                            />
                            <label htmlFor="email">{'Email'}</label>
                            <span />
                        </span>
                        <span className="input">
                            <textarea id="message" name="message" required />
                            <label htmlFor="message">{'Message'}</label>
                            <span />
                        </span>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
                <div className="animation">
                    {loading && <Spinner />}
                    <div className="player" ref={playerRef} />
                </div>
            </section>
        </>
    );
};

export default ContentContact;

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
    const [sendMessage, setSendMessage] = useState('');

    useEffect(() => {
        const anim = lottie.loadAnimation({
            autoplay: true,
            container: playerRef.current as any,
            loop: true,
            path: animation?.url || '',
            renderer: 'canvas',
            rendererSettings: {
                preserveAspectRatio: 'xMidYMin meet',
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
        const form = e.target as HTMLFormElement;
        const data = new FormData(form);
        const xhr = new XMLHttpRequest();
        xhr.open(form.method, form.action);
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.onreadystatechange = () => {
            if (xhr.readyState !== XMLHttpRequest.DONE) return;
            if (xhr.status === 200) {
                form.reset();
                setSendMessage('Message sent');
            } else {
                setSendMessage('Message not sent');
            }
        };
        xhr.send(data);
    };

    return (
        <>
            <a className={anchor || ''} />
            <section className={anchor || ''}>
                <div className="content">
                    <h1>{linkName || ''}</h1>
                    <form
                        action="#"
                        data-netlify="true"
                        id="contact"
                        method="POST"
                        name="contact"
                        onSubmit={onSubmit}
                    >
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
                        <div>
                            {sendMessage && <p>{sendMessage}</p>}
                            <input type="submit" value="Submit" />
                        </div>
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

import './styles.scss';

import { useInView } from 'framer-motion';
import lottie, { AnimationItem } from 'lottie-web';
import React, { FC, useEffect, useRef, useState } from 'react';

type Props = {
    animationUrl: string;
    customClass?: string;
    loop?: boolean;
    onLoaded?: () => void;
    ref?: React.RefObject<HTMLDivElement>;
    renderer?: 'canvas' | 'svg';
    triggerOnEnter?: boolean;
};

const Animation: FC<Props> = ({
    animationUrl,
    customClass = '',
    loop = false,
    onLoaded = () => {
        //
    },
    ref,
    renderer = 'canvas',
    triggerOnEnter = false,
}) => {
    const playerRef = ref || useRef<HTMLDivElement>(null);
    const inView = useInView(playerRef);
    const [animation, setAnimation] = useState<AnimationItem>();

    useEffect(() => {
        const anim = lottie.loadAnimation({
            autoplay: !triggerOnEnter,
            container: playerRef.current as any,
            loop: loop,
            path: animationUrl,
            renderer: renderer,
        });
        const onDomLoaded = () => {
            onLoaded();
        };
        anim.addEventListener('DOMLoaded', () => onDomLoaded());

        const handleResize = () => {
            (lottie as any).resize();
        };
        addEventListener('resize', handleResize);
        addEventListener('orientationchange', handleResize);
        setAnimation(anim);
        return () => {
            anim.removeEventListener('DOMLoaded', () => onDomLoaded());
            anim.destroy();
            removeEventListener('resize', handleResize);
            removeEventListener('orientationchange', handleResize);
        };
    }, []);

    useEffect(() => {
        if (inView) {
            animation?.play();
        }
    }, [inView]);

    return (
        <div className={`player ${customClass}`.trim()} ref={playerRef}></div>
    );
};

export default Animation;

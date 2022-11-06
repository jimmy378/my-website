import './styles.scss';

import React, { FC, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import CloseIcon from '../../icons/cross.svg';

type Props = {
    children: any;
    onClose: () => void;
};

const Modal: FC<Props> = ({ children, onClose }) => {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (ref.current) {
                if (!ref.current?.contains(e.target as any)) {
                    onClose();
                }
            }
        };
        document.body.classList.add('modal-open');
        window.addEventListener('mousedown', handleClick);
        return () => {
            document.body.classList.remove('modal-open');
            window.removeEventListener('mousedown', handleClick);
        };
    }, []);

    let element = document.getElementById('modal');
    if (!element) {
        const wrapperElement = document.createElement('div');
        wrapperElement.setAttribute('id', 'modal');
        document.body.appendChild(wrapperElement);
        element = wrapperElement;
    }
    return createPortal(
        <>
            <CloseIcon />
            <div className="modal-content" ref={ref}>
                {children}
            </div>
        </>,
        element
    );
};

export default Modal;

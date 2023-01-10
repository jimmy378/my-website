import './Modal.scss';

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
        document.body.classList.add('modal-open');
        return () => {
            document.body.classList.remove('modal-open');
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
            <div className="close-area" onClick={() => onClose()} />
            <CloseIcon />
            <div className="frame" ref={ref}>
                <div className="content">{children}</div>
            </div>
        </>,
        element
    );
};

export default Modal;

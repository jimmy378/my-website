import './styles.scss';

import React, { useEffect, useRef, useState } from 'react';

import CaretDownIcon from '../../icons/caret_down.svg';

type Props = {
    onSelect: (option: string) => void;
    options: {
        selected: boolean;
        text: string;
    }[];
    title: string;
};

const Dropdown: React.FC<Props> = ({ onSelect, options, title }) => {
    const [showOptions, setShowOptions] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if (e.target && !dropdownRef.current?.contains(e.target as any)) {
                setShowOptions(false);
            }
        };
        addEventListener('mousedown', handleOutsideClick);
        return () => {
            removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    return (
        <div className="dropdown" ref={dropdownRef}>
            <button onClick={() => setShowOptions(!showOptions)}>
                {title}
                <CaretDownIcon />
            </button>
            {showOptions && (
                <ul>
                    {options.map((option) => (
                        <li
                            className={option.selected ? 'selected' : ''}
                            key={option.text}
                            onClick={() => onSelect(option.text)}
                        >
                            {option.text}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Dropdown;

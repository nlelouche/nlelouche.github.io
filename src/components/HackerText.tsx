import { useState, useEffect, useRef } from 'react';

interface HackerTextProps {
    text: string;
    className?: string;
    speed?: number;
}

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';

const HackerText = ({ text, className = '', speed = 30 }: HackerTextProps) => {
    const [displayText, setDisplayText] = useState('');
    const iterationRef = useRef(0);
    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        // Reset on text change
        iterationRef.current = 0;
        setDisplayText(text.split('').map(() => characters[Math.floor(Math.random() * characters.length)]).join(''));

        // Clear any existing interval
        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setDisplayText(() =>
                text
                    .split('')
                    .map((_char, index) => {
                        if (index < iterationRef.current) {
                            return text[index];
                        }
                        return characters[Math.floor(Math.random() * characters.length)];
                    })
                    .join('')
            );

            if (iterationRef.current >= text.length) {
                if (intervalRef.current) clearInterval(intervalRef.current);
            }

            iterationRef.current += 1 / 3; // 3 frames per letter to resolve
        }, speed);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [text, speed]);

    return <span className={className}>{displayText}</span>;
};

export default HackerText;

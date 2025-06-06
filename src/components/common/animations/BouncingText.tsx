import { useEffect, useRef } from 'react';

import * as animationStyles from '../../../styles/animations.module.css';

interface BouncingTextProps {
  text: string;
  className?: string;
}

export default function BouncingText({ className, text }: BouncingTextProps) {
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!textRef.current) return;
    const textElement = textRef.current as HTMLDivElement;
    textElement.innerHTML = '';

    text.split('').forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.style.animationDelay = `${index * 0.05}s`;
      textElement.appendChild(span);
    });
  }, [text]);

  return (
    <div
      className={`${animationStyles.bouncingText} ${className}`}
      ref={textRef}
    >
      {text}
    </div>
  );
}

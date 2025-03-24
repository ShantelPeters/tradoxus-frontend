"use client"

import type { ReactNode, MouseEvent } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  href: string;
  className?: string;
}

const Button = ({ children, onClick, href, className }: ButtonProps) => {
    return (
        <a
            href={href}
            onClick={onClick}
            className={className}
            style={!className ? {
                padding: '0.5rem 1rem',
                backgroundColor: '#ff4757',
                color: '#fff',
                borderRadius: '4px',
                textDecoration: 'none',
                display: 'inline-block',
            } : undefined}
        >
            {children}
        </a>
    );
};

export type { ButtonProps };
export default Button; 
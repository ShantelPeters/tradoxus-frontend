import React from 'react';

const Text = ({ as: Component = 'p', children, className }) => {
    return (
        <Component className={className} style={{ color: '#fff' }}>
            {children}
        </Component>
    );
};

export default Text; 
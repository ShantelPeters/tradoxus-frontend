import React from 'react';

const Grid = ({ children, columns = 2 }) => {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: '1rem' }}>
            {children}
        </div>
    );
};

export default Grid; 
import React from 'react';

const Section = ({ title, children }) => {
    return (
        <div style={{ margin: '2rem 0' }}>
            <h2 style={{ color: '#fff' }}>{title}</h2>
            {children}
        </div>
    );
};

export default Section; 
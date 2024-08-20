import React from 'react';

const HomeMaxWidthContainer = ({ children }) => {
    return (
        <div className="max-w-screen-xl mx-auto px-4">
            {children}
        </div>
    );
};

export default HomeMaxWidthContainer;

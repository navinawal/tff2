import React from 'react';
import './BokehBackground.css'; // Ensure this path is correct

const BokehBackground = () => {
    return (
        <div className="bokeh-background">
            {/* Increase the number of bokeh elements */}
            {Array.from({ length: 10 }).map((_, index) => (
                <div className="bokeh" key={index}></div>
            ))}
        </div>
    );
};

export default BokehBackground;
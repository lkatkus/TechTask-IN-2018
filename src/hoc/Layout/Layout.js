// Dependency imports
import React from 'react';

// Asset imports
import classes from './Layout.css'

// Component
const layout = (props) => {
    return (
        <div className={classes.layoutContainer}>
            {props.children}
        </div>
    );
};

export default layout;
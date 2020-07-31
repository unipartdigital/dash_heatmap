import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ title, className, id, onClick, children }) => {
    return (
        <button
          title={title}
          className={`hm-btn ${className}`}
          id={id}
          onClick={onClick}
        >
          {children}
        </button>
    );
};

Button.propTypes = {
    /**
     * The title of the Button
     */
    title: PropTypes.string.isRequired,
    /**
    * The CSS class(es)
    */
    className: PropTypes.string.isRequired,
    /**
     * The ID
     */
    id: PropTypes.string.isRequired,
    /**
     * The onClick function
     */
    onClick: PropTypes.func.isRequired,
    /**
     * Children
     */
    children: PropTypes.node.isRequired
};

export default Button;
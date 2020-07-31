import React from 'react';
import PropTypes from 'prop-types';
import InitHeatmap from './heatmap/initHeatmap';

/**
 * DashHeatmap calls the init component
 * Seperated out so props are more visable
 */
const DashHeatmap = ({ id, width, svg, data, loading_state, className }) => {
    return (
        <div 
            data-dash-is-loading={
                // eslint-disable-next-line no-undefined
                (loading_state && loading_state.is_loading) || undefined
            }
            style={{width: width}} id={`lm-${id}`}
            className={className}
        >
            {data && data.colour_map && data.bays.length &&
                <InitHeatmap 
                    id={id}
                    svg={svg}
                    data={data}
                />
            }
        </div>
    );
};

DashHeatmap.defaultProps = {};

// Pass in these props from Dash or 
// during JS dev from ../demo/App.js
DashHeatmap.propTypes = {
    /**
     * The id of the SVG
     */
    id: PropTypes.string.isRequired,
    /**
     * The width of the SVG container (%)
     */
    width: PropTypes.string.isRequired,
    /**
     * The SVG image.
     */
    svg: PropTypes.string.isRequired,
    /**
     * The data object that generates the SVG
     */
    data: PropTypes.object,
    /**
     * Dash-assigned callback that should be called to report property changes
     * to Dash, to make them available for callbacks.
     */
    setProps: PropTypes.func,
    /**
     * Object that holds the loading state object coming from dash-renderer
     */
    loading_state: PropTypes.shape({
        /**
         * Determines if the component is loading or not
         */
        is_loading: PropTypes.bool,
        /**
         * Holds which property is loading
         */
        prop_name: PropTypes.string,
        /**
         * Holds the name of the component that is loading
         */
        component_name: PropTypes.string,
    }),
    /**
     * Additional CSS classes for the heatmap root div element
     */
    className: PropTypes.string,
};

export default DashHeatmap;

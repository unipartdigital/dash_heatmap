import React from 'react';
import PropTypes from 'prop-types';
import Button from './button';

/**
 * Zoom and Pan Controls Component
 */
const SvgControls = ({ id, zoom }) => {
    return (
        <div className="controls">
          <Button
            title="Make Map Larger"
            className="hm-btn-zoom"
            id={`${id}-zoom-in`}
            onClick={() => zoom.scale({ scaleX: 1.25, scaleY: 1.25 })}
          >
            +
          </Button>
          <Button
            title="Make Map Smaller"
            className="hm-btn-zoom hm-btn-bottom"
            id={`${id}-zoom-out`}
            onClick={() => zoom.scale({ scaleX: 0.75, scaleY: 0.75 })}
          >
            -
          </Button>
          <Button
            title="Center Map" 
            className="hm-btn-lg" 
            id={`${id}-center`}
            onClick={zoom.center}
          >
            Center
          </Button>
          <Button 
            title="Reset Map"
            className="hm-btn-lg" 
            id={`${id}-reset`}
            onClick={zoom.reset}
          >
            Reset
          </Button>
        </div>
    );
};

SvgControls.propTypes = {
    /**
     * The id of the SVG
     */
    id: PropTypes.string.isRequired,
    /**
    * The zoom object
    */
    zoom: PropTypes.object.isRequired,
};

export default SvgControls;
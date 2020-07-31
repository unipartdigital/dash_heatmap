import React, { useRef, useLayoutEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import regeneratorRuntime from "regenerator-runtime";
import PropTypes from 'prop-types';
import Heatmap from './heatmap';

/**
 * InitHeatmap calls the Heatmap component
 * with the svg, width and data
 */
const InitHeatmap = ({ id, svg, data }) => {
    const heatmapRef = useRef();
    const [width, setWidth] = useState(0);
  
    // Converts percentage width to pixel
    useLayoutEffect(() => {
        if (heatmapRef.current) {
            setWidth(heatmapRef.current.offsetWidth);
        }
    }, []);

    return (
        <>
        { data &&
            <div ref={heatmapRef}>
                <Heatmap 
                    id={id}
                    width={width}
                    svg={svg}
                    data={data}
                />
            </div>
            }
        </>
    );
};


InitHeatmap.propTypes = {
    /**
     * The id of the SVG
     */
    id: PropTypes.string.isRequired,
    /**
     * The SVG image.
     */
    svg: PropTypes.string.isRequired,
    /**
     * The data object that generates the SVG
     */
    data: PropTypes.PropTypes.shape({
        colour_map: PropTypes.object.isRequired,
        bays: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string.isRequired,
                metric: PropTypes.number.isRequired,
                speed: PropTypes.string.isRequired,
                desc: PropTypes.arrayOf(
                        PropTypes.shape({
                            label: PropTypes.string.isRequired,
                            metric: PropTypes.number.isRequired,
                        })
                ).isRequired,
            })
        ).isRequired,
    }).isRequired,
    /**
     * Dash-assigned callback that should be called to report property changes
     * to Dash, to make them available for callbacks.
     */
    setProps: PropTypes.func
};

export default InitHeatmap;

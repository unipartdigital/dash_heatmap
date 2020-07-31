import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { select as d3Select } from 'd3-selection';
import { xml as d3Xml } from 'd3';
import { Zoom } from '@vx/zoom';
import { TEXT_MARGIN_LEFT, SVG_MARGIN, INITIAL_TRANSFORM } from './consts';
import { getBays, getColorMap, getSpeed, getLabel, getTextId, getDescId } from './accessors';
import { formatDesc, handleMouseOver, handleMouseOut } from './helpers';
import SvgControls from './svgControls';
import MapKey from './mapKey';
import './heatmap.css';

/**
 * Heatmap component.
 * It takes an warehouse layout (svg) 
 * and overlays the data supplied
 */
const Heatmap = ({ id, width, svg, data }) => {
  const svgContainer = useRef();
  const targetNode = d3Select(svgContainer.current).node();
  const bays = getBays(data);
  const colorMap = getColorMap(data);
  const [height, setHeight] = useState(0);

  const displaySvg = async (bayArr, colorObj) => {
    try {
      const svgData = await d3Xml(svg);
      const svgElements = svgData.documentElement;

      if (svgElements) {
        for (const bay of bayArr) {
          const bayPathElement = svgElements.getElementById(getLabel(bay));
          if (bayPathElement) {
            d3Select(bayPathElement)
              .attr("fill", colorObj[getSpeed(bay)]);

            d3Select(bayPathElement).node().classList.add("bay");

            const bayX = d3Select(bayPathElement).attr("x");
            const bayY = d3Select(bayPathElement).attr("y");

            d3Select(svgElements)
              .append("text")
              .attr("x", bayX)
              .attr("y", bayY)
              .attr("dx", TEXT_MARGIN_LEFT)
              .text(formatDesc(bay))
              .attr("class", "hidden")
              .attr("id", getDescId(bay, id));

            d3Select(bayPathElement)
              .on("mouseover", () => handleMouseOver(bay, id))
              .on("mouseout", () => handleMouseOut(bay, id))
              .append("svg:title")
              .text(formatDesc(bay));

            // NB(Rich): Use child selector?
            const textPathElement = svgElements.getElementById(getTextId(bay));
            if (textPathElement) {
              d3Select(textPathElement).node().classList.add("label");

              d3Select(textPathElement)
                .on("mouseover", () => handleMouseOver(bay, id))
                .on("mouseout", () => handleMouseOut(bay, id));
            } else {
              // Uncomment this line if we want instant failure
              // throw Error(`Could not find text: ${getTextId(bay)}`)
              console.error(`Could not find text: ${getTextId(bay)}`);
            }
          } else {
            // Uncomment this line if we want instant failure
            // throw Error(`Could not find bay: ${getLabel(bay)}`)
            console.error(`Could not find bay: ${getLabel(bay)}`);
          }
        }

        const svgWidth = svgElements.getAttribute('width');
        const svgHeight = svgElements.getAttribute('height');
        const scaledHeight = Math.round(svgHeight / (svgWidth / width));
        setHeight(scaledHeight + SVG_MARGIN);

        svgElements.removeAttribute("width");
        svgElements.removeAttribute("height");

        svgElements
          .setAttribute("id", id);

        d3Select(svgContainer.current).node().append(svgElements);
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    if (width !== 0 && bays.length) {
      displaySvg(bays, colorMap);
    }
  }, [bays, width]);

  return width < 10 ? null : (
    <Zoom
      width={width}
      height={height}
      transformMatrix={INITIAL_TRANSFORM}
    >
      {zoom => (
        <div className="relative">
          <svg
            height={height}
            width={width}
            style={{ cursor: zoom.isDragging ? 'grabbing' : '' }}
            onMouseUp={zoom.dragEnd}
            onMouseEnter={zoom.dragEnd}
            onMouseDown={event => {
              // @vx/zoom uses the event's target to calculate the initial
              // position. Since the target depends of the mouse position,
              // force the target to be the container where the transformation
              // are being applied.
              event.target = targetNode;
              zoom.dragStart(event);
            }}
            onMouseMove={(event) => {
              if (zoom.isDragging) {
                event.target = targetNode;
                zoom.dragMove(event);
              }
            }}
            onWheel={event => {
              event.target = targetNode;
              zoom.handleWheel(event);
            }}
          >
            <rect
              width={width}
              height={height}
              fill="#f0f0f0"
            />
            <g
              id={`${id}-ref-container`}
              ref={svgContainer}
              transform={zoom.toString()}
            />
          </svg>
          <SvgControls id={id} zoom={zoom} />
          <MapKey colorMap={colorMap} />
        </div>
      )}
    </Zoom>
  );
};


Heatmap.propTypes = {
  /**
   * The id of the SVG
   */
  id: PropTypes.string.isRequired,
  /**
  * The width of the SVG
  */
  width: PropTypes.number.isRequired,
  /**
  * The SVG image.
  */
  svg: PropTypes.string.isRequired,
  /**
   * The data object that generates the SVG
   */
  data: PropTypes.object.isRequired,
};

export default Heatmap;

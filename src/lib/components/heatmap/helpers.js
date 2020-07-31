import { select as d3Select } from 'd3-selection';
import { TEXT_MARGIN_LEFT } from './consts';
import { getLabel, getDesc, getDescId, getDescContainerId } from './accessors';

export const formatDesc = (d) => {
    return getDesc(d)
      .map((prod) => `${prod.label}: ${prod.metric}`)
      .join(" | ");
};
  
export const handleMouseOver = (bay, svgId) => {
    const svg = document.getElementById(svgId);
    const container =  getDescId(bay, svgId);
    const bayPathDescElement = document.getElementById(container);
  
    const bayPathElement = document.getElementById(getLabel(bay));
    d3Select(bayPathElement).node().classList.add("bay-hover");
  
    const bbox = bayPathDescElement.getBBox();
    d3Select(svg)
      .append("rect")
      .attr("y", bbox.y)
      .attr("x", bbox.x-TEXT_MARGIN_LEFT)
      .attr("width", bbox.width)
      .attr("height", bbox.height)
      .attr("class", "bay-tooltip")
      .attr("id", getDescContainerId(bay, svgId))
      .raise();
  
    d3Select(bayPathDescElement)
      .attr("class", "bay-tooltip")
      .raise();
};
  
export const handleMouseOut = (bay, svgId) => {
    const container =  getDescId(bay, svgId);
    const bayPathDescElement = document.getElementById(container);

    // bay hover
    const bayPathElement = document.getElementById(getLabel(bay));
    d3Select(bayPathElement).node().classList.remove("bay-hover");

    d3Select(bayPathDescElement)
        .attr("class", "hidden");

    d3Select(document.getElementById(getDescContainerId(bay, svgId))).remove();
};

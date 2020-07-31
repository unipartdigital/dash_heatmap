// accessors
export const getBays = (d) => d.bays;

export const getColorMap = (d) => d.colour_map;

export const getSpeed = (d) => d.speed;

export const getLabel = (d) => String(d.label);

export const getDesc = (d) => d.desc;

export const getTextId = (d) => `text-${getLabel(d)}`;

export const getDescId = (d, svgId) => `${svgId}-desc-${getLabel(d)}`;

export const getDescContainerId = (d, svgId) => `${svgId}-desc-container-x-${getLabel(d)}`;

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Map Key Components
 */
const MapKey = ({ colorMap }) => {
    const [colorKey, setColorKey] = useState([]);

    useEffect(() => {
      for (const [name, hex] of Object.entries(colorMap)) {    
        setColorKey(colorKey => colorKey.concat(
          <span key={name} style={{backgroundColor: hex}}>{name}</span>
        ));
      }
    }, [])

    return (
      <div className="mapKey">
        {colorKey}
      </div>
    );
};

MapKey.propTypes = {
  /**
  * The colorMap object
  */
  colorMap: PropTypes.object.isRequired,
};

export default MapKey;

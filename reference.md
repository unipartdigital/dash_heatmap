# dash_heatmap.DashHeatmap Reference

**id** (string; required): The id of the SVG

**width** (string; required): The width of the SVG container (width + valid CSS unit, eg: 100%)

**svg** (string; required): The SVG image path relative to JavaScript imports

* The id of the SVG bay element *must* match the data dict bays label
* The id of the SVG bay element description *should* be prepended with 'text-' then match the data dict bays label
* Any valid SVG element can be drawn in your warehouse plan.
* [Inkscape](https://inkscape.org/) is a reasonable SVG editor

* Example
```python
<?xml version="1.0" encoding="utf-8"?>
<svg width="3400" height="1351" viewBox="0 -1200 3400 1351" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <rect x="0.5" y="120.5" width="50" height="30" id="SH1001"/>
  <text x="25.5" y="140.5" id="text-SH1001">SH1001</text>
  <rect x="0.5" y="60.5" width="50" height="30" id="SH1002"/>
  <text x="25.5" y="80.5" id="text-SH1002">SH1002</text>
</svg>
```

**data** (dict; optional): The data object that generates the SVG overlay

* data has the following type: dict containing keys 'colour_map', 'bays'.

* Those keys have the following types:
  - colour_map (dict; required)
  - bays (dict; required): bays has the following type: list of dicts containing keys 'label', 'metric', 'speed', 'desc'.

* Those keys have the following types:
  - label (string; required)
  - metric (number; required)
  - speed (string; required)
  - desc (dict; required): desc has the following type: list of dicts containing keys 'label', 'metric'.

* Those keys have the following types:
  - label (string; required)
  - metric (number; required)

* Example:
```python
{
  "colour_map": { 
      "slow": "#FF5533", 
      "medium": "#BBD2F2", 
      "fast": "#97CC04"
  },
  "bays": [
    {
        "label": "SH1001", 
        "metric": 35,
        "speed": "medium",
        "desc": [
            {"label": "PS1001", "metric": 20},
            {"label": "R12345", "metric": 10},
            {"label": "Q12345", "metric": 5}
        ]
    },
    {
        "label": "SH1002", 
        "metric": 30,
        "speed": "fast",
        "desc": [
            {"label": "YU1002", "metric": 30},
        ]
    },
 ]
}
```

**loading_state** (dict; optional): Object that holds the loading state object coming from dash-renderer. 

* loading_state has the following type: dict containing keys 'is_loading', 'prop_name', 'component_name'.
* Those keys have the following types:
  - is_loading (boolean; optional): Determines if the component is loading or not
  - prop_name (string; optional): Holds which property is loading
  - component_name (string; optional): Holds the name of the component that is loading

**className** (string; optional): Additional CSS classes for the heatmap root div element

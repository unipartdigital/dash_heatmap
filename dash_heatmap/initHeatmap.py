# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class initHeatmap(Component):
    """An initHeatmap component.
InitHeatmap calls the Heatmap component
with the svg, width and data

Keyword arguments:
- id (string; required): The id of the SVG
- svg (string; required): The SVG image.
- data (dict; required): The data object that generates the SVG. data has the following type: dict containing keys 'colour_map', 'bays'.
Those keys have the following types:
  - colour_map (dict; required)
  - bays (dict; required): bays has the following type: list of dicts containing keys 'label', 'metric', 'speed', 'desc'.
Those keys have the following types:
  - label (string; required)
  - metric (number; required)
  - speed (string; required)
  - desc (dict; required): desc has the following type: list of dicts containing keys 'label', 'metric'.
Those keys have the following types:
  - label (string; required)
  - metric (number; required)"""
    @_explicitize_args
    def __init__(self, id=Component.REQUIRED, svg=Component.REQUIRED, data=Component.REQUIRED, **kwargs):
        self._prop_names = ['id', 'svg', 'data']
        self._type = 'initHeatmap'
        self._namespace = 'dash_heatmap'
        self._valid_wildcard_attributes =            []
        self.available_properties = ['id', 'svg', 'data']
        self.available_wildcard_properties =            []

        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs
        args = {k: _locals[k] for k in _explicit_args if k != 'children'}

        for k in ['id', 'svg', 'data']:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')
        super(initHeatmap, self).__init__(**args)

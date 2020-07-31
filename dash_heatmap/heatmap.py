# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class heatmap(Component):
    """A heatmap component.
Heatmap component.
It takes an warehouse layout (svg) 
and overlays the data supplied

Keyword arguments:
- id (string; required): The id of the SVG
- width (number; required): The width of the SVG
- svg (string; required): The SVG image.
- data (dict; required): The data object that generates the SVG"""
    @_explicitize_args
    def __init__(self, id=Component.REQUIRED, width=Component.REQUIRED, svg=Component.REQUIRED, data=Component.REQUIRED, **kwargs):
        self._prop_names = ['id', 'width', 'svg', 'data']
        self._type = 'heatmap'
        self._namespace = 'dash_heatmap'
        self._valid_wildcard_attributes =            []
        self.available_properties = ['id', 'width', 'svg', 'data']
        self.available_wildcard_properties =            []

        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs
        args = {k: _locals[k] for k in _explicit_args if k != 'children'}

        for k in ['id', 'width', 'svg', 'data']:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')
        super(heatmap, self).__init__(**args)

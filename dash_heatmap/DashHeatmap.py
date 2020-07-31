# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class DashHeatmap(Component):
    """A DashHeatmap component.
DashHeatmap calls the init component
Seperated out so props are more visable

Keyword arguments:
- id (string; required): The id of the SVG
- width (string; required): The width of the SVG container (%)
- svg (string; required): The SVG image.
- data (dict; optional): The data object that generates the SVG
- loading_state (dict; optional): Object that holds the loading state object coming from dash-renderer. loading_state has the following type: dict containing keys 'is_loading', 'prop_name', 'component_name'.
Those keys have the following types:
  - is_loading (boolean; optional): Determines if the component is loading or not
  - prop_name (string; optional): Holds which property is loading
  - component_name (string; optional): Holds the name of the component that is loading
- className (string; optional): Additional CSS classes for the heatmap root div element"""
    @_explicitize_args
    def __init__(self, id=Component.REQUIRED, width=Component.REQUIRED, svg=Component.REQUIRED, data=Component.UNDEFINED, loading_state=Component.UNDEFINED, className=Component.UNDEFINED, **kwargs):
        self._prop_names = ['id', 'width', 'svg', 'data', 'loading_state', 'className']
        self._type = 'DashHeatmap'
        self._namespace = 'dash_heatmap'
        self._valid_wildcard_attributes =            []
        self.available_properties = ['id', 'width', 'svg', 'data', 'loading_state', 'className']
        self.available_wildcard_properties =            []

        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs
        args = {k: _locals[k] for k in _explicit_args if k != 'children'}

        for k in ['id', 'width', 'svg']:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')
        super(DashHeatmap, self).__init__(**args)

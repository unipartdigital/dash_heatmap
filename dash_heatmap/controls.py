# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class controls(Component):
    """A controls component.


Keyword arguments:
- id (string; required): The id of the SVG
- zoom (dict; required): The zoom object"""
    @_explicitize_args
    def __init__(self, id=Component.REQUIRED, zoom=Component.REQUIRED, **kwargs):
        self._prop_names = ['id', 'zoom']
        self._type = 'controls'
        self._namespace = 'dash_heatmap'
        self._valid_wildcard_attributes =            []
        self.available_properties = ['id', 'zoom']
        self.available_wildcard_properties =            []

        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs
        args = {k: _locals[k] for k in _explicit_args if k != 'children'}

        for k in ['id', 'zoom']:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')
        super(controls, self).__init__(**args)

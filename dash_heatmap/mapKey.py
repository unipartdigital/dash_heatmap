# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class mapKey(Component):
    """A mapKey component.
Map Key Components

Keyword arguments:
- colorMap (dict; required): The colorMap object"""
    @_explicitize_args
    def __init__(self, colorMap=Component.REQUIRED, **kwargs):
        self._prop_names = ['colorMap']
        self._type = 'mapKey'
        self._namespace = 'dash_heatmap'
        self._valid_wildcard_attributes =            []
        self.available_properties = ['colorMap']
        self.available_wildcard_properties =            []

        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs
        args = {k: _locals[k] for k in _explicit_args if k != 'children'}

        for k in ['colorMap']:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')
        super(mapKey, self).__init__(**args)

# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class fetchData(Component):
    """A fetchData component.
FetchData is an FetchData example component

Keyword arguments:
- id (string; optional): The id displayed in the input.
- filterOut (string; optional): The color to filter out."""
    @_explicitize_args
    def __init__(self, id=Component.UNDEFINED, filterOut=Component.UNDEFINED, **kwargs):
        self._prop_names = ['id', 'filterOut']
        self._type = 'fetchData'
        self._namespace = 'dash_heatmap'
        self._valid_wildcard_attributes =            []
        self.available_properties = ['id', 'filterOut']
        self.available_wildcard_properties =            []

        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs
        args = {k: _locals[k] for k in _explicit_args if k != 'children'}

        for k in []:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')
        super(fetchData, self).__init__(**args)

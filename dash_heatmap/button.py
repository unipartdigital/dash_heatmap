# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class button(Component):
    """A button component.


Keyword arguments:
- children (a list of or a singular dash component, string or number; required): Children
- title (string; required): The title of the Button
- className (string; required): The CSS class(es)
- id (string; required): The ID"""
    @_explicitize_args
    def __init__(self, children=None, title=Component.REQUIRED, className=Component.REQUIRED, id=Component.REQUIRED, onClick=Component.REQUIRED, **kwargs):
        self._prop_names = ['children', 'title', 'className', 'id']
        self._type = 'button'
        self._namespace = 'dash_heatmap'
        self._valid_wildcard_attributes =            []
        self.available_properties = ['children', 'title', 'className', 'id']
        self.available_wildcard_properties =            []

        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs
        args = {k: _locals[k] for k in _explicit_args if k != 'children'}

        for k in ['title', 'className', 'id', 'onClick', 'children']:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')
        super(button, self).__init__(children=children, **args)

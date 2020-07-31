import dash_heatmap
import dash
import dash_html_components as html
import json


app = dash.Dash(__name__)

# NB(Rich): Static JSON used for Proof-of-concept ONLY - add real data
# with filtering method
with open('./assets/data/lmTest.json') as test_data:
    data = json.load(test_data)

app.layout = html.Div([
    dash_heatmap.DashHeatmap(
        id='my-warehouse',
        width='100%',
        svg='../../assets/svg/test.svg', # Path relative to JavaScript imports
        data=data # Optional prop
    )
])

if __name__ == '__main__':
    app.run_server(
        debug=True,
        dev_tools_hot_reload=True,
        dev_tools_prune_errors=True,
        dev_tools_silence_routes_logging=False
    )

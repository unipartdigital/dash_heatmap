# Dash Heatmap

Dash Heatmap to display Warehouse stock movement frequency

## Quickstart

```
pip install dash-heatmap
```

```python
import dash
import dash_heatmap
import json

app = dash.Dash(__name__)

# NB: Usually add data via filters and callbacks
with open('./assets/data/lmTest.json') as test_data:
    data = json.load(test_data)

app.layout = dash_heatmap.DashHeatmap(
    id='my-warehouse',
    width='100%',
    svg='../../assets/svg/test.svg', # Path relative to JavaScript imports
    data=data # Optional prop
)

if __name__ == '__main__':
    app.run_server(debug=True)
```

![Dash Heatmap](https://user-images.githubusercontent.com/28781401/89284131-3694d600-d646-11ea-80fb-868832a805fb.png)

### Reference

See a list of all of the [Heatmap properties](./reference.md).

### Development

Install dependencies

1. Install npm packages
    ```
    $ npm install
    ```
2. Create a virtual env and activate.
    ```
    $ virtualenv venv
    $ . venv/bin/activate
    ```
    _Note: venv\Scripts\activate for windows_

3. Install python packages required to build components.
    ```
    $ pip install -r requirements.txt
    ```
4. Install the python packages for testing
    ```
    $ pip install -r tests/requirements.txt
    ```

### Running the Demo

- The demo app is in `src/demo`
- To run the demo

    1. npm run start

- Test your code in a Python environment:

    0. Activate virtual env
        ```
        $ . venv/bin/activate
        ```
    1. Build your code
        ```
        $ npm run build
        ```
    2. Run and modify the `usage.py` dash app:
        ```
        $ python usage.py
        ```
- Tests for the Dash Heatmap component.
    - Tests are available in `tests/test_selenium.py`
    - You will need to install chromedriver, eg. in Debian:
    ```
    wget https://chromedriver.storage.googleapis.com/<VERSION>/chromedriver_linux64.zip
    unzip chromedriver_linux64.zip
    sudo mv chromedriver /usr/bin/chromedriver
    sudo chown root:root /usr/bin/chromedriver
    sudo chmod +x /usr/bin/chromedriver
    ```
    - Build the JavaScript with `$ npm run build`
    - Ensure you have completed Step 4. of the Install dependancies
    - Run the tests with `$ pytest tests`.

### Create a production build and publish:

1. Build your code:
    ```
    $ npm run build
    ```
2. Create a Python tarball
    ```
    $ python setup.py sdist
    ```
    This distribution tarball will get generated in the `dist/` folder

3. Test your tarball by copying it into a new environment and installing it locally:
    ```
    $ pip install dash_heatmap-[VERSION].tar.gz
    ```

4. If it works, authorised users can publish the component to PyPI:
    1. Publish on PyPI
        ```
        $ twine upload dist/*
        ```
    2. Cleanup the dist folder (optional)
        ```
        $ rm -rf dist
        ```

### Contributing

We welcome contributions to Dash Heatmap. If you find a bug or have ideas for new features please feel free to make a New Issue or submit a pull request.

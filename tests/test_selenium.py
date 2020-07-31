import pytest
import dash
from selenium.webdriver.common.action_chains import ActionChains
import dash_heatmap


SVG_SELECTOR = "#svg"
DEFAULT_COLOR = "#ffffff"
SLOW_COLOR = "#0000FF"
MEDIUM_COLOR = "#00FF00"
FAST_COLOR = "#FF0000"
DEFAULT_TRANSFORM = "matrix(0.95, 0, 0, 0.95, 20, 20)"
DATA = dict(
    id="svg",
    width="100%",
    svg="../../assets/svg/test.svg",
    data={
        "colour_map": {"slow": SLOW_COLOR, "medium": MEDIUM_COLOR, "fast": FAST_COLOR},
        "bays":[
            {"label":"SH1001", "metric":35, "speed":"medium", "desc":[{"label":"SH1001", "metric":35}]},
            {"label":"SH1002", "metric":18, "speed":"fast", "desc":[{"label":"SH1002", "metric":18}]},
            {"label":"SH1004", "metric":14, "speed":"slow", "desc":[{"label":"SH1004", "metric":14}]},
            {"label":"SH1006", "metric":34, "speed":"fast", "desc":[{"label":"SH1006", "metric":34}]},
            {"label":"SH1008", "metric":30, "speed":"medium", "desc":[
                {"label":"PRODUCTA", "metric":5},
                {"label":"PRODUCTB", "metric":10},
                {"label":"PRODUCTC", "metric":15}
            ]},
            {"label":"SH1009", "metric":3, "speed":"slow", "desc":[{"label":"SH1009", "metric":3}]},
        ]
    }
)


# Start the server and wait for the SVG to be in the DOM
@pytest.fixture
def svg(dash_duo):
    dash_duo.start_server(get_app(DATA))
    dash_duo.wait_for_element(SVG_SELECTOR, timeout=4)
    return dash_duo.find_element(SVG_SELECTOR)


# Set-up
def get_app(data):
    app = dash.Dash(__name__)
    app.layout = dash_heatmap.DashHeatmap(**data)

    return app


# Hover over element
def hover(dash_duo, selector):
    element = dash_duo.find_element(selector)
    hov = ActionChains(dash_duo.driver).move_to_element(element)
    return hov.perform()


# Setep for transform test
def setup_tranform_test(dash_duo):
    group_el = dash_duo.find_element(f"{SVG_SELECTOR}-ref-container")
    assert group_el.get_attribute('transform') == DEFAULT_TRANSFORM
    return group_el

# Test SVG container is rendered at the provided width
def test_svg_width(dash_duo, svg):
    container = dash_duo.find_element("#lm-svg")
    assert container.get_attribute("style") == "width: 100%;"


# Test SVG renders all rect and text elements provided
def test_svg_reproduction(dash_duo, svg):
    rect = dash_duo.find_elements(f"{SVG_SELECTOR} > rect:not(.hidden)")
    assert len(rect) == 1413

    text = dash_duo.find_elements(f"{SVG_SELECTOR} > text:not(.hidden)")
    assert len(text) == 1414


# Test SVG rects are coloured via the bay data provided
def test_color_bays(dash_duo, svg):
    selector_fast = f"{SVG_SELECTOR} > rect#SH1002"
    selector_medium = f"{SVG_SELECTOR} > rect#SH1008"
    selector_slow = f"{SVG_SELECTOR} > rect#SH1004"

    fast_bay = dash_duo.find_element(selector_fast)
    assert fast_bay.get_attribute("fill") == FAST_COLOR

    medium_bay = dash_duo.find_element(selector_medium)
    assert medium_bay.get_attribute("fill") == MEDIUM_COLOR

    slow_bay = dash_duo.find_element(selector_slow)
    assert slow_bay.get_attribute("fill") == SLOW_COLOR


# Test SVG elements not within the data remain the default colour
def test_render_element_default_colour(dash_duo, svg):
    selector_default = f"{SVG_SELECTOR} > rect#SH1110"
    default_rect = dash_duo.find_element(selector_default)
    assert default_rect.get_attribute("fill") == DEFAULT_COLOR


# Test SVG description text elements are present (hidden by css class)
def test_description_rendered_hidden(dash_duo, svg):
    desc_text = dash_duo.find_elements(f"{SVG_SELECTOR} > text.hidden")
    assert len(desc_text) == 6


# Test SVG description elements are shown on hovering over a bay
def test_description_shown_when_hovering(dash_duo, svg):
    selector_bay = f"{SVG_SELECTOR} > rect#SH1004"
    selector_alt_bay = f"{SVG_SELECTOR} > rect#SH1009"

    # On loading desc is hidden
    desc_text_el = dash_duo.find_element(f"{SVG_SELECTOR} > text{SVG_SELECTOR}-desc-SH1004")
    assert desc_text_el.get_attribute("class") == "hidden"

    # Hover over bay, show tooltip
    hover(dash_duo, selector_bay)
    assert desc_text_el.get_attribute("class") == "bay-tooltip"

    # Hover over bay alternative bay, hide tooltip again
    hover(dash_duo, selector_alt_bay)
    assert desc_text_el.get_attribute("class") == "hidden"


# Test label & metric are formatted correctly
def test_label_metric_format(dash_duo, svg):
    desc_text_single_el = dash_duo.find_element(f"{SVG_SELECTOR} > text{SVG_SELECTOR}-desc-SH1006")
    assert desc_text_single_el.get_attribute('innerHTML') == "SH1006: 34"

    desc_text_multi_el = dash_duo.find_element(f"{SVG_SELECTOR} > text{SVG_SELECTOR}-desc-SH1008")
    assert desc_text_multi_el.get_attribute('innerHTML') == "PRODUCTA: 5 | PRODUCTB: 10 | PRODUCTC: 15"


# Test Zoom functionality
# NB(Rich): Assumption mouse wheel event is equivalent to a click (for now at least)
def test_zoom(dash_duo, svg):
    group_el = setup_tranform_test(dash_duo)

    # Zoom In
    dash_duo.multiple_click(f"{SVG_SELECTOR}-zoom-in", 1)
    assert group_el.get_attribute('transform') == \
        "matrix(1.1875, 0, 0, 1.1875, -90.12499999999994, -23.25)"

    # Zoom Out
    dash_duo.multiple_click(f"{SVG_SELECTOR}-zoom-out", 1)
    assert group_el.get_attribute('transform') == \
        "matrix(0.890625, 0, 0, 0.890625, 47.53125, 30.8125)"


# Test Reset functionality
def test_reset(dash_duo, svg):
    group_el = setup_tranform_test(dash_duo)

    dash_duo.multiple_click(f"{SVG_SELECTOR}-zoom-in", 5)
    assert group_el.get_attribute('transform') == \
        "matrix(2.899169921875, 0, 0, 2.899169921875, -883.7993164062498, -334.9541015624999)"

    dash_duo.multiple_click(f"{SVG_SELECTOR}-reset", 1)
    assert group_el.get_attribute('transform') == DEFAULT_TRANSFORM


# Test Pan functionality
def test_pan(dash_duo, svg):
    group_el = setup_tranform_test(dash_duo)

    ActionChains(dash_duo.driver) \
        .move_to_element_with_offset(group_el, 10, 10) \
        .click_and_hold() \
        .move_to_element_with_offset(group_el, 50, 100) \
        .release() \
        .perform()

    assert group_el.get_attribute('transform') == \
        "matrix(0.95, 0, 0, 0.95, 60, 110)"


# Test Center functionality
def test_center(dash_duo, svg):
    group_el = setup_tranform_test(dash_duo)

    dash_duo.multiple_click(f"{SVG_SELECTOR}-center", 1)
    assert group_el.get_attribute('transform') == \
        "matrix(0.95, 0, 0, 0.95, 23.024999999999938, 9.649999999999975)"

# AUTO GENERATED FILE - DO NOT EDIT

svgControls <- function(id=NULL, zoom=NULL) {
    
    props <- list(id=id, zoom=zoom)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'svgControls',
        namespace = 'dash_heatmap',
        propNames = c('id', 'zoom'),
        package = 'dashHeatmap'
        )

    structure(component, class = c('dash_component', 'list'))
}

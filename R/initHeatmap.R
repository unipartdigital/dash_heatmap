# AUTO GENERATED FILE - DO NOT EDIT

initHeatmap <- function(id=NULL, svg=NULL, data=NULL) {
    
    props <- list(id=id, svg=svg, data=data)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'initHeatmap',
        namespace = 'dash_heatmap',
        propNames = c('id', 'svg', 'data'),
        package = 'dashHeatmap'
        )

    structure(component, class = c('dash_component', 'list'))
}

# AUTO GENERATED FILE - DO NOT EDIT

dashHeatmap <- function(id=NULL, width=NULL, svg=NULL, data=NULL, loading_state=NULL, className=NULL) {
    
    props <- list(id=id, width=width, svg=svg, data=data, loading_state=loading_state, className=className)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'DashHeatmap',
        namespace = 'dash_heatmap',
        propNames = c('id', 'width', 'svg', 'data', 'loading_state', 'className'),
        package = 'dashHeatmap'
        )

    structure(component, class = c('dash_component', 'list'))
}

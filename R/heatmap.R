# AUTO GENERATED FILE - DO NOT EDIT

heatmap <- function(id=NULL, width=NULL, svg=NULL, data=NULL) {
    
    props <- list(id=id, width=width, svg=svg, data=data)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'heatmap',
        namespace = 'dash_heatmap',
        propNames = c('id', 'width', 'svg', 'data'),
        package = 'dashHeatmap'
        )

    structure(component, class = c('dash_component', 'list'))
}

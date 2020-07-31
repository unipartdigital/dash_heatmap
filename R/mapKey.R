# AUTO GENERATED FILE - DO NOT EDIT

mapKey <- function(colorMap=NULL) {
    
    props <- list(colorMap=colorMap)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'mapKey',
        namespace = 'dash_heatmap',
        propNames = c('colorMap'),
        package = 'dashHeatmap'
        )

    structure(component, class = c('dash_component', 'list'))
}

# AUTO GENERATED FILE - DO NOT EDIT

fetchData <- function(id=NULL, filterOut=NULL) {
    
    props <- list(id=id, filterOut=filterOut)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'fetchData',
        namespace = 'dash_heatmap',
        propNames = c('id', 'filterOut'),
        package = 'dashHeatmap'
        )

    structure(component, class = c('dash_component', 'list'))
}

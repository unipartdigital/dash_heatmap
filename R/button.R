# AUTO GENERATED FILE - DO NOT EDIT

button <- function(children=NULL, title=NULL, className=NULL, id=NULL, onClick=NULL) {
    
    props <- list(children=children, title=title, className=className, id=id, onClick=onClick)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'button',
        namespace = 'dash_heatmap',
        propNames = c('children', 'title', 'className', 'id', 'onClick'),
        package = 'dashHeatmap'
        )

    structure(component, class = c('dash_component', 'list'))
}

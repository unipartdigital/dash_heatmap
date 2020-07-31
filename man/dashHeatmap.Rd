% Auto-generated: do not edit by hand
\name{dashHeatmap}

\alias{dashHeatmap}

\title{DashHeatmap component}

\description{
DashHeatmap calls the init component Seperated out so props are more visable
}

\usage{
dashHeatmap(id=NULL, width=NULL, svg=NULL, data=NULL,
loading_state=NULL, className=NULL)
}

\arguments{
\item{id}{Character. The id of the SVG}

\item{width}{Character. The width of the SVG container (\%)}

\item{svg}{Character. The SVG image.}

\item{data}{Named list. The data object that generates the SVG}

\item{loading_state}{Lists containing elements 'is_loading', 'prop_name', 'component_name'.
those elements have the following types:
  - is_loading (logical; optional): determines if the component is loading or not
  - prop_name (character; optional): holds which property is loading
  - component_name (character; optional): holds the name of the component that is loading. Object that holds the loading state object coming from dash-renderer}

\item{className}{Character. Additional CSS classes for the heatmap root div element}
}

\value{named list of JSON elements corresponding to React.js properties and their values}


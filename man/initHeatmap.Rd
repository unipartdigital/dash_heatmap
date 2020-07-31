% Auto-generated: do not edit by hand
\name{initHeatmap}

\alias{initHeatmap}

\title{initHeatmap component}

\description{
InitHeatmap calls the Heatmap component with the svg, width and data
}

\usage{
initHeatmap(id=NULL, svg=NULL, data=NULL)
}

\arguments{
\item{id}{Character. The id of the SVG}

\item{svg}{Character. The SVG image.}

\item{data}{Lists containing elements 'colour_map', 'bays'.
those elements have the following types:
  - colour_map (named list; required)
  - bays (required): . bays has the following type: list of lists containing elements 'label', 'metric', 'speed', 'desc'.
those elements have the following types:
  - label (character; required)
  - metric (numeric; required)
  - speed (character; required)
  - desc (required): . desc has the following type: list of lists containing elements 'label', 'metric'.
those elements have the following types:
  - label (character; required)
  - metric (numeric; required)ss. The data object that generates the SVG}
}

\value{named list of JSON elements corresponding to React.js properties and their values}


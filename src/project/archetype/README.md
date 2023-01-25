# %SLIDES_TITLE%

_%SLIDES_DESCRIPTION%_

This project contains the source files of the presentation titled [%SLIDES_TITLE%](%SLIDES_WEBSITE%) - as well as a complete set of Yarn-based scripts to handle its lifecycle.

The main source file is [src/slides.md](src/slides.md), whereas the Sass-based stylesheet reside in the [src/styles](src/styles/) directory.

## Initial setup

Enter the root directory of the project and run:

> yarn

just like any other Yarn-based project.

## The build process

To build both the PDF and the HTML slides, simply run:

> yarn build

The output will reside in the different subdirectories of [dist/](dist/).

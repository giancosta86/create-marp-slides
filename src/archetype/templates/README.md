# <%= slides.title %>

_<%= slides.description %>_

This project contains the source files of the presentation titled [<%= slides.title %>](<%= slides.website %>) - as well as a complete set of Yarn-based scripts to handle its lifecycle.

The main source file is [src/slides.md](src/slides.md), whereas the Sass-based stylesheet reside in the [src/styles](src/styles/) directory.

## Initial setup

Enter the project directory and run:

> yarn

just like any other Yarn-based project.


## Watching markdown and stylesheets

To enter *watch mode*, just run:

> yarn watch

*Any modification* to the markdown source or to the stylesheets *will trigger a rebuild* - which is especially useful when using the **Xreader** app on Linux, because it automatically reloads the PDF document without losing the current page number 


## The build process

To build both the PDF and the HTML slides, simply run:

> yarn build

The output will reside in the different subdirectories of [dist/](dist/).

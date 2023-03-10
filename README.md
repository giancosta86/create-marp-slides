# create-marp-slides

_Create Marp-based slides from elegant source files_

![GitHub CI](https://github.com/giancosta86/create-marp-slides/actions/workflows/publish-to-npm.yml/badge.svg)
[![npm version](https://badge.fury.io/js/@giancosta86%2Fcreate-marp-slides.svg)](https://badge.fury.io/js/@giancosta86%2Fcreate-marp-slides)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](/LICENSE)

**create-marp-slides** is a tool for _generating an entire project structure_ in order to create the slides of a _Marp-based presentation_ - in both **PDF** and **HTML** format.

In such an _elegant_ project structure, the _Markdown_ source document is decoupled from the custom, _external Sass styling theme_; furthermore, its _package.json_ includes a wide range of **script** to handle the different tasks all over its lifecycle.

To create your own project, please run:

> npm init @giancosta86/marp-slides \[\<directory>]

The directory is optional - if omitted, the current working directory will be used, _potentially overwriting but never deleting_ existing files.

Please, refer to the generated README file for further details.

## Further references

- [Platonic](https://github.com/giancosta86/platonic) - EJS-based directory reification engine

# node-k8s-bootstrap

bootstrap k8s clusters with multiple mechanisms such as specs and helm charts

[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Build Status](https://travis-ci.org/the-watchmen/node-k8s-bootstrap.svg?branch=master)](https://travis-ci.org/the-watchmen/node-k8s-bootstrap)
[![npm (scoped)](https://img.shields.io/npm/v/@watchmen/k8s-bootstrap.svg)](https://img.shields.io/npm/v/@watchmen/k8s-bootstrap.svg)

> see [tests](test) for examples

## usage

* `yarn install <package name>`
* `import {...} from '<package name'`

### opt-ins

> * imported like: `import {...} from '<package name>/dist/<file name>'`
> * certain components are made opt-in to avoid dependency bloat when not being used
> * opt-ins will require that [`peerDependencies`](https://docs.npmjs.com/files/package.json#peerdependencies) are provided by consumer

## development

1. `git clone {repo name}`
1. `cd {repo name}`
1. `yarn`
1. `yarn test`

# Portfolio Webpack

[![travis status](https://travis-ci.org/r-karts/portfolio-webpack.svg?branch=master)](https://travis-ci.org/r-karts/portfolio-webpack)

### Website

[Google cloud](https://roman-kartsevich.appspot.com/) 

[Heroku](https://roman-kartsevich.herokuapp.com/)

My personal portfolio. Built with webpack. Deployed on google cloud
platform inside of a docker container.

# Pre-requisites

Mandatory:

* git
* node
* npm

Optional:

* docker 
* go 1.6
* gcloud 
* heroku cli

# Build

## Dev

To start development run the following commands, and change any 
source code in `src` directory:

```console
npm install
npm run start 
```

## Prod

To build a production release run the following commands and copy
everything from freshly built `dist` to your production stage:

```console
npm install
npm run build 
```

## Docker

The following commands will create a docker container based on nginx image
and start it:

```console
npm run build
docker build -t roman .
docker run roman
```

# Deployment

## Google Cloud Platform

This project is ready to be deployed to GCP. The commands you need to run are:

```console
npm run build
gcloud app deploy
```

Follow the instructions and setup all necessary stuff: account, host location, etc. on the fly.

## Heroku

It's also heroku-ready.

```console
heroku login
heroku create
heroku config:set NPM_CONFIG_PRODUCTION=false
git push heroku master
```

Local running:

_Note:_ you also can create `.env` file and specify there something like:

```properties
PORT=8080
NPM_CONFIG_PRODUCTION=false
```

Local deployment command:

```console
heroku local web
```

# Portfolio Webpack

[![travis status](https://travis-ci.org/r-karts/portfolio-webpack.svg?branch=master)](https://travis-ci.org/r-karts/portfolio-webpack)

Website hosted on google cloud platform: [link](https://roman-kartsevich.appspot.com/)

My personal portfolio. Built with webpack.

# Pre-requisites

Mandatory:

* git
* node
* npm

Optional:

* docker 
* gcloud 

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


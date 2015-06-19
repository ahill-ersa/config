#!/bin/sh

export OAGR_CONFIG_PASSWORD= # supplied separately
export OAGR_MYTARDIS_CHECKOUT= # git tag/branch/commit to checkout
export OAGR_RESTORE= # name of backup to restore (optional)
export OAGR_DEPLOYMENT= # name of deployment type in ../config (e.g. prod)

apt-get update
apt-get -y install nodejs-legacy npm

wget -q -O - https://github.com/modc08/config/archive/master.tar.gz | tar xzvf -

top=$PWD

cd config-master
npm install sjcl
bin/open.js
cd working
. ./$OAGR_DEPLOYMENT.sh

cd $top

curl --silent --location https://github.com/modc08/nectar-shell/raw/master/run.sh | sh

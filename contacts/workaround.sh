#!/bin/bash

NODE_VERSION=$(node --version)
NODE_VERSION_SHORT="${NODE_VERSION/v/}"

function download_missing_node_gyp_file {
    BUG_20921_FILE="~/.node-gyp/$NODE_VERSION_SHORT/include/node"
    BUG_20921_URL="https://raw.githubusercontent.com/nodejs/node/$NODE_VERSION/src"
    curl -s "$BUG_20921_URL/$1" -o "$BUG_20921_FILE/$1"
}

# Patching node v10.2.0, as it is missing the "core.h" header file, which breaks the build
# for modules like lib-sass, so we need to install node-gyp and patch the installed sources.
# See: https://github.com/nodejs/node/issues/20921
if [ "v10.2.0" == "$NODE_VERSION" ]; then
    npm i -g node-gyp
    node-gyp install
    download_missing_node_gyp_file "core.h"
    download_missing_node_gyp_file "callback_scope.h"
    download_missing_node_gyp_file "exceptions.h"
fi
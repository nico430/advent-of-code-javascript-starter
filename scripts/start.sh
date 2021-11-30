#!/bin/bash

DAY=$1
esbuild ./src/${DAY}/main.js --bundle --platform=node | node

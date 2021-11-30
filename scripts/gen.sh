#!/bin/bash

esbuild ./scripts/gen.js --bundle --platform=node | node - "$@"

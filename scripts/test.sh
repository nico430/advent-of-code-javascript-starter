#!/bin/bash

DAY=$1
jest --passWithNoTests ./test/${DAY}.test.js

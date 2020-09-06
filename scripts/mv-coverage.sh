#!/bin/bash

set -e

pwd
ls ./docs/.vuepress
ls ./docs/.vuepress/dist
rm -rf ./docs/.vuepress/dist/coverage
mv ./docs/.vuepress/coverage ./docs/.vuepress/dist

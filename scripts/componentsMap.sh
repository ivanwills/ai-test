#!/usr/bin/env bash

if [ ! -d build/ ]; then
  echo "Please run build step first!" >&2
  exit 1
fi

cp ./componentsMap.json build/
error="$?"

if [[ $error -ne 0 ]]; then
  echo "********************************************************" >&2
  echo " ERROR:                                                 " >&2
  echo " componentsMap.json doesn't appear to have been created " >&2
  echo "   Please check you have updated this repository        " >&2
  echo "   correctly with web-starter-app.                      " >&2
  echo "   You should have a test file:                         " >&2
  echo "     src/__tests__/componentsMap.spec.js                " >&2
  echo "   The test generates the missing componentsMap.json    " >&2
  echo "   If that is present check that your build is passing  " >&2
  echo "   componentsMap.json file as an artifact to this step  " >&2
  echo "********************************************************" >&2
  exit 2
fi

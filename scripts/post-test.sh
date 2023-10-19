#!/bin/bash

mkdir -p reports
if [ -f cypress-coverage/coverage-final.json ]; then
  cp -f cypress-coverage/coverage-final.json reports/from-cypress.json
else
  echo "------------------------------" >&2
  echo "No cypress coverage reports   " >&2
  echo "------------------------------" >&2
  exit 1
fi
if [ -f jest-coverage/coverage-final.json ]; then
  cp -f jest-coverage/coverage-final.json reports/from-jest.json
else
  echo "------------------------------" >&2
  echo "No jest coverage reports      " >&2
  echo "------------------------------" >&2
  exit 2
fi
mkdir -p .nyc_output
npx nyc merge reports
if [ "$?" -ne 0 ]; then
  echo "------------------------------" >&2
  echo "Failed to merge test reports  " >&2
  echo "------------------------------" >&2
  exit 3
fi
mv coverage.json .nyc_output/out.json
nyc report --reporter lcov --report-dir coverage
if [ "$?" -ne 0 ]; then
  echo "------------------------------" >&2
  echo "Failed to generate lcov report" >&2
  echo "------------------------------" >&2
  exit 4
fi

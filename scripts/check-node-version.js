#!/bin/env node

// stop if below node 16
const NODE_VERSION = 16;

if (parseInt(process.versions.node.split('.')[0], 10) < NODE_VERSION) {
  console.error(`
+++++++++++++++++++++++++++++++

This repository is now using node 16 (found: ${process.version}).
Please upgrade to node 16 using:

nvm install 16 # if not installed
nvm use 16

+++++++++++++++++++++++++++++++
`);

  process.kill(process.pid, 'SIGTERM');
}

const JSDOMEnvironment = require('jest-environment-jsdom');

class JSDOMEnvironmentGlobal extends JSDOMEnvironment {
  constructor(config) {
    super(config);
  }

  async setup() {
    await super.setup();
    this.global.jsdom = this.dom;
  }

  async teardown() {
    this.global.jsdom = null;
    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = JSDOMEnvironmentGlobal;

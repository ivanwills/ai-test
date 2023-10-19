/* istanbul ignore file */
import '../../helpers/a11y.js';
import '../../helpers/common.js';
import '../../helpers/components-containing.js';
import '../../helpers/elements-containing.js';
import '../../helpers/interactions.js';

import { Given } from 'cypress-cucumber-preprocessor/steps';

import Browser from '../../pages/browser';

Given(`I am at {string} storybook page`, (component) => {
  Browser.visitStory(component);
});

Given(`I am at {string} page`, (url) => {
  Browser.visitPage(`/${url}`);
});

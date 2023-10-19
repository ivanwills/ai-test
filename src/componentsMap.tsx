/* istanbul ignore file */
import loadable from '@loadable/component';

const TestComponent = loadable(() => import('./components/TestComponent'));

const componentsMap = {
  TestComponent,
};

export default componentsMap;

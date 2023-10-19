import React, { ReactElement } from 'react';

import TestComponent, { IProps } from '.';

export default {
  title: 'Test Component',
  component: TestComponent,
};

const props: IProps = {
  heading: 'Test component',
};

export const IndexPage = (): ReactElement => (
  <div>
    <TestComponent {...props} />
  </div>
);

IndexPage.storyName = 'Index page';

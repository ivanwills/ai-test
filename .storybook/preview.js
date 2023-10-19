import React from 'react';
import { addParameters, addDecorator } from '@storybook/react';
import { withTests } from '@storybook/addon-jest';
import {
  Title,
  Subtitle,
  Description,
  Primary,
  ArgsTable,
  Stories,
} from '@storybook/addon-docs/blocks';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

addParameters({
  notes: 'global notes',
  docs: {
    page: () => (
      <>
        <Title />
        <Subtitle />
        <Description />
        <Primary />
        <ArgsTable />
        <Stories />
      </>
    ),
  },
});
addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
});
addParameters({
  a11y: {
    element: '#root',
    manual: false,
  },
});
addDecorator((storyFn) => <>{storyFn()}</>);

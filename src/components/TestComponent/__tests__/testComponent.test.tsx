import { render, screen } from '@testing-library/react';
import React from 'react';

import TestComponent, { IProps } from '..';

describe('TestComponent Component', () => {
  it('should render an button', () => {
    const props: IProps = {
      heading: 'heading text',
    };

    render(<TestComponent {...props} />);
    expect(screen.getAllByRole('button')[0]).toBeVisible();
    expect(screen.getAllByRole('radio')).toHaveLength(2);
  });
});

import React, { ReactElement } from 'react';

export type IProps = {
  heading?: string;
};

// radio button asserts that .svg?uri imports work
const TestComponent = (props: IProps): ReactElement => (
  <>
    <div>
      <h1>{props?.heading}</h1>
      <a role='button'>Press me</a>
      <input type='radio' role='radio' value='fm' name='FM Radio' />
      <input type='radio' role='radio' value='fm' name='AM Radio' />
    </div>
  </>
);

export default TestComponent;

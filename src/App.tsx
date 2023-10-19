import React, { ReactElement, useEffect, useState } from 'react';

import componentsMap from './componentsMap';
import StateProvider from './StateProvider';

const App = (): ReactElement => {
  const [reRenderedComponents, setReRenderedComponents] = useState([]);

  return (
    <StateProvider>
      {reRenderedComponents.length > 0 && reRenderedComponents}
    </StateProvider>
  );
};

export default App;

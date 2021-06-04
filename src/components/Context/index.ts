import React, { useMemo } from 'react';

const defaultContext = {
  toggleTheme: () => {},
};

export default React.createContext(defaultContext);

import { useEffect, useState } from 'react';

// Hook checks for login.
const useIsLoggedIn = () => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // TODO call sideEffects for getting login values.
    // setIsLoggedIn(true);
    setTimeout(() => setLoading(false), 3000);
  }, []);

  return { loading, isLoggedIn };
};

export default useIsLoggedIn;
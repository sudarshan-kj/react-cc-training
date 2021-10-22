import React, { useEffect, useState } from "react";

const usePersistenceState = (key, initValue) => {
  const [persistenceKey, setPersistenceValue] = useState(
    localStorage.getItem(key) || initValue
  );
  useEffect(() => {
    localStorage.setItem(key, persistenceKey);
  }, [persistenceKey]);

  return [persistenceKey, setPersistenceValue];
};

export default usePersistenceState;

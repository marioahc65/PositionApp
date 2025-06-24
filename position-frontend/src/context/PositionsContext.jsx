import { createContext, useContext, useState } from "react";

const PositionsContext = createContext();

export function PositionsProvider({ children }) {
  const [refreshKey, setRefreshKey] = useState(0);

  const triggerRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <PositionsContext.Provider value={{ refreshKey, triggerRefresh }}>
      {children}
    </PositionsContext.Provider>
  );
}

export function usePositionsContext() {
  const context = useContext(PositionsContext);
  if (!context) {
    throw new Error("usePositionsContext debe usarse dentro de PositionsProvider");
  }
  return context;
}

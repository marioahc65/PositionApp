import './App.css'

import { useState } from "react";
import { PositionsProvider } from "./context/PositionsContext";
import { PositionsPage } from "./pages/PositionsPage";
import CreatePositionForm from "./pages/CreatePositionForm";
import { PositionDetails } from "./pages/PositionDetails";

function App() {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <PositionsProvider>
      {!selectedId && <CreatePositionForm />}

      <hr />

      {selectedId ? (
        <PositionDetails id={selectedId} onBack={() => setSelectedId(null)} />
      ) : (
        <PositionsPage onSelect={setSelectedId} />
      )}
    </PositionsProvider>
  );
}

export default App;

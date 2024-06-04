import { BrowserRouter as Router } from "react-router-dom";
import { createRoot } from 'react-dom/client';

import App from "./App";
import { CharacterProvider } from "./reducers";

createRoot(document.getElementById('root')!).render(
  <CharacterProvider>
    <Router>
      <App />
    </Router>
  </CharacterProvider>,
);

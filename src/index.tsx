import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { CharacterProvider } from "./reducers";

ReactDOM.render(
  <CharacterProvider>
    <Router>
      <App />
    </Router>
  </CharacterProvider>,
  document.getElementById("root")
);

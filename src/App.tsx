import { Navigate, Route, Routes } from "react-router-dom";

import { List } from "./components/List";
import { Details } from "./components/Details";
import { GlobalStyle } from "./styles";

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/list" element={<List />} />
        <Route path="/details" element={<Details />} />
        <Route path="/" element={<Navigate to="/list" />} />
      </Routes>
    </>
  );
}

export default App;

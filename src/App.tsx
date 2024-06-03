import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { List } from "./components/List";
import { Details } from "./components/Details";
import { Body, GlobalStyle } from "./styles";

function App() {
  return (
    <>
      <GlobalStyle />
      <Body>
        <Routes>
          <Route path="/list" element={<List />} />
          <Route path="/details" element={<Details />} />
          <Route path="/" element={<Navigate to="/list" />} />
        </Routes>
      </Body>
    </>
  );
}

export default App;

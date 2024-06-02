import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { List } from "./components/List";
import { Details } from "./components/Details";
import { Body, GlobalStyle, Header } from "./styles";
import marvelLogo from "./assets/Marvel logo.png";
import heartIcon from "./assets/Heart icon.png";

function App() {
  return (
    <>
      <GlobalStyle />
      <Header>
        <img src={marvelLogo} alt="Marvel logo" />
        <img className="favourite" src={heartIcon} alt="Favourite Icon" />
      </Header>
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

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiKey } from "../../marvelApi.config";
import {
  CharacterCard,
  CharacterImg,
  CharacterList,
  CharacterName,
  CharacterNameWrapper,
  SearchInput,
  SearchInputWrapper,
  SearchWrapper,
} from "./styles";
import InfiniteScroll from "react-infinite-scroll-component";
import searchIcon from "../../assets/Search button.png";
import heartIcon from "../../assets/Heart icon.png";
import marvelLogo from "../../assets/Marvel logo.png";
import { Header } from "../../styles";
import { useDispatch } from "react-redux";

export const List = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [characters, setCharacters] = useState<any[]>([]);
  const [name, setName] = useState<string>("");
  const baseUrl = `http://gateway.marvel.com/v1/public/characters?ts=${apiKey.Timestamp}&apikey=${apiKey.Public}&hash=${apiKey.Hash}`;

  const fetchData = async (url: string) => {
    try {
      const response = await axios.get(url);
      setCharacters(response.data.data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  function handleClick(characterId: string) {
    dispatch({type: "SELECT", payload: {id: characterId}})
    navigate("/details");
  }


  useEffect(() => {
    if (name.length) fetchData(baseUrl + `&nameStartsWith=${name}`);
    else fetchData(baseUrl);
  }, [name]);

  return (
    <>
      <Header>
        <img src={marvelLogo} alt="Marvel logo" />
        <img className="favourite" src={heartIcon} alt="Favourite Icon" />
      </Header>
      {/* <InfiniteScroll
        dataLength={characters.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<div></div>}
      > */}
      <SearchWrapper>
        <SearchInputWrapper>
          <img src={searchIcon} alt="Search Icon" />
          <SearchInput
            placeholder="SEARCH A CHARACTER..."
            onChange={(e) => setName(e.target.value)}
          ></SearchInput>
        </SearchInputWrapper>
        <label>{characters.length} RESULTS</label>
      </SearchWrapper>

      <CharacterList>
        {characters.map((character) => (
          <CharacterCard onClick={() => handleClick(character.id)}>
            <CharacterImg
              src={
                character.thumbnail.path + "." + character.thumbnail.extension
              }
              alt={character.id}
            ></CharacterImg>
            <CharacterNameWrapper>
              <CharacterName>{character.name}</CharacterName>
              <img className="favourite" src={heartIcon} alt="Favourite Icon" />
            </CharacterNameWrapper>
          </CharacterCard>
        ))}
      </CharacterList>
      {/* </InfiniteScroll> */}
    </>
  );
};

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
import heartIcon from "../../assets/Heart Icon.png";
import heartFilledIcon from "../../assets/Heart filled icon.png";
import marvelLogo from "../../assets/Marvel logo.png";
import { Header } from "../../styles";
import { fetchData } from "../../utils";
import { useCharacter } from "../../reducers";

export const List = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useCharacter();
  const [characters, setCharacters] = useState<any[]>([]);
  const [name, setName] = useState<string>("");
  const baseUrl = `http://gateway.marvel.com/v1/public/characters?ts=${apiKey.Timestamp}&apikey=${apiKey.Public}&hash=${apiKey.Hash}`;


  const viewDetails = (characterId: string) => {
    dispatch({type: "SELECT", payload: characterId})
    navigate("/details");
  }

  const viewFavourites = () => {
    setCharacters(characters.filter(character => state.favourites.includes(character.id)));
  }

  const setFavourite = (id: string) => {
    const favourite = [...state.favourites];
    if(favourite.includes(id)) {
      const index = favourite.indexOf(id);
      favourite.splice(index, 1)
    }
    else {
      favourite.push(id);
    }
    dispatch({type: 'FAVOURITES', payload: favourite})
  }

  useEffect(() => {
    if (name.length) fetchData(baseUrl + `&nameStartsWith=${name}`).then((response: any) => setCharacters(response));
    else fetchData(baseUrl).then((response: any) => setCharacters(response));
  }, [name]);

  return (
    <>
      <Header>
        <img src={marvelLogo} alt="Marvel logo" />
        {state.favourites.length}<img className="favourite" src={heartFilledIcon} alt="Favourite Icon" onClick={viewFavourites}/>
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
          <CharacterCard>
            <CharacterImg
              src={
                character.thumbnail.path + "." + character.thumbnail.extension
              }
              alt={character.id} onClick={() => viewDetails(character.id)}
            ></CharacterImg>
            <CharacterNameWrapper>
              <CharacterName>{character.name}</CharacterName>
              <img className="favourite" src={state.favourites.includes(character?.id) ? heartFilledIcon : heartIcon } alt="Favourite Icon" onClick={() => setFavourite(character.id)} />
            </CharacterNameWrapper>
          </CharacterCard>
        ))}
      </CharacterList>
      {/* </InfiniteScroll> */}
    </>
  );
};


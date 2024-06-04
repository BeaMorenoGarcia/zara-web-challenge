import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import { characterListUrl, limit } from "../../marvelApi.config";
import searchIcon from "../../assets/Search button.png";
import heartIcon from "../../assets/Heart Icon.png";
import heartFilledIcon from "../../assets/Heart filled icon.png";
import marvelLogo from "../../assets/Marvel logo.png";
import cut from "../../assets/Cut.png";
import { Body, Cut, Favourite, FavouriteCount, Header } from "../../styles";
import { debounce, fetchData } from "../../utils";
import { useCharacter } from "../../reducers";
import { Loader } from "../Loader";
import { Character } from "../../types/api";

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

export const List = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useCharacter();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [charactersData, setCharactersData] = useState<Character[]>([]);
  const [name, setName] = useState<string>("");
  const [url, setUrl] = useState<string>(characterListUrl);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [index, setIndex] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const debouncedSetName = debounce((name: string) => setName(name), 500);

  const viewDetails = (characterId: number) => {
    dispatch({ type: "SELECT", payload: characterId });
    navigate("/details");
  };

  const setFavourite = (id: number) => {
    const favourite = [...state.favourites];
    if (favourite.includes(id)) {
      const index = favourite.indexOf(id);
      favourite.splice(index, 1);
    } else {
      favourite.push(id);
    }
    dispatch({ type: "CHANGE_FAVOURITES", payload: favourite });
  };

  const fetchMoreData = () => {
    fetchData(url + `&offset=${index * limit}`)
      .then((res) => {
        setCharactersData((prevItems) => [...prevItems, ...res]);
        res?.length > 0 ? setHasMore(true) : setHasMore(false);
      })
      .catch((err) => console.error(err));
    setIndex((prevIndex) => prevIndex + 1);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData(url).then((response: Character[]) => {
      setCharactersData(response);
      setIsLoading(false);
    });
  }, [url]);

  useEffect(() => {
    
    if (state.viewFavourites)
      setCharacters(
        charactersData.filter((character) =>
          state.favourites.includes(character.id)
        )
      );
    else setCharacters(charactersData);
  }, [charactersData]);

  useEffect(() => {
    if (state.viewFavourites) {
      if (name?.length > 0)
        setCharacters(
          charactersData.filter((character) =>
            character.name.toLowerCase().startsWith(name.toLowerCase())
          )
        );
      else setCharacters(charactersData);
    } else {
      if (name?.length > 0)
        setUrl(characterListUrl + `&nameStartsWith=${name}`);
      else {
        if(url !== characterListUrl) setUrl(characterListUrl);
      }
    }
  }, [name]);

  useEffect(() => {
    if (state.viewFavourites)
      setCharacters(
        charactersData.filter((character) =>
          state.favourites.includes(character.id)
        )
      );
    else setCharacters(charactersData);
  }, [state.viewFavourites]);

  return (
    <>
      <Header>
        <img
          src={marvelLogo}
          alt="Marvel logo"
          onClick={() => dispatch({ type: "VIEW_FAVOURITES", payload: false })}
        />
        <Favourite
          onClick={() => dispatch({ type: "VIEW_FAVOURITES", payload: true })}
          data-testid="View Favourite"
        >
          <img
            className="favourite"
            src={heartFilledIcon}
            alt="Favourite Icon"
          />
          <FavouriteCount>{state.favourites?.length}</FavouriteCount>
        </Favourite>
      </Header>
      <Body>
        <InfiniteScroll
          dataLength={characters?.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<div></div>}
          style={{ overflow: "hidden" }}
        >
          <SearchWrapper>
            <SearchInputWrapper>
              <img src={searchIcon} alt="Search Icon" />
              <SearchInput
                placeholder="SEARCH A CHARACTER..."
                onChange={(e) => debouncedSetName(e.target.value)}
              ></SearchInput>
            </SearchInputWrapper>
            {!isLoading && <label>{characters?.length} RESULTS</label>}
          </SearchWrapper>
          {isLoading ? (
            <Loader></Loader>
          ) : (
            <>
              <CharacterList>
                {characters.map((character) => (
                  <CharacterCard key={character.id}>
                    <CharacterImg
                      src={
                        character.thumbnail.path +
                        "." +
                        character.thumbnail.extension
                      }
                      alt={"Img-" + character.id.toString()}
                      data-testid={"Img-" + character.id.toString()}
                      loading="lazy"
                      onClick={() => viewDetails(character.id)}
                    ></CharacterImg>
                    <CharacterNameWrapper>
                      <CharacterName>{character.name}</CharacterName>
                      <img
                        className="favourite"
                        src={
                          state.favourites.includes(character?.id)
                            ? heartFilledIcon
                            : heartIcon
                        }
                        alt={"Add Favourite-" + character.id}
                        data-testid={"Add Favourite-" + character.id}
                        onClick={() => setFavourite(character.id)}
                      />
                      <Cut
                        className="cut"
                        src={cut}
                        alt={"cut" + character.id}
                      ></Cut>
                    </CharacterNameWrapper>
                  </CharacterCard>
                ))}
              </CharacterList>
            </>
          )}
        </InfiniteScroll>
      </Body>
    </>
  );
};

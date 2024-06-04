import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { characterListUrl, limit } from "../../marvelApi.config";
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
import cut from "../../assets/Cut.png";
import { Body, Cut, Favourite, FavouriteCount, Header } from "../../styles";
import { debounce, fetchData } from "../../utils";
import { useCharacter } from "../../reducers";
import Loader from "../Loader";

export const List = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useCharacter();
  const [characters, setCharacters] = useState<any[]>([]);
  const [charactersData, setCharactersData] = useState<any[]>([]);
  const [charactersFavourites, setCharactersFavourites] = useState<any[]>([]);
  const [name, setName] = useState<string>("");
  const [url, setUrl] = useState<string>(characterListUrl);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [index, setIndex] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const debouncedSetName = debounce((name: string) => setName(name), 500);

  const viewDetails = (characterId: string) => {
    dispatch({ type: "SELECT", payload: characterId });
    navigate("/details");
  };

  const setFavourite = (id: string) => {
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
    setCharactersFavourites(charactersData.filter(character => state.favourites.includes(character.id)));
    setCharacters(charactersData);
  }, [charactersData, state.favourites]);

  useEffect(() => {
    setIsLoading(true);
    fetchData(url).then((response: any) => {
      setCharactersData(response);
      setIsLoading(false);
    });
  }, [url]);

  useEffect(() => {
    if(state.viewFavourites) setCharacters(charactersFavourites);
    else setCharacters(charactersData)
  }, [state.viewFavourites]);

  useEffect(() => {
    if(state.viewFavourites) {
      if (name?.length > 0) setCharacters(charactersFavourites.filter(character => character.name.toLowerCase().startsWith(name.toLowerCase())));
      else setCharacters(charactersFavourites);
    }
    else {
    if (name?.length > 0) setUrl(characterListUrl + `&nameStartsWith=${name}`);
    else setUrl(characterListUrl);

    }
  }, [name]);

  useEffect(() => {
    if (state.viewFavourites)
      setCharactersFavourites(
        charactersData.filter((character: any) =>
          state.favourites.includes(character.id)
        )
      );
  }, [state.favourites]);

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
                      alt={character.id}
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
                        alt="Favourite Icon"
                        onClick={() => setFavourite(character.id)}
                      />
                      <Cut className="cut" src={cut} alt={"cut" + character.id}></Cut>
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

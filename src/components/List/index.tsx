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
import { Favourite, FavouriteCount, Header } from "../../styles";
import { fetchData } from "../../utils";
import { useCharacter } from "../../reducers";
import Loader from "../Loader";

export const List = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useCharacter();
  const [characters, setCharacters] = useState<any[]>([]);
  const [name, setName] = useState<string>("");
  const [url, setUrl] = useState<string>(characterListUrl);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [index, setIndex] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const viewDetails = (characterId: string) => {
    dispatch({ type: "SELECT", payload: characterId });
    navigate("/details");
  };

  const viewFavourites = () => {
    setCharacters(
      characters.filter((character) => state.favourites.includes(character.id))
    );
  };

  const setFavourite = (id: string) => {
    const favourite = [...state.favourites];
    if (favourite.includes(id)) {
      const index = favourite.indexOf(id);
      favourite.splice(index, 1);
    } else {
      favourite.push(id);
    }
    dispatch({ type: "FAVOURITES", payload: favourite });
  };

  const fetchMoreData = () => {
    fetchData(url + `&offset=${index * limit}`)
      .then((res) => {
        setCharacters((prevItems) => [...prevItems, ...res]);
        res?.length > 0 ? setHasMore(true) : setHasMore(false);
      })
      .catch((err) => console.log(err));
    setIndex((prevIndex) => prevIndex + 1);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData(url).then((response: any) => {
      setCharacters(response);
      setIsLoading(false);
    });
  }, [url]);

  useEffect(() => {
    if (name?.length > 0) setUrl(characterListUrl + `&nameStartsWith=${name}`);
    else setUrl(characterListUrl);
  }, [name]);

  return (
    <>
      <Header>
        <img
          src={marvelLogo}
          alt="Marvel logo"
          onClick={() => {
            fetchData(characterListUrl).then((response: any) => {
              setCharacters(response);
            });
          }}
        />
        <Favourite onClick={viewFavourites}>
          <img
            className="favourite"
            src={heartFilledIcon}
            alt="Favourite Icon"
          />
          <FavouriteCount>{state.favourites?.length}</FavouriteCount>
        </Favourite>
      </Header>
      <InfiniteScroll
        dataLength={characters?.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<div></div>}
      >
        <SearchWrapper>
          <SearchInputWrapper>
            <img src={searchIcon} alt="Search Icon" />
            <SearchInput
              placeholder="SEARCH A CHARACTER..."
              onChange={(e) => setName(e.target.value)}
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
                  </CharacterNameWrapper>
                </CharacterCard>
              ))}
            </CharacterList>
          </>
        )}
      </InfiniteScroll>
    </>
  );
};

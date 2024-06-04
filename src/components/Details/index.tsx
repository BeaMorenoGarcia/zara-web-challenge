import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { apiKeyUrl, baseUrl } from "../../marvelApi.config";
import { Body, Cut, Favourite, FavouriteCount, Header } from "../../styles";
import heartIcon from "../../assets/Heart Icon.png";
import heartFilledIcon from "../../assets/Heart filled icon.png";
import marvelLogo from "../../assets/Marvel logo.png";
import cut from "../../assets/Cut.png";
import { fetchData } from "../../utils";
import { useCharacter } from "../../reducers";
import { Loader } from "../Loader";
import { Character, Comic } from "../../types/api";

import {
  CharacterDescription,
  CharacterImg,
  CharacterInfo,
  CharacterName,
  CharacterResumeWrapper,
  ComicCard,
  ComicCarrousel,
  ComicImg,
  ComicWrapper,
  ComicsTitle,
} from "./styles";

export const Details = () => {
  const { state, dispatch } = useCharacter();
  const navigate = useNavigate();
  const [characterData, setCharacterData] = useState<Character>({id: -1, name: "", thumbnail: {path: "", extension: ""}});
  const [characterComicData, setCharacterComicData] = useState<Comic[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const characterDataUrl = `${baseUrl}/${state.id}?${apiKeyUrl}`;
  const characterComicUrl = `${baseUrl}/${state.id}/comics?${apiKeyUrl}`;

  useEffect(() => {
    setIsLoading(true);
    fetchData(characterDataUrl).then((response) => {
      setCharacterData(response[0])
    }
    );
    fetchData(characterComicUrl).then((response) => {
      setCharacterComicData(response);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <Header>
        <img
          src={marvelLogo}
          alt="Marvel logo"
          onClick={() => {
            dispatch({ type: "VIEW_FAVOURITES", payload: false });
            navigate("/list");
          }}
        />
        <Favourite>
          <img
            className="favourite"
            src={heartFilledIcon}
            alt="Favourite Icon"
            onClick={() => {
              dispatch({ type: "VIEW_FAVOURITES", payload: true });
              navigate("/list");
            }}
          />
          <FavouriteCount>{state.favourites?.length}</FavouriteCount>
        </Favourite>
      </Header>
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <Body>
          <CharacterResumeWrapper>
            <CharacterImg
              src={
                characterData.thumbnail?.path +
                "." +
                characterData.thumbnail?.extension
              }
              alt={characterData?.id.toString()}
              loading="lazy"
            ></CharacterImg>
            <CharacterInfo>
              <CharacterName>
                {characterData?.name}
                <img
                  className="favourite"
                  src={
                    state.favourites.includes(characterData.id)
                      ? heartFilledIcon
                      : heartIcon
                  }
                  alt="Favourite Icon"
                />
              </CharacterName>
              <CharacterDescription>
                {characterData.description}
              </CharacterDescription>
            </CharacterInfo>
            <Cut src={cut} alt={"cut" + characterData.id}></Cut>
          </CharacterResumeWrapper>

          <ComicWrapper>
            <ComicsTitle>{"COMICS"}</ComicsTitle>
            <ComicCarrousel>
              {characterComicData &&
                characterComicData.map((comic) => (
                  <ComicCard key={comic.id}>
                    <ComicImg
                      src={
                        comic.thumbnail?.path + "." + comic.thumbnail?.extension
                      }
                      alt={comic.id.toString()}
                      loading="lazy"
                    ></ComicImg>
                    {comic.title}
                    <Cut src={cut} alt={"cut" + comic.id}></Cut>
                  </ComicCard>
                ))}
            </ComicCarrousel>
          </ComicWrapper>
        </Body>
      )}
    </>
  );
};

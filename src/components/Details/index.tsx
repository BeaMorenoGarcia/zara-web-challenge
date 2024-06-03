import { useEffect, useState } from "react";
import { apiKey } from "../../marvelApi.config";
import { Body, Header } from "../../styles";
import heartIcon from "../../assets/Heart Icon.png";
import heartFilledIcon from "../../assets/Heart filled icon.png";
import marvelLogo from "../../assets/Marvel logo.png";
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
} from "./styles";
import { fetchData } from "../../utils";
import { useCharacter } from "../../reducers";

export const Details = () => {
  const { state } = useCharacter();
  const [characterData, setCharacterData] = useState<any>(undefined);
  const [characterComicData, setCharacterComicData] = useState<any[]>([]);
  const characterUrl = `http://gateway.marvel.com/v1/public/characters/${state.id}?ts=${apiKey.Timestamp}&apikey=${apiKey.Public}&hash=${apiKey.Hash}`;
  const characterComicUrl = `http://gateway.marvel.com/v1/public/characters/${state.id}/comics?ts=${apiKey.Timestamp}&apikey=${apiKey.Public}&hash=${apiKey.Hash}`;

  useEffect(() => {
    fetchData(characterUrl).then((response) => setCharacterData(response[0]));
    fetchData(characterComicUrl).then((response) =>
      setCharacterComicData(response)
    );
  }, []);

  return (
    <>
      <Header>
        <img src={marvelLogo} alt="Marvel logo" />
        <img
          className="favourite"
          src={
            state.favourites.includes(characterData?.id)
              ? heartFilledIcon
              : heartIcon
          }
          alt="Favourite Icon"
        />
      </Header>
      <Body>
        {characterData && (
          <CharacterResumeWrapper>
            <CharacterImg
              src={
                characterData.thumbnail?.path +
                "." +
                characterData.thumbnail?.extension
              }
              alt={characterData.id}
            ></CharacterImg>
            <CharacterInfo>
              <CharacterName>
                {characterData.name}
                <img
                  className="favourite"
                  src={heartIcon}
                  alt="Favourite Icon"
                />
              </CharacterName>
              <CharacterDescription>
                {characterData.description}
              </CharacterDescription>
            </CharacterInfo>
          </CharacterResumeWrapper>
        )}

        <ComicWrapper>
          <CharacterName>{"COMICS"}</CharacterName>
          <ComicCarrousel>
            {characterComicData &&
              characterComicData.map((comic) => (
                <ComicCard>
                  <ComicImg
                    src={
                      comic.thumbnail?.path + "." + comic.thumbnail?.extension
                    }
                    alt={comic.id}
                  ></ComicImg>
                  {comic.title}
                </ComicCard>
              ))}
          </ComicCarrousel>
        </ComicWrapper>
      </Body>
    </>
  );
};

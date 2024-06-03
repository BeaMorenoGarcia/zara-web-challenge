import axios from "axios";
import { useEffect, useState } from "react";
import { apiKey } from "../../marvelApi.config";
import { Body, Header } from "../../styles";
import heartIcon from "../../assets/Heart icon.png";
import marvelLogo from "../../assets/Marvel logo.png";
import store from "../../store";
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

export const Details = () => {
  const state = store.getState();
  const [characterData, setCharacterData] = useState<any>(undefined);
  const [characterComicData, setCharacterComicData] = useState<any[]>([]);
  const characterUrl = `http://gateway.marvel.com/v1/public/characters/${state.character.id}?ts=${apiKey.Timestamp}&apikey=${apiKey.Public}&hash=${apiKey.Hash}`;
  const characterComicUrl = `http://gateway.marvel.com/v1/public/characters/${state.character.id}/comics?ts=${apiKey.Timestamp}&apikey=${apiKey.Public}&hash=${apiKey.Hash}`;

  useEffect(() => {
    fetchData(characterUrl).then((response) => {
      setCharacterData(response[0]);
    });
    fetchData(characterComicUrl).then((response) => {
      console.log(response);
      setCharacterComicData(response);
    });
  }, []);

  return (
    <>
      <Header>
        <img src={marvelLogo} alt="Marvel logo" />
        <img className="favourite" src={heartIcon} alt="Favourite Icon" />
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

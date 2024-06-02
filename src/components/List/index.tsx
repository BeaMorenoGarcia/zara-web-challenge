import { useEffect, useState } from "react";
import axios from "axios";
import { apiKey } from "../../marvelApi.config";
import { SearchInput, SearchInputWrapper } from "./styles";
import searchIcon from "../../assets/Search button.png";

export const List = () => {
  const [characters, setCharacters] = useState<any[]>([]);
  const [name, setName] = useState<string>("");
  const baseUrl = `http://gateway.marvel.com/v1/public/characters?ts=${apiKey.Timestamp}&apikey=${apiKey.Public}&hash=${apiKey.Hash}`;

  const fetchData = async (url: string) => {
    try {
      const response = await axios.get(url);
      console.log(response.data.data.results);
      setCharacters(response.data.data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (name.length) fetchData(baseUrl + `&nameStartsWith=${name}`);
    else fetchData(baseUrl);
  }, [name]);

  return (
    <>
      <SearchInputWrapper>
        <img src={searchIcon} alt="Search Icon" />
        <SearchInput placeholder="SEARCH A CHARACTER..."></SearchInput>
      </SearchInputWrapper>
      {characters.map(character => 
        <img src={character.thumbnail.path+"."+character.thumbnail.extension} alt = {character.id}></img>
      )}
    </>
  );
};

import axios from "axios";
import { apiKey } from "../marvelApi.config";

export const fetchData = async () => {
  try {
    const response = await axios.get(
      `http://gateway.marvel.com/v1/public/characters?apiKey=${apiKey.Public}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

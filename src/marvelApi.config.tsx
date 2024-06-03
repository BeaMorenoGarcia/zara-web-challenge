import md5 from "md5";

const publicKey = process.env.REACT_APP_PUBLIC_KEY || "";
const privateKey = process.env.REACT_APP_PRIVATE_KEY || "";
const timestamp = process.env.REACT_APP_TIMESTAMP || "";

export const apiKey = {
  public: publicKey,
  private: privateKey,
  timestamp: timestamp,
  hash: md5(timestamp + privateKey + publicKey),
};


export const limit = 50;
export const baseUrl = `http://gateway.marvel.com/v1/public/characters`
export const apiKeyUrl = `ts=${apiKey.timestamp}&apikey=${apiKey.public}&hash=${apiKey.hash}`;
export const limitUrl = `&limit=${limit}`;
export const characterListUrl = `${baseUrl}?${apiKeyUrl}&limit=${limit}`

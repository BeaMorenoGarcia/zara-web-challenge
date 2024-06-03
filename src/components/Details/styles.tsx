import { styled } from "styled-components";

export const CharacterResumeWrapper = styled.div`
  height: 320px;
  padding: 0px 48px 0px 48px;
  background-color: black;
  display: flex;
  justify-content: center;
`;

export const CharacterImg = styled.img`
  width: 320px;
  height: 320px;
`;

export const CharacterInfo = styled.div`
  align-items: center;
  display: grid;
  align-content: center;
  min-width: 640px;
`;

export const CharacterName = styled.label`
  font-size: 40px;
  font-weight: 400;
  line-height: 46.88px;
  text-align: left;
  color: white;
  padding: 16px 16px 24px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & img {
    height: fit-content;
    cursor: pointer;
  }
`;

export const CharacterDescription = styled.label`
  font-weight: 400;
  font-size: 16px;
  line-height: 18.75px;
  text-align: left;

  text-align: left;
  color: white;
  padding: 16px 16px 24px 16px;
`;

export const ComicWrapper = styled.div`
  padding: 0px 48px 0px 48px;
`;

export const ComicCarrousel = styled.div`
  display: flex;
  overflow-y: auto;
`;

export const ComicCard = styled.div`
  width: 168.53px;
  display: block;
  padding: 8px;
`;

export const ComicImg = styled.img`
  width: 168.53px;
  height: 252.79px;
`;

export const ComicTitle = styled.label`
  font-size: 15.05px;
  font-weight: 500;
  line-height: 17.63px;
  text-align: left;
`;

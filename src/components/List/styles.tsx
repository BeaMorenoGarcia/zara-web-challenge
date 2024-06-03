import { styled } from "styled-components";

export const SearchWrapper = styled.div`
  width: calc(100% - 96px);
  padding: 12px 48px 12px 48px;
  gap: 12px;
  display: inline-block;
`;

export const SearchInputWrapper = styled.div`
  height: 77px;
  gap: 12px;
  align-items: center;
  display: flex;
  & img {
    margin: 2px;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 27px;
  padding: 0px 0px 8px 0px;
  gap: 12px;
  border-bottom: 1px solid black;
  border-left: none;
  border-right: none;
  border-top: none;
`;

export const CharacterList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const CharacterCard = styled.div`
  width: 188.57px;
  height: 245.97px;
  padding: 10px 5px 10px 5px;
`;

export const CharacterImg = styled.img`
  width: 188.57px;
  height: 189.97px;
  border-bottom: 4px solid red;
  cursor: pointer;
`;

export const CharacterNameWrapper = styled.div`
  width: 188.57px;
  height: 56px;
  display: flex;
  justify-content: space-between;
  background-color: black;
  align-items: center;
  & img {
    height: fit-content;
    padding: 16px 16px 24px 16px;
    cursor: pointer;
  }
`;

export const CharacterName = styled.label`
  font-size: 14px;
  font-weight: 400;
  line-height: 16.41px;
  text-align: left;
  color: white;
  padding: 16px 16px 24px 16px;
`;

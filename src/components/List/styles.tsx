import { styled } from "styled-components";

export const SearchInputWrapper = styled.div`
  width: calc(100% - 96px);
  height: 77px;
  padding: 12px 48px 12px 48px;
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

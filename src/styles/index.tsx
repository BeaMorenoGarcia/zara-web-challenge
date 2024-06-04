import { createGlobalStyle, styled } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        padding: 0;
        margin: 0;x
    }

    body, html, #root {
        height: 100%;
        font-family: -apple-system, Ubuntu , BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;;
        @media (min-width: 320px) and (max-width: 480px) { 
            width: auto;
        }
    }

    &::-webkit-scrollbar {
      width: 5px;   
      height: 5px;
    }
    
    &::-webkit-scrollbar-track {
      background: none;
    }
    
    &::-webkit-scrollbar-thumb {
      background-color: red;
      border-radius: 3px;
    }
`;

export const Header = styled.div`
  height: 52px;
  background-color: black;
  justify-content: space-between;
  padding: 16px 48px 16px 48px;
  display: flex;
  align-items: center;
  img {
    height: fit-content;
    cursor: pointer;
  }
  @media (min-width: 320px) and (max-width: 480px) {
    padding: 16px;
  }
`;

export const Favourite = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const FavouriteCount = styled.label`
  padding: 10px;
  color: white;
`;

export const Body = styled.div`
  height: calc(100% - 52px);
`;

export const Cut = styled.img`
  position: absolute;
  bottom: 0;
  right: 0;
  height: 24px;
  width: 24px;
`;

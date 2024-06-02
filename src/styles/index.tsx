import { createGlobalStyle, styled } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        padding: 0;
        margin: 0;x
    }

    body, html, #root {
        height: 100%;
        font-family: -apple-system, Ubuntu , BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;;
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
`;

export const Body = styled.div`
    height: calc(100% - 84px);
`;

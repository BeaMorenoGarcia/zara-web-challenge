import React from "react";
import { render, fireEvent } from "@testing-library/react";

import * as Utils from "../../utils";

import { Details } from ".";

// Mocked character data
const mockCharacterData = [{
  id: 1,
  name: "Iron Man",
  thumbnail: { path: "path/to/image", extension: "jpg" },
  description: "Genius, billionaire, playboy, philanthropist.",
}];

// Mocked comic data
const mockComicData = [
  {
    id: 1,
    title: "Iron Man Vol. 1",
    thumbnail: { path: "path/to/image", extension: "jpg" },
  },
  {
    id: 2,
    title: "Iron Man Vol. 2",
    thumbnail: { path: "path/to/image", extension: "jpg" },
  },
];

// Mocked state and dispatch function
const mockState = {
  id: 1,
  favourites: [],
};
const mockDispatch = jest.fn();

jest.mock("../../utils", () => ({
  fetchData: jest.fn((url) => {
    if (url.includes("character")) {
      return Promise.resolve([mockCharacterData]);
    } else if (url.includes("comics")) {
      return Promise.resolve(mockComicData);
    }
  }),
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

jest.mock("../../reducers", () => ({
  useCharacter: () => ({
    state: mockState,
    dispatch: mockDispatch,
  }),
}));

describe("Details component", () => {
  beforeEach(() => {
    jest
      .spyOn(Utils, "fetchData")
      .mockResolvedValueOnce(mockCharacterData)
      .mockResolvedValueOnce(mockComicData);
  });

  test("renders character details and comics", async () => {

    const { findByText } = render(<Details />);

    await findByText(mockCharacterData[0].name);

    expect(findByText(mockCharacterData[0].name));
    expect(findByText(mockCharacterData[0].description));
  });

  test("clicking Marvel logo navigates to /list", async () => {
    const { getByAltText } = render(<Details />);
    const marvelLogo = getByAltText("Marvel logo");

    fireEvent.click(marvelLogo);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "VIEW_FAVOURITES",
      payload: false,
    });
  });

  test("clicking heart icon navigates to /list", async () => {
    const { getByAltText } = render(<Details />);
    const heartIcon = getByAltText("Favourite Icon");

    fireEvent.click(heartIcon);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "VIEW_FAVOURITES",
      payload: true,
    });
  });
});

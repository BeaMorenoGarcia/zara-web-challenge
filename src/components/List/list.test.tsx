import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import * as Utils from '../../utils';

import { List } from ".";

const mockData =[ {
  id: 1,
  name: "Iron Man",
  thumbnail: { path: "path/to/image", extension: "jpg" },
  description: "Genius, billionaire, playboy, philanthropist.",
},  {
  id: 2,
  name: "Spider Man 2",
  thumbnail: { path: "path/to/image", extension: "jpg" },
  description: "Teenager",
}];

const mockState = {
  id: 1,
  favourites: [],
};
// Mock de useCharacter hook
jest.mock("../../reducers", () => ({
  useCharacter: () => ({
    state: mockState,
    dispatch: mockDispatch,
  }),
}));

const mockDispatch = jest.fn();
const mockNavigate = jest.fn();

// Mock de useNavigate hook
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

beforeEach(() => {
  jest.spyOn(Utils, 'fetchData').mockResolvedValue(mockData);
});

afterEach(() => {
  jest.clearAllMocks();
});

test("renders the List component", () => {
  const { getByPlaceholderText, getByAltText } = render(
    <Router>
      <List />
    </Router>
  );

  expect(getByAltText("Marvel logo")).toBeInTheDocument();
  expect(getByPlaceholderText("SEARCH A CHARACTER...")).toBeInTheDocument();
});

test("clicking the favourite icon dispatches the correct action", async () => {
  const { findByText, getByTestId } = render(
    <Router>
      <List />
    </Router>
  );

  await findByText("2 RESULTS");

  const favouriteIcon = getByTestId("Add Favourite-101");
  fireEvent.click(favouriteIcon);

  expect(mockDispatch).toHaveBeenCalledWith({
    type: "CHANGE_FAVOURITES",
    payload: [101],
  });
});

test("clicking the character image navigates to details page", () => {
  const { getByTestId } = render(
    <Router>
      <List />
    </Router>
  );

  const characterImage = getByTestId("Img-101");
  fireEvent.click(characterImage);

  expect(mockDispatch).toHaveBeenCalledWith({
    type: "SELECT",
    payload: 101,
  });
  expect(mockNavigate).toHaveBeenCalledWith("/details");
});
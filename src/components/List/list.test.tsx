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
})

afterEach(() => {
  jest.clearAllMocks();
});

test("renders the List component", async () => {

  jest.spyOn(Utils, 'fetchData').mockResolvedValue(mockData);

  const { findByText, getByPlaceholderText, getByAltText } = render(
    <Router>
      <List />
    </Router>
  );

  await findByText("2 RESULTS");

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

  const favouriteIcon = getByTestId("Add Favourite-1");
  fireEvent.click(favouriteIcon);

  expect(mockDispatch).toHaveBeenCalledWith({
    type: "CHANGE_FAVOURITES",
    payload: [1],
  });
});

test("clicking the character image navigates to details page", async () => {

  jest.spyOn(Utils, 'fetchData').mockResolvedValue(mockData);

  const { findByText, getByTestId } = render(
    <Router>
      <List />
    </Router>
  );

  await findByText("2 RESULTS");

  const characterImage = getByTestId("Img-1");
  fireEvent.click(characterImage);

  expect(mockDispatch).toHaveBeenCalledWith({
    type: "SELECT",
    payload: 1,
  });
  expect(mockNavigate).toHaveBeenCalledWith("/details");
});
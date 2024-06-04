import { createContext, ReactNode, useReducer, useContext } from "react";

type CharacterState = {
  id: number;
  favourites: number[];
  viewFavourites: boolean;
}

const initialState: CharacterState = {
  id: -1,
  favourites: [],
  viewFavourites: false
};

type Action = { type: 'SELECT', payload: number } | { type: 'CHANGE_FAVOURITES', payload: number[] } | { type: 'VIEW_FAVOURITES', payload: boolean };

const CharacterContext = createContext<{
  state: CharacterState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

const characterReducer = (
  state: CharacterState = initialState,
  action: Action
): CharacterState => {
  switch (action.type) {
    case "SELECT":
      return {
        ...state,
        id: action.payload
      };
    case "CHANGE_FAVOURITES": {
      return {
        ...state,
        favourites: action.payload
      }
    }
    case "VIEW_FAVOURITES": {
      return {
        ...state,
        viewFavourites: action.payload
      }
    }
    default:
      return state;
  }
};


export const CharacterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(characterReducer, initialState);

  return (
    <CharacterContext.Provider value={{ state, dispatch }}>
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacter = () => useContext(CharacterContext);

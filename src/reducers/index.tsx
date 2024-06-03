import { createContext, ReactNode, useReducer, useContext } from "react";

interface CharacterState {
  id: string;
  favourites: string[];
}

const initialState: CharacterState = {
  id: "-1",
  favourites: []
};

type Action = { type: 'SELECT', payload: string } | { type: 'FAVOURITES', payload: string[] };

const CharacterContext = createContext<{
  state: CharacterState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

const characterReducer = (
  state: CharacterState = initialState,
  action: { type: string; payload: any}
): CharacterState => {
  switch (action.type) {
    case "SELECT":
      return {
        ...state,
        id: action.payload
      };
    case "FAVOURITES": {
      return {
        ...state,
        favourites: action.payload
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

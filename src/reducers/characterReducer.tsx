interface CharacterState {
  id: number;
  favourites: number[];
}

const initialState: CharacterState = {
  id: -1,
  favourites: []
};

const characterReducer = (
  state: CharacterState = initialState,
  action: { type: string; payload: any}
): CharacterState => {
  switch (action.type) {
    case "SELECT":
      return {
        ...state,
        id: action.payload.id
      };
    case "FAVOURITES": {
      return {
        ...state,
        favourites: action.payload.favourites
      }
    }
    default:
      return state;
  }
};

export default characterReducer;

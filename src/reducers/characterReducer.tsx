interface CharacterState {
  id: number;
  name?: string;
  photoURL?: string;
}

const initialState: CharacterState = {
  id: -1,
};

const characterReducer = (
  state = initialState,
  action: { type: string; payload: CharacterState }
): CharacterState => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        // TO-DO: Action para cambiar character seleccionado
      };
    default:
      return state;
  }
};

export default characterReducer;

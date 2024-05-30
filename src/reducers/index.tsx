import { combineReducers } from "redux";
import characterReducer from "./characterReducer";

const rootReducer = combineReducers({
  character: characterReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;

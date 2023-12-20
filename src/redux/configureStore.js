import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducer";
import { combineReducers, applyMiddleware, createStore } from "redux";
export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    combineReducers({
      todoList: rootReducer,
    }),
    applyMiddleware(sagaMiddleware)
  );
  return {
    ...store,
    runSaga: sagaMiddleware.run,
  };
}

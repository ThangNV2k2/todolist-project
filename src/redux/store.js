// import { configureStore } from "@reduxjs/toolkit";
// import createSagaMiddleware from "redux-saga";
// import rootReducer from "./reducer";
import configureStore from "./configureStore";
import watchTodosSaga from "./saga";

// khởi tạo saga middleware
// const sagaMiddleware = createSagaMiddleware();
// const store = configureStore({
//   reducer: {
//     todoList: rootReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(sagaMiddleware),
// });
// sagaMiddleware.run(workerTodosSaga);

// export default store;

const store = configureStore();
store.runSaga(watchTodosSaga);
export default store;

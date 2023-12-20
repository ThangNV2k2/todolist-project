import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducer';
import todosSaga from './saga';

// khởi tạo saga middleware
const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
    reducer: {
        todoList: rootReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});
sagaMiddleware.run(todosSaga);

export default store;
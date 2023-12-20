import { call, put, takeLatest } from "redux-saga/effects";
import { getTodoList, addTodoItem, deleteTodoItem, editTodoItem } from "./api";
import {
  FETCH_TASK_SUCCESS,
  FETCH_TASK_FAILED,
  FETCH_TASK,
  ADD_TODO,
  ADD_TODO_SUCCESS,
  EDIT_TODO_ITEM,
  DELETE_TODO_ITEM,
  SWAP_TODO_ITEM,
} from "./task";

function* fetchTodoList() {
  try {
    const todoList = yield getTodoList();
    yield put({ type: FETCH_TASK_SUCCESS, todoList: todoList });
  } catch (e) {
    yield put({ type: FETCH_TASK_FAILED, message: e.message });
  }
}
function* addTodo(action) {
  try {
    const newTodo = yield call(addTodoItem, action.payload);
    yield put({
      type: ADD_TODO_SUCCESS,
      payload: { oldTodo: action.payload, newTodo },
    });
  } catch (e) {
    console.log(e.message);
  }
}
function* editTodo(action) {
  try {
    yield call(editTodoItem, action.payload);
  } catch (e) {
    console.log(e.message);
  }
}
function* swapTodoItem(action) {
  try {
    yield call(editTodoItem, action.payload.todo1); // phía api phát sinh lỗi, do trùng id
    yield call(editTodoItem, action.payload.todo2);
  } catch (e) {
    console.log(e.message);
  }
}
function* deleteTodo(action) {
  try {
    yield call(deleteTodoItem, action.payload);
  } catch (e) {
    console.log(e.message);
  }
}
function* watchTodosSaga() {
  yield takeLatest(FETCH_TASK, fetchTodoList);
  yield takeLatest(ADD_TODO, addTodo);
  yield takeLatest(EDIT_TODO_ITEM, editTodo);
  yield takeLatest(DELETE_TODO_ITEM, deleteTodo);
  yield takeLatest(SWAP_TODO_ITEM, swapTodoItem);
}

export default watchTodosSaga;

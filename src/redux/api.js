import axios from "axios";
import { call } from "redux-saga/effects";

// mock api
export const endpoint_api =
  "https://6563668aee04015769a72825.mockapi.io/api/v1/todoList";

export function* getTodoList() {
  try {
    const response = yield call(axios.get, endpoint_api);
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export function* addTodoItem(todo) {
  try {
    const response = yield call(axios.post, endpoint_api, todo);
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export function* editTodoItem(todo) {
  try {
    const response = yield call(axios.put, `${endpoint_api}/${todo.id}`, todo);
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
export function* deleteTodoItem(id) {
  try {
    const response = yield call(axios.delete, `${endpoint_api}/${id}`);
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

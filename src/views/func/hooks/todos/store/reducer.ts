import { AnyAction } from "redux";
import produce from "immer";
import * as types from "./contant";

export interface TodoOptions {
  id?: number;
  text?: string;
  completed?: boolean;
}

export interface TodoListInterface {
  todoList: TodoOptions[];
  visibilityFilter: string;
  toggleTodoStatus: boolean;
}

const TodoListState: TodoListInterface = {
  todoList: [
    { id: 1, text: "star this repository", completed: true },
    { id: 2, text: "fork this repository", completed: true },
    { id: 3, text: "follow author", completed: false },
    { id: 4, text: "任务1", completed: false },
    { id: 5, text: "任务2", completed: true }
  ],
  visibilityFilter: "SHOW_ALL",
  toggleTodoStatus: false
};

const TodoList = (state: TodoListInterface = TodoListState, action: AnyAction) =>
  produce(state, draftState => {
    // console.log('reducer->state', state);
    // console.log(draftState.todoList);
    // console.log(action);
    switch (action.type) {
      // 添加 todo
      case types.ADD_TODOS:
        draftState.todoList = [action.todoList, ...state.todoList];
        break;
      // 全选/全不选
      case types.TOGGLE_TODO_ALL:
        draftState.toggleTodoStatus = action.active;
        break;
      // 切换 todo
      case types.TOGGLE_TODOS:
        draftState.todoList = state.todoList.map(value =>
          value.id == action.todoList.id ? { ...value, completed: !value.completed } : value
        );
        break;
      // 删除 todo
      case types.DEL_TODOS:
        draftState.todoList = state.todoList.filter(value => value.id !== action.todoList.id);
        break;
      // 清除 todo
      case types.CLEAR_TODOS:
        draftState.todoList = [];
        break;
      // 过滤
      case types.SET_VISIBILITY_FILTER:
        draftState.visibilityFilter = action.filter;
        break;
      default:
        return state;
    }
  });

export default TodoList;

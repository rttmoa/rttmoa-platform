import React from "react";
import { connect } from "react-redux";
import Todo from "../components/Todo";
import { toggleTodo } from "../store/action";

import { TodoListInterface, TodoOptions } from "../store/reducer";

const TodoList = (props: any) => {
  const { todoList, onTodoClick } = props;
  // console.log(todoList);
  return (
    <section className="todo-list">
      <ul>
        {todoList &&
          todoList?.map((todo: TodoOptions) => {
            return <Todo key={todo?.id || 0} {...todo} onTodoClick={onTodoClick}></Todo>;
          })}
      </ul>
    </section>
  );
};

const getVisibleTodos = (todoList: TodoListInterface["todoList"], filter: string) => {
  // console.log(todoList, filter)
  switch (filter) {
    case "SHOW_ALL":
      return todoList;
    case "SHOW_COMPLETED":
      return todoList.filter(todo => todo.completed);
    case "SHOW_ACTIVE":
      return todoList.filter(todo => !todo.completed);
    default:
      return todoList;
  }
};

const mapStateToProps = (state: any) => {
  return { todoList: getVisibleTodos(state.todos.todoList, state.todos.visibilityFilter) };
};
const mapDispatchToProps = { onTodoClick: toggleTodo };
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);

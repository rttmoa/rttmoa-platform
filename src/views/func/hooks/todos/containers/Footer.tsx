import React from "react";
import { connect } from "react-redux";
import { setVisibilityFilter, visibilityStatus, clearTodo } from "../store/action";

const Footer = (props: any) => {
  const { setVisibilityFilter, clearTodo, active, len } = props;
  const set = (filter: string) => {
    setVisibilityFilter(filter);
  };
  return (
    <footer>
      <span className="todo-count">
        <strong>{len}</strong>
        <span> items </span>
      </span>
      <ul className="filters">
        {visibilityStatus.map((v: any, index: number) => (
          <li key={index}>
            <span
              className={v.filter === active ? "selected" : ""}
              onClick={e => {
                e.stopPropagation();
                set(v.filter);
              }}
            >
              {v.text}
            </span>
            {".                     	."}
          </li>
        ))}
      </ul>
      <button
        className="clear-completed"
        onClick={e => {
          clearTodo();
        }}
      >
        Clear completed
      </button>
    </footer>
  );
};

const mapStateToProps = (state: any) => {
  return {
    active: state.todos.visibilityFilter,
    len: state.todos.todoList.length || 0
  };
};
const mapDispatchToProps = { setVisibilityFilter, clearTodo };
export default connect(mapStateToProps, mapDispatchToProps)(Footer);

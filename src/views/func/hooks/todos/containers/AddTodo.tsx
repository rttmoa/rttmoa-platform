import React from "react";
import { connect } from "react-redux";
import { addTodos, toggleTodoAll, setToggleTodoStatus } from "../store/action";

class AddTodo extends React.Component<any, any> {
  state = {
    // toggloeClick: false
    toggloeClick: this.props.toggleTodoStatus
  };

  add(e: any) {
    if (e.keyCode !== 13) return null;
    this.props.addTodos(e.target.value);
    e.target.value = "";
  }

  togClick(event: any) {
    this.props.toggleTodoAll(this.state.toggloeClick);
    this.setState({
      toggloeClick: !this.state.toggloeClick
    });
  }

  render() {
    return (
      <header>
        <input
          type="checkbox"
          className={this.state.toggloeClick ? "toggle-all active" : "toggle-all"}
          onClick={this.togClick.bind(this)}
        />
        <input type="text" className="new-todo" placeholder="What needs to be done?" onKeyDown={this.add.bind(this)} />
      </header>
    );
  }
}

const mapStateToProps = (state: any) => {
  return { toggleTodoStatus: state.todos.toggleTodoStatus };
};
const mapDispatchToProps = { addTodos, toggleTodoAll };
export default connect(mapStateToProps, mapDispatchToProps)(AddTodo);

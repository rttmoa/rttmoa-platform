import "./index.less";
import { connect } from "react-redux";
import { addTodos } from "./store/action";
import AddTodo from "./containers/AddTodo";
import TodoList from "./containers/TodoList";
import Footer from "./containers/Footer";

// 在线访问：		https://react-typescript-todomvc.netlify.app/
// Github地址：	https://github.com/laststance/react-typescript-todomvc-2022
const Todos = (props: any) => {
  return (
    <div id="redux-todo">
      <p></p>
      <a href="https://react-typescript-todomvc.netlify.app/" target="_black">
        TodosMVC-typescript参考（在线）
      </a>
      <p></p>
      <a href="https://github.com/laststance/react-typescript-todomvc-2022" target="_black">
        TodosMVC-typescript参考（github）
      </a>
      <h1>todos</h1>
      <div className="main">
        <AddTodo />
        <TodoList />
        <Footer />
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => state;
const mapDispatchToProps = { addTodos };
export default connect(mapStateToProps, mapDispatchToProps)(Todos);

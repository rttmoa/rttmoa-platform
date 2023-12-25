import React from 'react';

// 组件渲染错误是很常见的情况
// 在这种情况下，组件错误不应该破坏整个应用。创建错误边界可避免应用在特定组件发生错误时中断
// 错误边界是一个 React 组件，可以捕获子组件中的 JavaScript 错误。我们可以包含错误、记录错误消息，并为 UI 组件故障提供回退机制/
// 错误边界是基于高阶组件的概念
export class ErrorBoundaries extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasErrors: false
        }
    }

    // componentDidCatch 函数用来将错误信息记录到应用中
    componentDidCatch(error, info) {
        console.dir("Component Did Catch Error");
    }

    // static 函数用于指定回退机制，并从收到的错误中获取组件的新状态
    static getDerivedStateFromError(error) {
        console.dir("Get Derived State From Error");
        return {
            hasErrors: true
        }
    }

    render() {

        if(this.state.hasErrors === true) {
            return <div>This is a Error</div>
        }

        return <div><ShowData name="Mayank" /></div>
    }
}

export class ShowData extends React.Component {

    constructor() {
        super();
        this.state = {
            name: "Mayank"
        }
    }

    changeData = () => {
       this.setState({
           name: "Anshul"
       })
    }
    render() {

        if(this.state.name === "Anshul") {
            throw new Error("Sample Error")
        }

        return (
            <div>
                <b>This is the Child Component {this.state.name}</b>
                <input type="button" onClick={this.changeData} value="Click To Throw Error" />
            </div>
        )
    }
}


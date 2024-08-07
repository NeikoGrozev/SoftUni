import { Component } from "react";

import Header from "./components/Header";
import TodoList from "./components/TodoList";
import TodoContext from "./context/TodoContext";

export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            todos: [],
            name: 'Pesho'
        }
    }
    componentDidMount() {
        console.log('Mount');
        fetch('http://localhost:3030/jsonstore/todos')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    todos: Object.values(data)
                });
            })
            .catch(err => console.log(err));
    }

    toggleTodo(toodId) {
        this.setState({
            todos: this.state.todos.map(todo => todo._id === toodId ? { ...todo, isCompleted: !todo.isCompleted } : todo)
        })
    }

    deleteTodo(todoId) {
        this.setState({
            todos: this.state.todos.filter(todo => todo._id !== todoId)
        })
    }

    render() {
        return (
            <>
                <TodoContext.Provider value={{ name: this.state.name }}>
                    <Header />

                    <TodoList
                        todos={this.state.todos}
                        toggleTodo={this.toggleTodo.bind(this)}
                        deleteTodo={this.deleteTodo.bind(this)}
                    />
                </TodoContext.Provider>
            </>
        )

    }
}
import { useEffect, useState } from "react"

import Header from "./components/Header"
import { TodoContext } from "./context/TodoContext";
import CardContainer from "./components/CardContainer"

const baseUrl = "http://localhost:3030/jsonstore/todos";

function App() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetch(baseUrl)
            .then(response => response.json())
            .then(result => setTodos(Object.values(result)));
    });

    const onSubmitHandler = async (value) => {
        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: { "content-Type": "application/json" },
            body: JSON.stringify({ ...value, isFinish: 'false' })
        });

        const data = response.json();
        setTodos(state => [...state, data]);
    };

    const onChangeState = async (id) => {
        const todoIndex = todos.findIndex(todo => todo._id === id);
        const currentTodos = [...todos];
        const currentTodo = currentTodos[todoIndex];
        currentTodo.isFinish = currentTodo.isFinish === 'false' ? 'true' : 'false';
        currentTodos[todoIndex] = currentTodo;
        setTodos(currentTodos);

        await fetch(`${baseUrl}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(currentTodo),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    const context = {
        onSubmitHandler,
        onChangeState,
        todos
    }

    return (
        <>
            <TodoContext.Provider value={context}>
                <Header />
                <CardContainer />
            </TodoContext.Provider>
        </>
    )
}

export default App

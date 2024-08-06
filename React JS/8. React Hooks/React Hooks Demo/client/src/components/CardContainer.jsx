import { useContext } from "react";
import AddTodo from "./AddTodo";
import ToDoCard from "./ToDoCard";
import { TodoContext } from "../context/TodoContext";

export default function CardContainer() {
    const { todos } = useContext(TodoContext);

    return (
        <>
            <AddTodo />
            {todos.map(todo => <ToDoCard key={todo._id} {...todo} />)}

        </>
    );
}
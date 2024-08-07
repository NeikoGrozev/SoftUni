export default function TodoItem(props) {
const onChangeStatusClick = () => {
    props.changeStatusHandler(props.id);
}

    return (
        <>
            <tr className={`todo${props.isCompleted ? ' is-completed' : ''}`}>
                <td>{props.text}</td>
                <td>{props.isCompleted ? 'Complete' : 'In Complete'}</td>
                <td className="todo-action">
                    <button onClick={onChangeStatusClick} className="btn todo-btn">Change status</button>
                </td>
            </tr>
        </>
    );
}
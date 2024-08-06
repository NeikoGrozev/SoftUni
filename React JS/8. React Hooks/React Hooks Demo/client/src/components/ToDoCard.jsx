import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { TodoContext } from '../context/TodoContext';

export default function ToDoCard({ _id, title, isFinish }) {
    const { onChangeState } = useContext(TodoContext);

    const changeState = () => {
        onChangeState(_id);
    }

    return (
        <>
            <div style={{ margin: "20px" }}>
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>{title}</Card.Title>
                        <Card.Text> state: {isFinish}</Card.Text>
                        <Button variant="primary" onClick={changeState}>Change state</Button>
                    </Card.Body>
                </Card>
            </div >
        </>
    );
}
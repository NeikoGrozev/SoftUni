import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useContext, useState } from 'react';
import useForm from '../hooks/useForm';
import { TodoContext } from '../context/TodoContext';

export default function AddTodo() {
    const { onSubmitHandler } = useContext(TodoContext);
    const { formValue, changeHandler, submitHandler } = useForm({ "title": "" }, onSubmitHandler);

    return (
        <>
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Todo title</Form.Label>
                    <Form.Control type="text" name='title' value={formValue.title} onChange={changeHandler} />
                </Form.Group>
                {/* <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>State</Form.Label>
                    <Form.Control type='text' name='state' />
                </Form.Group> */}
                <Button variant="primary" type='submit'>Submit</Button>
            </Form>
        </>
    );
}
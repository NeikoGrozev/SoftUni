import { useEffect, useRef, useState } from "react";

import styles from './ControlledForm.module.css'

const formInitialState = {
    username: '',
    password: '',
    age: '',
    gender: '',
    swimming: false,
    shopping: false,
    running: false
}

const formErrorsState = {
    username: '',
    password: '',
    age: '',
}

export default function ControlledForm({
    formRef
}) {
    const usernameInputRef = useRef();
    const isMountRef = useRef(false);
    const [formValue, setFormValue] = useState(formInitialState);
    const [errors, setErrors] = useState(formErrorsState);

    useEffect(() => {
        usernameInputRef.current.focus();
    }, [])

    //Executed only on update
    useEffect(() => {
        if (!isMountRef.current) {
            isMountRef.current = true;
            return;
        }

        console.log('Form is updated');
    }, [formValue])

    const changeHandler = (e) => {
        let value = e.target.value;

        if (e.target.type === 'number') {
            value = Number(value);
        } else if (e.target.type === 'checkbox') {
            value = e.target.checked;
        }

        setFormValue(state => ({
            ...state,
            [e.target.name]: value
        }))
    };

    const ageValidator = (e) => {
        if (formValue.age < 0 || formValue.age > 120) {
            setErrors(state => ({
                ...state,
                age: 'Age should be between 0 and 120!'
            }));
        } else {
            if (errors.age) {
                setErrors(state => ({
                    ...state,
                    age: ''
                }));
            }
        }
    };

    const resetFormHandler = () => {
        setFormValue(formInitialState);
        setErrors(formErrorsState);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        resetFormHandler();
    };

    return (
        <>
            <h1>Controlled Form</h1>
            <form ref={formRef} onSubmit={submitHandler}>
                <div>
                    <label htmlFor="username">Username: </label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={formValue.username}
                        ref={usernameInputRef}
                        onChange={changeHandler}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={formValue.password}
                        onChange={changeHandler}
                    />
                </div>
                <div>
                    <label htmlFor="age">Age: </label>
                    <input
                        type="number"
                        name="age"
                        id="age"
                        value={formValue.age}
                        onChange={changeHandler}
                        onBlur={ageValidator}
                        className={errors.age && styles.inputError}
                    />
                    {errors.age && (<p className={styles.errorMessages}>{errors.age}</p>)}
                </div>
                <div>
                    <label htmlFor="gender"></label>
                    <select name="gender" id="gender" onChange={changeHandler} value={formValue.gender}>
                        <option value="">Selected gender...</option>
                        <option value="f">F</option>
                        <option value="m">M</option>
                    </select>
                </div>
                <div>
                    <h3>Hobbies</h3>
                    <label htmlFor="swimming">Swimming</label>
                    <input type="checkbox" name="swimming" id="swimming" checked={formValue.swimming} onChange={changeHandler} />
                    <label htmlFor="shopping">Shopping</label>
                    <input type="checkbox" name="shopping" id="shopping" checked={formValue.shopping} onChange={changeHandler} />
                    <label htmlFor="running">Running</label>
                    <input type="checkbox" name="running" id="running" checked={formValue.running} onChange={changeHandler} />

                </div>
                <div>
                    <button type="submit" disabled={Object.values(errors).some(x => x)}>Register</button>
                    <button type="button" onClick={resetFormHandler}>Reset</button>
                </div>
            </form>
        </>
    );
}
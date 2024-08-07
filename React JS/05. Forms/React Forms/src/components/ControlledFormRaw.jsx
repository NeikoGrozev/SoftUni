import { useState } from "react";

export default function ControlledFormRaw() {

    const [usernameValue, setUsernameValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [ageValue, setAgeValue] = useState('');

    const usernameChangeHandler = (e) => {
        setUsernameValue(e.currentTarget.value);
    };

    const passwordChangeHandler = (e) => {
        setPasswordValue(e.currentTarget.value);
    };

    const ageChangeHandler = (e) => {
        setAgeValue(Number(e.currentTarget.value));
    };

    const resetFormHandler = (e) => {
        setUsernameValue('');
        setPasswordValue('');
        setAgeValue('');
    };

    const submitHandler = (e) => {

    };

    return (
        <>
            <h1>Controlled Form Raw</h1>
            <form>
                <div>
                    <label htmlFor="username">Username: </label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={usernameValue}
                        onChange={usernameChangeHandler}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={passwordValue}
                        onChange={passwordChangeHandler}
                    />
                </div>
                <div>
                    <label htmlFor="age">Age: </label>
                    <input
                        type="number"
                        name="age"
                        id="age"
                        value={ageValue}
                        onChange={ageChangeHandler}
                    />
                </div>
                <div>
                    <button type="button" onClick={submitHandler}>Register</button>
                    <button type="button" onClick={resetFormHandler}>Reset</button>
                </div>
            </form>
        </>
    );
}
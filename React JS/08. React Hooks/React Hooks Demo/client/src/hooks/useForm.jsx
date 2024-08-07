import { useState } from "react";

export default function useForm(initValue, onSubmitHandler) {
    const [formValue, setFormValue] = useState(initValue);

    const changeHandler = (e) => {
        setFormValue(state => ({ ...state, [e.target.name]: [(e.target.value).toUpperCase()] }));
    }

    const submitHandler = (e) => {
        e.preventDefault();

        if (onSubmitHandler) {
            onSubmitHandler(formValue);
        }

        setFormValue({title: ''})
    };

    return {
        formValue,
        changeHandler,
        submitHandler
    }
}
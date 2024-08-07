import { useContext } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../context/authContext";
import useForm from "../../hooks/useForm";

const RegisterFormKeys = {
    Username: 'username',
    Email: 'email',
    Password: 'password',
    ConfirmPassword: 'confirm-password'
};

export default function Register() {
    const { registerSubmitHandler } = useContext(AuthContext);
    const { formValues, onChange, onSubmit } = useForm(registerSubmitHandler, {
        [RegisterFormKeys.Email]: '',
        [RegisterFormKeys.Password]: ''
    });

    return (
        <>
            {/* <!-- Register Page ( Only for Guest users ) --> */}
            <section id="register-page" className="content auth">
                <form id="register" onSubmit={onSubmit}>
                    <div className="container">
                        <div className="brand-logo"></div>
                        <h1>Register</h1>

                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name={RegisterFormKeys.Username}
                            onChange={onChange}
                            value={formValues[RegisterFormKeys.Username]}
                        />

                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name={RegisterFormKeys.Email}
                            placeholder="maria@email.com"
                            onChange={onChange}
                            value={formValues[RegisterFormKeys.Email]}
                        />

                        <label htmlFor="pass">Password:</label>
                        <input
                            type="password"
                            name={RegisterFormKeys.Password}
                            id="register-password"
                            onChange={onChange}
                            value={formValues[RegisterFormKeys.Password]}
                        />

                        <label htmlFor="con-pass">Confirm Password:</label>
                        <input
                            type="password"
                            name={RegisterFormKeys.ConfirmPassword}
                            id="confirm-password"
                            onChange={onChange}
                            value={formValues[RegisterFormKeys.ConfirmPassword]}
                        />

                        <input className="btn submit" type="submit" value="Register" />

                        <p className="field">
                            <span>If you already have profile click <Link to="/login">here</Link></span>
                        </p>
                    </div>
                </form>
            </section>
        </>
    );
}
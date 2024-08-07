import { Link } from "react-router-dom";

import useForm from "../../hooks/useForm";
import { useContext } from "react";
import AuthContext from "../context/authContext";

const LoginFormKeys = {    
    Email: 'email',
    Password: 'password'
};

export default function Login() {
    const { loginSubmitHandler } = useContext(AuthContext);
    const { formValues, onChange, onSubmit } = useForm(loginSubmitHandler, {
        [LoginFormKeys.Username]: '',
        [LoginFormKeys.Email]: '',
        [LoginFormKeys.Password]: ''
    });

    return (
        <>
            {/* <!-- Login Page ( Only for Guest users ) --> */}
            <section id="login-page" className="auth">
                <form id="login" onSubmit={onSubmit}>

                    <div className="container">
                        <div className="brand-logo"></div>
                        <h1>Login</h1>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name={LoginFormKeys.Email}
                            placeholder="Sokka@gmail.com"
                            value={formValues[LoginFormKeys.Email]}
                            onChange={onChange}
                        />

                        <label htmlFor="login-pass">Password:</label>
                        <input
                            type="password"
                            id="login-password"
                            name={LoginFormKeys.Password}
                            value={formValues[LoginFormKeys.Password]}
                            onChange={onChange}
                        />
                        <input type="submit" className="btn submit" value="Login" />
                        <p className="field">
                            <span>If you don't have profile click <Link to="/register">here</Link></span>
                        </p>
                    </div>
                </form>
            </section>
        </>
    );
}
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from '../../context/authContext';
import Path from "../../paths";

export default function BaseAuthGuard(props) {
    const { isAuthenticated } = useContext(AuthContext);

    if (!isAuthenticated) {
        return <Navigate to={Path.Login} />
    }

    return (
        <>
            {props.children}
        </>
    );
}
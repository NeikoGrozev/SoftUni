import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Path from "../../paths";

import * as authService from '../../services/authService';

import AuthContext from "../../context/authContext";

export default function Logout() {
    const { logoutHandler } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        authService.logout()
            .then(() => {
                logoutHandler();
                navigate(Path.Home);
            })
            .catch(() => {
                logoutHandler();
                navigate(Path.Home);
            });
    }, [])
    return null;
}
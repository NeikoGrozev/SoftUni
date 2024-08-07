import { useContext } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../context/authContext';

export default function Header() {
    const {
        isAuthenticated,
        username
    } = useContext(AuthContext);

    return (
        <>
            <header>
                {/* <!-- Navigation --> */}
                <h1><Link className="home" to="/">GamesPlay</Link></h1>
                <nav>
                    <Link to="/games">All games</Link>
                    {/* <!-- Logged-in users --> */}

                    {isAuthenticated && (
                        <div id="user">
                            <Link to="/game-create">Create Game</Link>
                            <Link to="/logout">Logout</Link>
                        </div>
                    )}

                    {/* <!-- Guest users --> */}
                    {!isAuthenticated && (
                        <div id="guest">
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </div>
                    )}
                </nav>
            </header>
        </>
    );
}
import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './components/context/authContext';
import Path from './paths';

import Header from './components/header/Header';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Logout from './components/logout/Logout';
import Home from "./components/home/Home";
import GameList from './components/game-list/GameList';
import GameCreate from './components/game-create/GameCreate';
import GameDetails from './components/game-details/GameDetails';
import GameEdit from './components/game-edit/GameEdit';

function App() {


  return (
    <>
      <AuthProvider>
        <div id="box">
          <Header />

          <Routes>
            <Route path={Path.Home} element={<Home />} />
            <Route path='/games' element={<GameList />} />
            <Route path='/game-create' element={<GameCreate />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/games/:gameId' element={<GameDetails />} />
            <Route path={Path.GameEdit} element={<GameEdit />} />
            <Route path={Path.Logout} element={<Logout />} />
          </Routes>

        </div>
      </AuthProvider>
    </>
  )
}

export default App

import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/authContext';
import Path from './paths';

import Header from './components/header/Header';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Logout from './components/logout/Logout';
import Home from "./components/home/Home";
import GameList from './components/game-list/GameList';
import GameCreate from './components/game-create/GameCreate';
// import GameDetails from './components/game-details/GameDetails';
import GameEdit from './components/game-edit/GameEdit';
import ErrorBoundary from './components/ErrorBoundary';
import AuthGuard from './components/guards/AuthGuard';
import BaseAuthGuard from './components/guards/BaseAuthGuard';

const GameDetails = lazy(() => import('./components/game-details/GameDetails'));

function App() {


  return (
    <>
      <ErrorBoundary>
        <AuthProvider>
          <div id="box">
            <Header />
            <Suspense fallback={<h1>Loading...</h1>}>
              <Routes>
                <Route path={Path.Home} element={<Home />} />
                <Route path='/games' element={<GameList />} />
                {/* <Route path='/game-create' element={<BaseAuthGuard><GameCreate /></BaseAuthGuard>} /> */}
                <Route path={Path.Login} element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path={Path.GameDetails} element={<GameDetails />} />


                <Route element={<AuthGuard />}>
                  <Route path='/game-create' element={<GameCreate />} />
                  <Route path={Path.GameEdit} element={<GameEdit />} />
                  <Route path={Path.Logout} element={<Logout />} />
                </Route>
              </Routes>
            </Suspense>

          </div>
        </AuthProvider>
      </ErrorBoundary>
    </>
  )
}

export default App

import MovieList from './components/MovieList'
import movies from './assets/movies'
import Timer from './components/Timer'
import Counter from './components/Counter'
import './App.css'



function App() {

    return (
        <div>
            <h1>My first dynamic react app</h1>

            <Counter />

            <Timer startTime={5} />
            <Timer startTime={6} />
            <Timer startTime={7} />
            <MovieList movies={movies} headingText={'Films'}/>
        </div>
    )
}

export default App

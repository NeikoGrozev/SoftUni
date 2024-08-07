import Movie from "./Movie";
import Heading from "./Heading";

export default function MovieList(props) {
    return (
        <div className="movie-list">
            <Heading>Some text</Heading>
            <ul>
                <Movie data={props.movies[0]} />
                <Movie data={props.movies[1]} />
                <Movie data={props.movies[2]} />
            </ul>
        </div>
    );
}
import { useEffect, useState } from "react"

export default function Starwars(props) {
    const [characters, setCharacters] = useState([]);
    console.log(characters);

    useEffect(() => {
        fetch(`https://swapi.dev/api/people`)
            .then((response) => response.json())
            .then((data) => setCharacters(data.results))
            .catch((err) => console.log(err));
    }, []);

    return (
        <>
            <h1>Star wars characters</h1>
            <ul>
                {characters.map((character) => <li key={character.url}>{character.name}</li>)}
            </ul>
        </>
    )
}
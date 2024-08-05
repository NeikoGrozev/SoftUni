import { useEffect, useState } from "react";
import CharactersListItem from "./CharactersListItem";
import styles from "./CharactersList.module.css";

const baseUrl = 'https://swapi.dev/api/';

export default function CharactersList() {
    const [characters, setCharacters] = useState([]);
    const abortController = new AbortController();

    useEffect(() => {
        fetch(`${baseUrl}people`)
            .then(res => res.json())
            .then(data => setCharacters(data.results));

        return () => {
            abortController.abort();
        }
    }, []);

    return (
        <div className={styles.charactersList}>
            {characters.map((character, index) =>
                <CharactersListItem key={character.name} id={index + 1} {...character} />
            )}
        </div>
    );
}
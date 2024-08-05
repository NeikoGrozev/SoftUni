import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function CharacterDetails() {
    const baseUrl = 'https://swapi.dev/api/';
    const { id } = useParams();
    const [character, setCharacter] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${baseUrl}people/${id}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Not Found');
                }

                return res.json();
            })
            .then(data => setCharacter(data))
            .catch(err => {
                navigate('/characters');
            });
    }, [id]);

    return (
        <>
            <h1>{character.name}</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi ipsa hic id laudantium ducimus,
                placeat atque quas commodi necessitatibus nihil
                facere voluptate eius modi explicabo iste eos perspiciatis voluptates accusamus!</p>
        </>
    );
}
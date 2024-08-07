import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import * as gameService from '../../services/gameService';
import useForm from "../../hooks/useForm";

export default function GameEdit() {
    const navigate = useNavigate();
    const { gameId } = useParams();
    const [game, setGame] = useState({
        title: '',
        category: '',
        maxLevel: '',
        imageUrl: '',
        summary: ''
    });

    useEffect(() => {
        gameService.getOne(gameId)
            .then(result => {
                setGame(result);
            });
    }, [gameId]);


    const editGameSubmitHandler = async (e) => {
        e.preventDefault();

        const values = Object.fromEntries(new FormData(e.currentTarget));

        try {
            await gameService.edit(gameId, values);

            navigate('/games');
        } catch (err) {
            // Error notification
            console.log(err);
        }
    };

    const onChange = (e) => {
        setGame(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <>
            {/* <!-- Edit Page ( Only for the creator )--> */}
            <section id="edit-page" className="auth">
                <form id="edit" onSubmit={editGameSubmitHandler}>
                    <div className="container">

                        <h1>Edit Game</h1>
                        <label htmlFor="leg-title">Legendary title:</label>
                        <input type="text" id="title" name="title" value={game.title} onChange={onChange} />

                        <label htmlFor="category">Category:</label>
                        <input type="text" id="category" name="category" value={game.category} onChange={onChange} />

                        <label htmlFor="levels">MaxLevel:</label>
                        <input type="number" id="maxLevel" name="maxLevel" min="1" value={game.maxLevel} onChange={onChange} />

                        <label htmlFor="game-img">Image:</label>
                        <input type="text" id="imageUrl" name="imageUrl" value={game.imageUrl} onChange={onChange} />

                        <label htmlFor="summary">Summary:</label>
                        <textarea name="summary" id="summary" value={game.summary} onChange={onChange}></textarea>
                        <input className="btn submit" type="submit" value="Edit Game" />

                    </div>
                </form>
            </section>
        </>
    );
}
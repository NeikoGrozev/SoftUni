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

    const editGameSubmitHandler = async (values) => {
        try {
            const result = await gameService.edit(gameId, values);
            navigate('/games');
        } catch (error) {
            //Error notification
            console.log(error);
        }
    };

    // const { formValues, onChange, onSubmit } = useForm(editGameSubmitHandler, {
    //     title: '',
    //     category: '',
    //     maxLevel: '',
    //     imageUrl: '',
    //     summary: ''
    // });
    const { formValues, onChange, onSubmit } = useForm(editGameSubmitHandler, game);

    return (
        <>
            {/* <!-- Edit Page ( Only for the creator )--> */}
            <section id="edit-page" className="auth">
                <form id="edit" onSubmit={onSubmit}>
                    <div className="container">

                        <h1>Edit Game</h1>
                        <label htmlFor="leg-title">Legendary title:</label>
                        <input type="text" id="title" name="title" value={formValues.title} onChange={onChange} />

                        <label htmlFor="category">Category:</label>
                        <input type="text" id="category" name="category" value={formValues.category} onChange={onChange} />

                        <label htmlFor="levels">MaxLevel:</label>
                        <input type="number" id="maxLevel" name="maxLevel" min="1" value={formValues.maxLevel} onChange={onChange} />

                        <label htmlFor="game-img">Image:</label>
                        <input type="text" id="imageUrl" name="imageUrl" value={formValues.imageUrl} onChange={onChange} />

                        <label htmlFor="summary">Summary:</label>
                        <textarea name="summary" id="summary" value={formValues.summary} onChange={onChange}></textarea>
                        <input className="btn submit" type="submit" value="Edit Game" />

                    </div>
                </form>
            </section>
        </>
    );
}
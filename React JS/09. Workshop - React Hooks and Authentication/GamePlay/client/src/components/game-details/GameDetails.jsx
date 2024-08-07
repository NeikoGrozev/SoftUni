import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import AuthContext from "../context/authContext";

import useForm from "../../hooks/useForm";

import * as gameService from '../../services/gameService';
import * as commentService from '../../services/commentService';

import Comment from "../comment/Comment";

const CommentFormKeys = {
    Comment: 'comment'
};

export default function GameDetails() {
    const { username } = useContext(AuthContext);
    const { gameId } = useParams();
    const [game, setGame] = useState({});
    const [comments, setComments] = useState({});

    useEffect(() => {
        gameService.getOne(gameId)
            .then(result => setGame(result));

        commentService.getById(gameId)
            .then(result => setComments(result));
    }, [gameId]);

    const addCommentHandler = async () => {
        const newComment = await commentService.create(
            gameId,
            formValues.comment
        );

        setComments(state => [...state, { ...newComment, owner: { username } }]);
        console.log(comments);
    };

    const { formValues, onChange, onSubmit } = useForm(addCommentHandler, {
        [CommentFormKeys.Comment]: '',
    });

    return (
        <>
            {/* <!--Details Page--> */}
            <section id="game-details">
                <h1>Game Details</h1>
                <div className="info-section">

                    <div className="game-header">
                        <img className="game-img" src={game.imageUrl} alt={game.title} />
                        <h1>{game.title}</h1>
                        <span className="levels">MaxLevel: {game.maxLevel}</span>
                        <p className="type">{game.category}</p>
                    </div>

                    <p className="text">{game.summary}</p>

                    {/* <!-- Bonus ( for Guests and Users ) --> */}
                    <div className="details-comments">
                        <h2>Comments:</h2>
                        <ul>
                            {/* <!-- list all comments for current game (If any) --> */}
                            {(comments.length > 0) && comments.map(comment => <Comment key={comment._id} {...comment} />)}
                            {/* <li className="comment">
                                <p>Content: I rate this one quite highly.</p>
                            </li>
                            <li className="comment">
                                <p>Content: The best game.</p>
                            </li> */}
                        </ul>
                        {/* <!-- Display paragraph: If there are no games in the database --> */}
                        {(comments.length === 0) && <p className="no-comment">No comments.</p>}
                    </div>

                    {/* <!-- Edit/Delete buttons ( Only for creator of this game )  --> */}
                    <div className="buttons">
                        <a href="#" className="button">Edit</a>
                        <a href="#" className="button">Delete</a>
                    </div>
                </div>

                {/* <!-- Bonus --> */}
                {/* <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) --> */}
                <article className="create-comment">
                    <label>Add new comment:</label>
                    <form className="form" onSubmit={onSubmit}>
                        <textarea name={CommentFormKeys.Comment} value={formValues.comment} onChange={onChange} placeholder="Comment......"></textarea>
                        <input className="btn submit" type="submit" value="Add Comment" />
                    </form>
                </article>

            </section>
        </>
    );
}
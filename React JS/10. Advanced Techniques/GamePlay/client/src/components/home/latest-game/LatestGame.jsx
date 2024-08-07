import { Link } from "react-router-dom";
import Path from "../../../paths";
import { pathToUrl } from "../../../utils/pathUtils";

export default function LatestGame({
    imageUrl,
    title,
    _id
}) {
    return (
        <>
            {/* <!-- Display div: with information about every game (if any) --> */}
            <div className="game">
                <div className="image-wrap">
                    <img src={imageUrl} />
                </div>
                <h3>{title}</h3>
                <div className="rating">
                    <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
                </div>
                <div className="data-buttons">
                    <Link to={pathToUrl(Path.GameDetails, { gameId: _id })} className="btn details-btn">Details</Link>
                </div>
            </div >
            {/* <div className="game">
                <div className="image-wrap">
                    <img src="./images/ZombieLang.png" />
                </div>
                <h3>Zombie Lang</h3>
                <div className="rating">
                    <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
                </div>
                <div className="data-buttons">
                    <a href="#" className="btn details-btn">Details</a>
                </div>
            </div>
            <div className="game">
                <div className="image-wrap">
                    <img src="./images/MineCraft.png" />
                </div>
                <h3>MineCraft</h3>
                <div className="rating">
                    <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
                </div>
                <div className="data-buttons">
                    <a href="#" className="btn details-btn">Details</a>
                </div>
            </div> */}
        </>
    );
}
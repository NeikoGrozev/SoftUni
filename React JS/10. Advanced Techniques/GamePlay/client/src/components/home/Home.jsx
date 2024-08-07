import { useEffect, useState } from "react";
import withAuth from "../../HOC/withAuth";
import * as gameServices from '../../services/gameService';
import LatestGame from "./latest-game/LatestGame";

function Home() {
    const [latestGames, setLatestGames] = useState([]);

    useEffect(() => {
        gameServices.getLatest()
            .then(result => setLatestGames(result));
    }, []);

    return (
        <>
            {/* <!--Home Page--> */}
            <section id="welcome-world">

                <div className="welcome-message">
                    <h2>ALL new games are</h2>
                    <h3>Only in GamesPlay</h3>
                </div>
                <img src="./images/four_slider_img01.png" alt="hero" />

                <div id="home-page">
                    <h1>Latest Games</h1>
                    {latestGames.length && latestGames.map(game => <LatestGame key={game._id} {...game} />)}

                    {!latestGames.length && <p className="no-articles">No games yet</p>}
                </div>
            </section>
        </>
    );
}

export default withAuth(Home);
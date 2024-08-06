export default function Comment({
    _id,
    text,
    owner: {username}
}) {
    return (
        <>
            <li className="comment">
                <p>{username}: {text}</p>
            </li>
        </>
    );
}
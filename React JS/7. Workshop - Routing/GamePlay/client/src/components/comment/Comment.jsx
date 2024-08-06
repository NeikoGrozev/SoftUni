export default function Comment({
    text
}) {
    return (
        <>
            <li className="comment">
                <p>{text}</p>
            </li>
        </>
    );
}
import { useEffect } from "react";

export default function Contacts() {
useEffect(() => {
    console.log('Mount or update');

    return () => {
        console.log('On unmount');
    }
}, []);

    return (
        <>
            <h2>Contacts page</h2>
            <br />
            <label htmlFor="title">Title</label>
            <br />
            <input type="text" />
            <br />
            <br />
            <label htmlFor="description">Description</label>
            <br />
            <textarea name="" id="" cols="30" rows="10"></textarea>
            <br />
            <input type="submit" />
        </>
    );
}
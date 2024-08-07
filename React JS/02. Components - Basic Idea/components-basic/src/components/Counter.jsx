import { useState } from "react";

export default function Counter(props) {
    const [count, setCount] = useState(0);

    const incrementClickHandler = () => {
        // setCount(count + 1);
        setCount(c => c + 1);
    }

    const clearCounterHandler = () => {
        setCount(0);
    }

    // if (count < 0) {
    //     return (
    //         <p>Invalid count!</p>
    //     );
    // }

    let warning = null;

    if (count < 0) {
        warning = <p>Invalid count!</p>
    }

    return (
        <div>
            <h3>Counter</h3>
            {warning}

            {count < 0 ? <p>Invalid count!</p> : null}
            {count == 0 && <p>Start increment</p>}
            <p>Count: {count}</p>

            <button onClick={incrementClickHandler}>+</button>
            <button onClick={clearCounterHandler}>clear</button>
            <button onClick={() => setCount(count - 1)} disabled={count < 0}>-</button>
        </div>
    );
}
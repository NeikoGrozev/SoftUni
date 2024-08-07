import { useState } from "react";

export default function usePersistedState(key, defaultValue) {
    const [state, setState] = useState(() => {
        const persistedState = localStorage.getItem(key);

        if (persistedState) {
            return JSON.parse(persistedState);
        }

        return defaultValue;
    });

    const setPersistedState = (value) => {
        let resultState = value;
        setState(value);

        if(typeof value === 'function'){
            resultState = value(state);
        }

        const serializedValue = JSON.stringify(resultState);
        localStorage.setItem(key, serializedValue);
    };

    return [
        state,
        setPersistedState
    ];
}
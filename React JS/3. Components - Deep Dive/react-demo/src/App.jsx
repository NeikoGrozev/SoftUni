import { useEffect, useState } from 'react';
import Starwars from './Starwars';
import style from './App.module.css';

function App() {
  const [numbers, setNumbers] = useState([1, 2, 3, 4, 5]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Mount component');
  }, []);

  useEffect(() => {
    console.log(`Update component - ${numbers.length}`);
  }, [numbers]);

  const onClick = () => {
    setNumbers(oldState => oldState.slice(0, oldState.length - 1));
  }

  return (
    <>
      <Starwars />
      
      <h3>Count: {count}</h3>
      <ul>
        {numbers.map((number, index) =>
          <li data-key={index} key={index} className={style.listItem}>
            {number * 2}
          </li>
        )}
      </ul>

      <button style={{ marginRight: '10px' }} onClick={onClick}>Remove</button>
      <button onClick={() => setCount(c => c + 1)}>Count</button>
    </>
  )
}

export default App

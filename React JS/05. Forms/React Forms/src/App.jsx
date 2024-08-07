
import './App.css';
import UncontrolledForm from './components/UncontrolledForm';
import ControlledFormRaw from './components/ControlledFormRaw';
import ControlledForm from './components/ControlledForm';
import { useRef } from 'react';

function App() {
  const formRef = useRef({});

  return (
    <>
      <UncontrolledForm />
      <ControlledForm  formRef={formRef}/>
      <button type='button' onClick={() => formRef.current.requestSubmit()}>Submit</button>      
      <ControlledFormRaw />

    </>
  )
}

export default App

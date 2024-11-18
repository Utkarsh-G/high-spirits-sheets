import './App.css';
import AllActionsBox from './AllActionsBox';
import { useState, useReducer } from 'react';
import { ActionsContextProvider } from './ActionsContextProvider';

function App() {
  const [actions, setActions] = useState({
    'Melee Attack': 0,
    'Ranged Attack': 0,
  });

  const handleRoll = (rolledName) => {
    const newRolls = Object.keys(actions).reduce((acc, name) => ({
      ...acc,
      [name]: name === rolledName ? Math.floor(Math.random() * 20) + 1 : 0
    }), {});
    setActions(newRolls);
  };

  return (
    <div className="App">
      {/* {Object.keys(actions).map(name => (
        <ActionBox 
          key={name}
          name={name} 
          rollResult={actions[name]}
          onRoll={() => handleRoll(name)}
        />
      ))} */}
      <ActionsContextProvider>
        <AllActionsBox actions={actions} handleRoll={handleRoll} />\
      </ActionsContextProvider>
      
    </div>
  );
}

export default App;
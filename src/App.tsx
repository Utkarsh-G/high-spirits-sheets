import React from 'react';
import './App.css';
import AllActionsBox from './AllActionsBox';
import { ActionsContextProvider } from './ActionsContextProvider';

function App() {

  return (
    <div className="App">
      <ActionsContextProvider>
        <AllActionsBox />
      </ActionsContextProvider>
      
    </div>
  );
}

export default App;
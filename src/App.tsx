import React from 'react';
import './App.css';
import AllActionsBox from './AllActionsBox';
import { ActionsContextProvider } from './ActionsContextProvider';
import TopInfo from './TopInfo';

function App() {

  return (
    <div className="App">
      <ActionsContextProvider>
        <TopInfo />
        <AllActionsBox />
      </ActionsContextProvider>
    </div>
  );
}

export default App;
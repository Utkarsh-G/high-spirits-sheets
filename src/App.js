// import logo from './logo.svg';
import './App.css';
import ActionBox from './ActionBox';
function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header> */}
      <ActionBox name="Melee Attack" />
      <ActionBox name="Ranged Attack" />
      <ActionBox name="Attack" />
    </div>
  );
}

export default App;

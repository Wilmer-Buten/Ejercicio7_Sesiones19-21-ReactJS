import logo from './logo.svg';
import './App.css';
import JokesComponent from './components/JokesComponent';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          <JokesComponent></JokesComponent>
      </header>
    </div>
  );
}

export default App;

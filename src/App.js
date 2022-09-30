import logo from './logo.svg';
import './App.css';
import { Login } from './auth/components/Login';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          SAI.V3
        </p>
        <Login />
      </header>
    </div>
  );
}

export default App;

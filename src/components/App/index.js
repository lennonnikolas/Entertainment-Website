import React, { Component } from 'react';
import Main from '../Main';
import { Link } from 'react-router-dom'
import './App.css';
import 'whatwg-fetch';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">TV Series/Games List</h1>
          <ul className="nav-links">
            <li className="nav-links"><Link to={'/'}>Home</Link></li>
            <li className="nav-links"><Link to={'/movies'}>Movies</Link></li>
            <li className="nav-links"><Link to={'/tvseries'}>TV Series</Link></li>
            <li className="nav-links"><Link to={'/games'}>Games</Link></li>
          </ul>
        </header>
          <Main />
          <div>
            <footer className="App-footer">
              Test
            </footer>
          </div>
        </div>
    );
  }
}

export default App;

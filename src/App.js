import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import "./App.css";
import MoviesComponet from './components/MovieComponent';
import ActorsComponent from './components/Actors';
import ProducerComponet from './components/Producer';
import HomePage from './components/HomePage';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            {/* <li>
              <Link to="/">Home</Link>
            </li> */}
            <li>
              <Link to="/">Movies</Link>
            </li>
            <li>
              <Link to="/actors">Actor List</Link>
            </li>
            <li>
              <Link to="/producers">Producer List</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          {/* <Route exact path="/" element={<HomePage />} /> */}
          <Route path="/" element={<MoviesComponet />} />
          <Route path="/actors" element={<ActorsComponent />} />
          <Route path="/producers" element={<ProducerComponet />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

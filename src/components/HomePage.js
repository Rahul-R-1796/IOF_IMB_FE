
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Welcome to the Homepage</h1>
      <Link to="/">
        <button>Movies</button>
      </Link>
      <Link to="/actors">
        <button>Actor List</button>
      </Link>
      <Link to="/producers">
        <button>Producer List</button>
      </Link>
    </div>
  );
}
export default Home;

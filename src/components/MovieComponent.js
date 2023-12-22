// Movies.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./MovieComponent.css";
import MovieForm from './MoviesForm'; 
import ProducerForm from './ProducerForm';
import ActorForm from './ActorForm'

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showProducerModal, setProducerShowModal] = useState(false);
  const [showActorsModal, setActorsShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get('https://movie-imb-api.onrender.com/movies/');
      setMovies(response.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const toggleModal = (movie = null) => {
    setSelectedMovie(movie);
    setShowModal(!showModal);
  };

  const handleClose = () => {
    setSelectedMovie(null);
    setShowModal(false);
  };

  const deleteMovie = async (id) => {
    try {
      await axios.delete(`https://movie-imb-api.onrender.com/movies/${id}`);
      fetchMovies();
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  const editMovie = async (updatedMovie) => {
    try {
      await axios.put(`https://movie-imb-api.onrender.com/movies/${updatedMovie._id}`, updatedMovie);
      fetchMovies();
      handleClose();
    } catch (error) {
      console.error('Error editing movie:', error);
    }
  };

  const fetchActors = async () => {
    try {
      const response = await axios.get('https://movie-imb-api.onrender.com/actors/');
      setActors(response.data);
    } catch (error) {
      console.error('Error fetching actors:', error);
    }
  };

  const fetchProducer  = async () => {
    try {
      const response = await axios.get('https://movie-imb-api.onrender.com/producer/'); // Endpoint for fetching producers
      setProducers(response.data);
    } catch (error) {
      console.error('Error fetching producer:', error);
    }
  };

  const toggleActorsModal = () => {
    handleProducerClose()
    setActorsShowModal(!showActorsModal);
   
  };

  const handleActorsClose = () => {
    setActorsShowModal(false);
  };

  const toggleProducerModal = () => {
    handleActorsClose()
    setProducerShowModal(!showActorsModal);
 
  };

  const handleProducerClose = () => {
    setProducerShowModal(false);
  };



  return (
    <div>
            <div className="container">
             <span> <button onClick={toggleActorsModal}>Add New Actor</button>
              {showActorsModal && (
                <ActorForm handleClose={handleActorsClose} fetchActors={fetchActors} />
              )}
              
              <button onClick={toggleProducerModal}>Add New Producer</button>
              {showProducerModal && (
                <ProducerForm handleClose={handleProducerClose} fetchProducer={fetchProducer} />
              )}</span>
              </div>

      <h1>Movies List</h1>
      <button onClick={() => toggleModal()}>Add New Movie</button>

      {showModal && (
        <MovieForm
          handleClose={handleClose}
          fetchMovies={fetchMovies}
          selectedMovie={selectedMovie}
          editMovie={editMovie}
        />
      )}

<ul className="movie-list">
  {movies.map((movie) => (
    <li className="movie-item" key={movie._id}>
      <div className="movie-details">
        <div className="movie-name">{movie.name}</div>
        <div className="movie-year">({movie.yearOfRelease})</div>
        {movie.poster && (
          <img className="movie-poster" src={movie.poster} alt={`${movie.name} Poster`} />
        )}
        <div className="movie-plot">{movie.plot}</div>
        <div>
          <button onClick={() => toggleModal(movie)}>Edit</button>
          <button onClick={() => deleteMovie(movie._id)}>Delete</button>
        </div>
      </div>
    </li>
  ))}
</ul>

    </div>
  );
};

export default Movies;

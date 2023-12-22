// MovieForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./MoviesForm.css"

const MovieForm = ({ handleClose, fetchMovies, selectedMovie, editMovie }) => {
  const [formData, setFormData] = useState({
    name: '',
    yearOfRelease: '',
    plot: '',
    poster: '',
    producer: '',
    actors: [],
  });

  const [producers, setProducers] = useState([]);
  const [allActors, setAllActors] = useState([]);

  useEffect(() => {
    // Fetching producers and actors
    const fetchData = async () => {
      try {
        const producersResponse = await axios.get('https://movie-imb-api.onrender.com/producer/');
        setProducers(producersResponse.data);

        const actorsResponse = await axios.get('https://movie-imb-api.onrender.com/actors/');
        setAllActors(actorsResponse.data);

        if (selectedMovie) {
          setFormData({
            name: selectedMovie.name || '',
            yearOfRelease: selectedMovie.yearOfRelease || '',
            plot: selectedMovie.plot || '',
            poster: selectedMovie.poster || '',
            producer: selectedMovie.producer || '',
            actors: selectedMovie.actors || [],
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedMovie]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedMovie) {
        await editMovie({
          _id: selectedMovie._id,
          ...formData,
        });
      } else {
        await axios.post('https://movie-imb-api.onrender.com/movies/', formData);
      }
      setFormData({
        name: '',
        yearOfRelease: '',
        plot: '',
        poster: '',
        producer: '',
        actors: [],
      });
      fetchMovies();
      handleClose();
    } catch (error) {
    alert ("Actor or Producer not exist" )
      console.error('Error creating/editing movie:', error);
    }
  };

  const handleActorSelection = (actorId) => {
    const actorIndex = formData.actors.indexOf(actorId);
    let updatedActors = [...formData.actors];

    if (actorIndex === -1) {
      updatedActors.push(actorId);
    } else {
      updatedActors.splice(actorIndex, 1);
    }

    setFormData({ ...formData, actors: updatedActors });
  };

  return (
    <div className="modal">
      <div className="modal-content">
      <div className="container">
        <span className="close" onClick={handleClose}>&times;</span>
        <h2>{selectedMovie ? 'Edit Movie' : 'Add New Movie'}</h2>
        <form onSubmit={handleSubmit}>
        <input
  type="text"
  placeholder="Name"
  name="name"
  value={formData.name}
  onChange={handleInputChange}
/>
<input
  type="number"
  placeholder="Year of Release"
  name="yearOfRelease"
  value={formData.yearOfRelease}
  onChange={handleInputChange}
/>
<input
  type="text"
  placeholder="Plot"
  name="plot"
  value={formData.plot}
  onChange={handleInputChange}
/>
<input
  type="text"
  placeholder="Poster URL"
  name="poster"
  value={formData.poster}
  onChange={handleInputChange}
/>

{/* Producer dropdown */}
<select
  name="producer"
  value={formData.producer}
  onChange={handleInputChange}
>
  <option value="">Select Producer</option>
  {producers.map((producer) => (
    <option key={producer._id} value={producer._id}>
      {producer.name}
    </option>
  ))}
</select>

{/* Actors dropdown (multi-select using ctrl/cmd) */}
{/* Actors dropdown (multi-select using ctrl/cmd) */}
<div >
  <p>Select Actors:</p>
  {allActors.map((actor) => (
    <div className="CheckBox"key={actor._id}>
      <input
        type="checkbox"
        id={actor._id}
        value={actor._id}
        checked={formData.actors.includes(actor._id)}
        onChange={() => handleActorSelection(actor._id)}
      />
      <label className='Actor_Check' htmlFor={actor._id}>{actor.name}</label>
    </div>
  ))}
</div>

          <button type="submit">{selectedMovie ? 'Update Movie' : 'Add Movie'}</button>
        </form>
      </div></div>
    </div>
  );
};

export default MovieForm;





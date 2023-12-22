import React, { useState } from 'react';
import axios from 'axios';

const ProducerForm = ({ handleClose,fetchProducers }) => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    dob: '',
    bio: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://movie-imb-api.onrender.com/producer/', formData); // Assuming the endpoint for producers is different
      setFormData({ name: '', gender: '', dob: '', bio: '' });
      fetchProducers();   // Refresh producers after adding a new one
      handleClose(); // Close the modal after submitting
    } catch (error) {
      console.error('Error creating producer:', error);
    }
  };
  
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={handleClose}>&times;</span>
        <h2>Add New Producer</h2>
        <form onSubmit={handleSubmit}>
    
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Date of Birth"
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Bio"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
          />
          <button type="submit">Add Producer</button>
        
        </form>
      </div>
    </div>
  );
};

export default ProducerForm;

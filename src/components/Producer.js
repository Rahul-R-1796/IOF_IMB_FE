import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Producer.css"

const ProducerComponent = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    dob: '',
    bio: '',
  });

  // Fetch data from the API
  useEffect(() => {
    axios.get('https://movie-imb-api.onrender.com/producer')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle form submission for creating/updating data
  const handleSubmit = (e) => {
    e.preventDefault();

    // If _id is present in formData, update data, else create new data
    if (formData._id) {
      axios.put(`https://movie-imb-api.onrender.com/producer/${formData._id}`, formData)
        .then(response => {
          setData([...data.filter(item => item._id !== formData._id), formData]);
          setFormData({
            name: '',
            gender: '',
            dob: '',
            bio: '',
          });
        })
        .catch(error => {
          console.error('Error updating data: ', error);
        });
    } else {
      axios.post('https://movie-imb-api.onrender.com/producer', formData)
        .then(response => {
          setData([...data, response.data]);
          setFormData({
            name: '',
            gender: '',
            dob: '',
            bio: '',
          });
        })
        .catch(error => {
          console.error('Error creating data: ', error);
        });
    }
  };

  // Function to delete data
  const handleDelete = (id) => {
    axios.delete(`https://movie-imb-api.onrender.com/producer/${id}`)
      .then(response => {
        setData(data.filter(item => item._id !== id));
      })
      .catch(error => {
        console.error('Error deleting data: ', error);
      });
  };

  // Function to edit data
  const handleEdit = (item) => {
    setFormData(item);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };


  return (
    
      <div>
        <div className="container">
      <h2>Producer Form</h2>
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
        <button type="submit">Submit</button>
      </form></div>
      <h2>Producer List</h2>
      <ul className="producer-list">
        {data.map(item => (
          <li className="producer-item" key={item._id}>
            <div className="producer-name">{item.name} ({item.gender})</div>
            <div className="producer-details">
              <div></div>
              <div>{formatDate(item.dob)}</div>
            </div>
            <div className="producer-bio">{item.bio}</div>
            <div className="producer-actions">
              <button onClick={() => handleEdit(item)}>Edit</button>
              <button onClick={() => handleDelete(item._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};



export default ProducerComponent;

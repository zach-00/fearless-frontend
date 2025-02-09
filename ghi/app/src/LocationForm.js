import React, { useEffect, useState } from 'react';

function LocationForm() {

    const [ states, setStates ] = useState([]);

    const [ name, setName ] = useState('');

    const [ roomCount, setRoomCount ] = useState('');

    const [ city, setCity ] = useState('');

    const [ state, setState ] = useState('Choose a state');

    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    }

    const handleRoomCountChange = (event) => {
        const value = event.target.value;
        setRoomCount(value);
    }

    const handleCityChange = (event) => {
        setCity(event.target.value); // shorthand way to do the same thing as the above handleChange functions
    }

    const handleStateChange = (event) => {
        const value = event.target.value;
        setState(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.room_count = roomCount;
        data.name = name;
        data.city = city;
        data.state = state;
        console.log(data);

        const locationUrl = 'http://localhost:8000/api/locations/';
        const fetchConfig = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        };
        const response = await fetch(locationUrl, fetchConfig);
        if (response.ok) {
            const newLocation = await response.json();
            console.log(newLocation);

            setName('');
            setRoomCount('');
            setCity('');
            setState('');

        }

    }


    const fetchData = async () => {
    const url = 'http://localhost:8000/api/states/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setStates(data.states);
        }
    }

    useEffect (() => {
        fetchData();
    }, []);


    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new location</h1>
            <form onSubmit={handleSubmit} id="create-location-form">
              <div className="form-floating mb-3">
                <input onChange={handleNameChange} placeholder="Name" required type="text" name="name" id="name" value={name} className="form-control"></input>
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleRoomCountChange} placeholder="Room count" required type="number" name="room_count" id="room_count" value={roomCount} className="form-control"></input>
                <label htmlFor="room_count">Room count</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleCityChange} placeholder="City" required type="text" name="city" id="city" value={city} className="form-control"></input>
                <label htmlFor="city">City</label>
              </div>
              <div className="mb-3">
                <select onChange={handleStateChange} required name="state" id="state" value={state} className="form-select">
                  <option value="">Choose a state</option>
                  {states.map(state =>{
                    return (
                        <option key={state.abbreviation} value={state.abbreviation}>
                            {state.name}
                        </option>
                    );
                  })}
                </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
}

export default LocationForm;

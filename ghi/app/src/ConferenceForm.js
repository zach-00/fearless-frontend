import React, { useEffect, useState } from "react";

function ConferenceForm() {

    const [ name, setName ] = useState('');

    const [ starts, setStarts ] = useState('');

    const [ ends, setEnds ] = useState('');

    const [ description, setDescription ] = useState('');

    const [ maxPresentations, setMaxPresentations ] = useState('');

    const [ maxAttendees, setMaxAttendees ] = useState('');

    const [ locations, setLocations ] = useState([]);

    const [ location, setLocation ] = useState('Choose a location');

    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    }

    const handleStartsDateChange = (event) => {
        const value = event.target.value;
        setStarts(value);
    }

    const handleEndsDateChange = (event) => {
        const value = event.target.value;
        setEnds(value);
    }

    const handleDescriptionChange = (event) => {
        const value = event.target.value;
        setDescription(value);
    }

    const handleMaxPresentationChange = (event) => {
        const value = event.target.value;
        setMaxPresentations(value);
    }

    const handleMaxAttendeesChange = (event) => {
        setMaxAttendees(event.target.value);
    }

    const handleLocationChange = (event) => {
        const value = event.target.value;
        setLocation(value);
    }


    const handleSubmit = async (event) => {
      event.preventDefault();

      const data = {};

      data.name = name;
      data.starts = starts;
      data.ends = ends;
      data.description = description;
      data.max_attendees = maxAttendees;
      data.max_presentations = maxPresentations;
      data.location = location;

      console.log(data);

      const url = 'http://localhost:8000/api/conferences/';

      const fetchOptions = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        }
      };

      const response = await fetch(url, fetchOptions);
      if (response.ok) {
        const newConference = await response.json();
        console.log(newConference);

        setName('');
        setStarts('');
        setEnds('');
        setDescription('');
        setMaxPresentations('');
        setMaxAttendees('');
        setLocation('');
      }

    }


    const fetchData = async () => {
        const url = 'http://localhost:8000/api/locations/';

            const response = await fetch(url);

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setLocations(data.locations);
            }
        }

        useEffect (() => {
            fetchData();
        }, []);

    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new conference</h1>
            <form onSubmit={handleSubmit} id="create-conference-form">
              <div className="form-floating mb-3">
                <input onChange={handleNameChange} placeholder="name" required type="text" name="name" id="name" className="form-control"/>
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleStartsDateChange} placeholder="starts" required type="date" name="starts" id="starts" className="form-control"/>
                <label htmlFor="starts">Starts</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleEndsDateChange} placeholder="ends" required type="date" name="ends" id="ends" className="form-control"/>
                <label htmlFor="ends">Ends</label>
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea onChange={handleDescriptionChange} required name="description" id="description" rows="5" cols="33" className="form-control"></textarea>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleMaxPresentationChange} placeholder="max_presentations" required type="number" name="max_presentations" id="Maximum Presentations" className="form-control"/>
                <label htmlFor="max_presentations">Maximum Presentations</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleMaxAttendeesChange} placeholder="max_attendees" required type="number" name="max_attendees" id="max_attendees" className="form-control"/>
                <label htmlFor="max_attendees">Maximum Attendees</label>
              </div>
              <div className="mb-3">
                <select onChange={handleLocationChange} required name="location" id="location" className="form-select">
                  <option value="">Choose a location</option>
                  {locations.map(location => {
                    return (
                    <option key={location.id} value={location.id}>{location.name}</option>
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

export default ConferenceForm;

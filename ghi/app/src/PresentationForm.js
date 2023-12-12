import { useState, useEffect } from "react";

function PresentationForm() {

    const [ presenterName, setPresenterName ] = useState('');

    const [ presenterEmail, setPresenterEmail ] = useState('');

    const [ companyName, setCompanyName ] = useState('');

    const [ title, setTitle ] = useState('');

    const [ synopsis, setSynopsis ] = useState('');

    const [ conferences, setConferences ] = useState([]);

    const [ conference, setConference ] = useState('');

    const handlePresenterNameChange = (e) => {
        const value = e.target.value;
        setPresenterName(value);
    }

    const handlePresenterEmailChange = (e) => {
        const value = e.target.value;
        setPresenterEmail(value);
    }

    const handleCompanyNameChange = (e) => {
        const value = e.target.value;
        setCompanyName(value);
    }

    const handleTitleChange = (e) => {
        const value = e.target.value;
        setTitle(value);
    }

    const handleSynopsisChange = (e) => {
        const value = e.target.value;
        setSynopsis(value);
    }

    const handleConferenceChange = (e) => {
        const value = e.target.value;
        setConference(value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const id = conference;

        const url = `http://localhost:8000/api/conferences/${id}/presentations/`;

        const data = {};

        data.presenter_name = presenterName;
        data.presenter_email = presenterEmail;
        data.company_name = companyName;
        data.title = title;
        data.synopsis = synopsis;
        data.conference = conference;

        const fetchOptions = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const response = await fetch(url, fetchOptions);
        if (response.ok) {
            const presentation = await response.json();
            console.log(presentation);
            // console.log(conferences);

            setPresenterName('');
            setPresenterEmail('');
            setCompanyName('');
            setTitle('');
            setSynopsis('');
            setConference('');
        }
    }


    const fetchData = async () => {
        const url = 'http://localhost:8000/api/conferences/';

        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            setConferences(data.conferences);
        }
        console.log(conferences);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new presentation</h1>
            <form onSubmit={handleSubmit} id="create-presentation-form">

              <div className="form-floating mb-3">
                <input onChange={handlePresenterNameChange} placeholder="presenter name" required type="text" name="presenter_name" id="presenter_name" className="form-control"/>
                <label htmlFor="name">Presenter name</label>
              </div>

              <div className="form-floating mb-3">
                <input onChange={handlePresenterEmailChange} placeholder="presenter_email" required type="email" name="presenter_email" id="presenter_email" className="form-control"/>
                <label htmlFor="ends">Presenter Email</label>
              </div>

              <div className="form-floating mb-3">
                <input onChange={handleCompanyNameChange} placeholder="company_name" required type="text" name="company_name" id="company_name" className="form-control"/>
                <label htmlFor="starts">Company Name</label>
              </div>

              <div className="form-floating mb-3">
                <input onChange={handleTitleChange} placeholder="title" required type="text" name="title" id="title" className="form-control"/>
                <label htmlFor="title">Title</label>
              </div>

              <div className="mb-3">
                <label htmlFor="synopsis" className="form-label">Synopsis</label>
                <textarea onChange={handleSynopsisChange} required name="synopsis" id="synopsis" rows="5" cols="33" className="form-control"></textarea>
              </div>

              <select onChange={handleConferenceChange} required name="conference" id="conference" value={conference} className="form-select">
                  <option value="">Choose a conference</option>
                  {conferences.map(conference => {
                    return (
                    <option key={conference.href} value={conference.id}>{conference.name}</option>
                    );
                  })}
              </select>

              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
}

export default PresentationForm;

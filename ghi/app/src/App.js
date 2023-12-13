import { useState, useEffect } from 'react';
import Nav from './Nav';
import AttendeesList from './AttendeesList';
import LocationForm from './LocationForm';
import ConferenceForm from './ConferenceForm';
import AttendConferenceForm from './AttendConferenceForm';
import PresentationForm from './PresentationForm';
import MainPage from './MainPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';




function App() {
  const [ attendees, setAttendees ] = useState([]);
  const [ conferences, setConferences ] = useState([]);

  async function getAttendees() {
    const response = await fetch('http://localhost:8001/api/attendees/');
    if (response.ok) {
      const { attendees } = await response.json();
      setAttendees(attendees);
    } else {
      console.error('An error occurred fethcing the data');
    }
}

async function getConferences() {
  const url = 'http://localhost:8000/api/conferences/';

  const response = await fetch(url);
  if (response.ok) {
      const data = await response.json();
      console.log(data);
      setConferences(data.conferences);
  }

}

  useEffect(() => {
    getAttendees();
    getConferences();
  }, []);

  if (attendees === undefined) {
    return null;
  }



  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
      <Routes>

        <Route index element={<MainPage />} />

        <Route path="locations">
          <Route path="new" element={<LocationForm />} ></Route>
        </Route>

        <Route path="conferences">
          <Route path="new" element={<ConferenceForm />} ></Route>
        </Route>

        <Route path="attendees">
          <Route index element={<AttendeesList attendees={attendees}/>}></Route> {/* Adding INDEX is the same as adding path="" (makes it the base for that URL) */}
          <Route path="new"  element={<AttendConferenceForm conferences={conferences} getAttendees={getAttendees}/>}></Route>
        </Route>

        <Route path="presentations">
          <Route path="new" element={<PresentationForm conferences={conferences} />}></Route>
        </Route>

      </Routes>
      {/* <AttendConferenceForm /> */}
      {/* <ConferenceForm /> */}
      {/* <LocationForm /> */}
      {/* <AttendeesList attendees={attendees}/> */}
    </div>
    </BrowserRouter>
  );
}

export default App;

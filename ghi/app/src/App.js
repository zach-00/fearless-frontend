import Nav from './Nav';
import AttendeesList from './AttendeesList';
import LocationForm from './LocationForm';
import ConferenceForm from './ConferenceForm';
import AttendConferenceForm from './AttendConferenceForm';
import PresentationForm from './PresentationForm';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';



function App(props) {
  if (props.attendees === undefined) {
    return null;
  }



  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
      <Routes>
        <Route path="locations">
          <Route path="new" element={<LocationForm />} ></Route>
        </Route>

        <Route path="conferences">
          <Route path="new" element={<ConferenceForm />} ></Route>
        </Route>

        <Route path="attendees">
          <Route path="new"  element={<AttendConferenceForm />}></Route>
          <Route path="" element={<AttendeesList attendees={props.attendees}/>}></Route>
        </Route>

        <Route path="presentations">
          <Route path="new" element={<PresentationForm />}></Route>
        </Route>

      </Routes>
      {/* <AttendConferenceForm /> */}
      {/* <ConferenceForm /> */}
      {/* <LocationForm /> */}
      {/* <AttendeesList attendees={props.attendees}/> */}
    </div>
    </BrowserRouter>
  );
}

export default App;

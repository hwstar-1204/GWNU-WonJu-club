import { Routes,Route } from "react-router-dom";
import CreateEvent from "./CreateEvent";
import EventList from "./EventList";

const EventPage = () => {

return (
    
    <Routes>
        <Route path="/" element={<EventList />} />
       <Route path="/create_event" element={<CreateEvent />} />
    </Routes>
)

}

export default EventPage;


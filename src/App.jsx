import { useState } from 'react';
import axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [guests, setGuests] = useState(['']);
  const [events, setEvents] = useState([]);

  const handleAddGuest = () => setGuests([...guests, '']);
  const handleGuestChange = (index, value) => {
    const newGuests = [...guests];
    newGuests[index] = value;
    setGuests(newGuests);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const rsvpData = { name, guests, events };

    try {
      await axios.post(import.meta.env.VITE_API_URL + '/api/rsvp', rsvpData);
      alert('RSVP submitted!');
    } catch (err) {
      console.error(err);
      alert('Error submitting RSVP.');
    }
  };

  return (
    <div>
      <h1>Wedding RSVP</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <h2>Accompanying Guests</h2>
        {guests.map((guest, index) => (
          <input
            key={index}
            type="text"
            placeholder="Guest Name"
            value={guest}
            onChange={(e) => handleGuestChange(index, e.target.value)}
          />
        ))}
        <button type="button" onClick={handleAddGuest}>Add Guest</button>
        <h2>Events</h2>
        <label>
          <input
            type="checkbox"
            value="Ceremony"
            onChange={(e) => setEvents([...events, e.target.value])}
          />
          Ceremony
        </label>
        <label>
          <input
            type="checkbox"
            value="Reception"
            onChange={(e) => setEvents([...events, e.target.value])}
          />
          Reception
        </label>
        <label>
          <input
            type="checkbox"
            value="Dinner"
            onChange={(e) => setEvents([...events, e.target.value])}
          />
          Dinner
        </label>
        <button type="submit">Submit RSVP</button>
      </form>
    </div>
  );
}

export default App;

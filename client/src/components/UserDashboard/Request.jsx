import { useState } from 'react';
import axios from 'axios';

const Request = () => {
  const [weight, setWeight] = useState('');
  const [type, setType] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [location, setLocation] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/user/scraprequest/schedule', {
        scrapDetails: [{ weight, type }],
        pickupDate,
        location,
      });
      setResponseMessage(response.data.message);
    } catch (error) {
      setResponseMessage(error.response?.data?.message || 'Error creating schedule');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gradient-to-br from-indigo-100 to-purple-50 p-10 rounded-2xl shadow-2xl mt-10 transform transition-all hover:shadow-lg hover:scale-105">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Schedule Pickup</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Weight (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter weight"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all placeholder-gray-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Type of Scrap</label>
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="Enter type (e.g., Metal, Plastic)"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all placeholder-gray-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Pickup Date</label>
          <input
            type="date"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter your location"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all placeholder-gray-400"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-lg shadow-md hover:from-purple-500 hover:to-indigo-500 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
        >
          Submit
        </button>
      </form>

      {responseMessage && (
        <p className={`mt-6 text-center text-lg ${responseMessage.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
          {responseMessage}
        </p>
      )}
    </div>
  );
};

export default Request;

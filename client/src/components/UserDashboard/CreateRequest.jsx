import React, { useState } from 'react';
import { useRequest } from '../../context/RequestProvider';

const CreateRequest = () => {
  const { createRequest, error } = useRequest();
  const [scrapDetails, setScrapDetails] = useState([{ weight: '', type: '' }]);
  const [pickupDate, setPickupDate] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleScrapDetailsChange = (index, field, value) => {
    const updatedScrapDetails = [...scrapDetails];
    updatedScrapDetails[index][field] = value;
    setScrapDetails(updatedScrapDetails);
  };

  const addScrapDetail = () => {
    setScrapDetails([...scrapDetails, { weight: '', type: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('pickupDate', pickupDate);
    formData.append('location', location);
    formData.append('image', image);  // Changed to 'image' for multer compatibility
    formData.append('scrapDetails', JSON.stringify(scrapDetails));

    try {
      await createRequest(formData);
      setPickupDate('');
      setLocation('');
      setScrapDetails([{ weight: '', type: '' }]);
      setImage(null);
    } catch (error) {
      console.error('Failed to create request', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-white text-center mb-6">Create Pickup Request</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {scrapDetails.map((detail, index) => (
          <div key={index} className="mb-4">
            <div className="flex gap-4">
              <input
                type="number"
                placeholder="Weight (kg)"
                value={detail.weight}
                onChange={(e) => handleScrapDetailsChange(index, 'weight', e.target.value)}
                className="w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                placeholder="Type of Scrap"
                value={detail.type}
                onChange={(e) => handleScrapDetailsChange(index, 'type', e.target.value)}
                className="w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addScrapDetail}
          className="w-full p-2 mt-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
        >
          Add Scrap Detail
        </button>

        <div className="mt-4 mb-6">
          <input
            type="date"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            className="w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full p-2 text-white rounded-md bg-gray-700 file:bg-blue-600 file:text-white file:px-4 file:py-2 file:rounded-md"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none"
        >
          {loading ? 'Submitting...' : 'Create Request'}
        </button>
      </form>
    </div>
  );
};

export default CreateRequest;

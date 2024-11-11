import { useEffect, useState } from 'react';
import axios from 'axios';

const ScheduleList = () => {
  const [schedules, setSchedules] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/user/scraprequest/schedules');
        setSchedules(response.data.schedules);
      } catch (error) {
        setErrorMessage(error.response?.data?.message || 'Error fetching schedules');
      }
    };

    fetchSchedules();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">My Pickup Schedules</h2>

      {errorMessage && (
        <p className="text-center text-red-600 mb-4">{errorMessage}</p>
      )}

      <div className="space-y-4">
        {schedules.map((schedule) => (
          <div key={schedule._id} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Pickup Date: {new Date(schedule.pickupDate).toLocaleDateString()}</h3>
            <p className="text-gray-600 mb-1">
              <span className="font-semibold">Scrap Details:</span> {schedule.scrapDetails}
            </p>
            <p className="text-gray-600 mb-1">
              <span className="font-semibold">Location:</span> {schedule.location}
            </p>
            <p className="text-gray-600 mb-1">
              <span className="font-semibold">Status:</span> {schedule.status}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Customer:</span> {schedule.customerId?.name} ({schedule.customerId?.contactNumber})
            </p>
            {schedule.collectorId && (
              <p className="text-gray-600">
                <span className="font-semibold">Collector:</span> {schedule.collectorId.name} ({schedule.collectorId.contactNumber})
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleList;

import { MapPin, Star } from "lucide-react";
import { useState } from "react";

// My Bookings Page
const MyBookings = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  
  const upcomingBookings = [
    { id: 1, tour: 'Eiffel Tower Experience', location: 'Paris, France', date: 'Nov 15, 2025', time: '10:00 AM', status: 'Confirmed', price: 89, crowdForecast: 'low', image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=400' },
    { id: 2, tour: 'Santorini Sunset Cruise', location: 'Santorini, Greece', date: 'Dec 2, 2025', time: '6:00 PM', status: 'Confirmed', price: 120, crowdForecast: 'medium', image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=400' },
    { id: 3, tour: 'Swiss Alps Adventure', location: 'Interlaken, Switzerland', date: 'Jan 10, 2026', time: '8:00 AM', status: 'Pending', price: 199, crowdForecast: 'low', image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400' }
  ];

  const pastBookings = [
    { id: 4, tour: 'Grand Canyon Tour', location: 'Arizona, USA', date: 'Oct 1, 2025', status: 'Completed', price: 150, rating: 5 },
    { id: 5, tour: 'Tokyo City Explorer', location: 'Tokyo, Japan', date: 'Sep 15, 2025', status: 'Completed', price: 95, rating: 4 }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-100 mb-2">My Bookings</h1>
        <p className="text-gray-400">Manage your travel plans and view booking history</p>
      </div>

      <div className="flex gap-4 border-b border-gray-700">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`px-4 py-3 font-medium transition-colors relative ${activeTab === 'upcoming' ? 'text-teal-400' : 'text-gray-400 hover:text-gray-300'}`}
        >
          Upcoming ({upcomingBookings.length})
          {activeTab === 'upcoming' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-400" />}
        </button>
        <button
          onClick={() => setActiveTab('past')}
          className={`px-4 py-3 font-medium transition-colors relative ${activeTab === 'past' ? 'text-teal-400' : 'text-gray-400 hover:text-gray-300'}`}
        >
          Past ({pastBookings.length})
          {activeTab === 'past' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-400" />}
        </button>
      </div>

      {activeTab === 'upcoming' && (
        <div className="space-y-4">
          {upcomingBookings.map(booking => (
            <div key={booking.id} className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden hover:border-teal-500 transition-colors">
              <div className="md:flex">
                <div className="md:w-48 h-48 md:h-auto">
                  <img src={booking.image} alt={booking.tour} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-100 mb-1">{booking.tour}</h3>
                      <div className="flex items-center gap-1 text-sm text-gray-400">
                        <MapPin className="w-4 h-4" />
                        {booking.location}
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${booking.status === 'Confirmed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                      {booking.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Date</p>
                      <p className="text-sm font-medium text-gray-100">{booking.date}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Time</p>
                      <p className="text-sm font-medium text-gray-100">{booking.time}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Price</p>
                      <p className="text-sm font-medium text-teal-400">${booking.price}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Crowd Forecast</p>
                      <p className={`text-sm font-medium ${booking.crowdForecast === 'low' ? 'text-emerald-400' : 'text-yellow-400'}`}>
                        {booking.crowdForecast === 'low' ? 'Low' : 'Moderate'}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg text-sm font-medium transition-colors">View Details</button>
                    <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg text-sm font-medium transition-colors">Modify</button>
                    <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg text-sm font-medium transition-colors">Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'past' && (
        <div className="space-y-4">
          {pastBookings.map(booking => (
            <div key={booking.id} className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-100 mb-1">{booking.tour}</h3>
                  <div className="flex items-center gap-1 text-sm text-gray-400 mb-2">
                    <MapPin className="w-4 h-4" />
                    {booking.location}
                  </div>
                  <p className="text-sm text-gray-500">Completed on {booking.date}</p>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < booking.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} />
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                <span className="text-lg font-semibold text-gray-100">${booking.price}</span>
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg text-sm font-medium transition-colors">Book Again</button>
                  <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg text-sm font-medium transition-colors">View Receipt</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
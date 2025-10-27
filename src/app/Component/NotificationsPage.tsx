import { Users, CheckCircle, AlertTriangle, Zap, Bell } from "lucide-react";
import { useState } from "react";
const mockNotifications = [
  { id: 1, type: "crowd", message: "Low crowd detected at Eiffel Tower - Perfect time to visit!", time: "5 min ago", read: false },
  { id: 2, type: "booking", message: "Your Santorini booking is confirmed!", time: "2 hours ago", read: false },
  { id: 3, type: "alert", message: "Weather alert for Swiss Alps tour on Jan 10", time: "1 day ago", read: true },
  { id: 4, type: "suggestion", message: "AI suggests visiting Louvre Museum - 30% less crowd than usual", time: "2 days ago", read: true }
];
// Notifications Page
const NotificationsPage = () => {
  const [filter, setFilter] = useState('all');
  
  const getIcon = (type) => {
    switch (type) {
      case 'crowd': return <Users className="w-5 h-5 text-teal-400" />;
      case 'booking': return <CheckCircle className="w-5 h-5 text-emerald-400" />;
      case 'alert': return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'suggestion': return <Zap className="w-5 h-5 text-blue-400" />;
      default: return <Bell className="w-5 h-5 text-gray-400" />;
    }
  };

  const filteredNotifications = filter === 'all' ? mockNotifications : mockNotifications.filter(n => n.type === filter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-100 mb-2">Notifications</h1>
        <p className="text-gray-400">Stay updated with real-time alerts and recommendations</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {['all', 'crowd', 'booking', 'alert', 'suggestion'].map(type => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === type ? 'bg-teal-500 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredNotifications.map(notif => (
          <div key={notif.id} className={`bg-gray-800 border ${!notif.read ? 'border-teal-500' : 'border-gray-700'} rounded-lg p-4 hover:bg-gray-750 transition-colors`}>
            <div className="flex gap-4">
              <div className="flex-shrink-0 mt-1">{getIcon(notif.type)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <p className="text-gray-200">{notif.message}</p>
                  {!notif.read && <div className="w-2 h-2 bg-teal-500 rounded-full flex-shrink-0 mt-2" />}
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">{notif.time}</p>
                  <div className="flex gap-2">
                    {!notif.read && (
                      <button className="text-sm text-teal-400 hover:text-teal-300">Mark as read</button>
                    )}
                    <button className="text-sm text-gray-500 hover:text-gray-400">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default NotificationsPage;
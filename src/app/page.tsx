"use client"
import React, { useState, useEffect } from 'react';
import { Menu, X, Home, Search, BarChart3, Calendar, Bell, User, ChevronDown, MapPin, DollarSign, Users, TrendingUp, Clock, Star, AlertTriangle, CheckCircle, Navigation, Zap } from 'lucide-react';
import UserProfile from './Component/userprofile';
import NotificationsPage from './Component/NotificationsPage';
import MyBookings from './Component/MyBookings';
import CrowdAnalytics from './Component/CrowdAnalytics';
import Dashboard from './Component/Dashboard';
import SearchBooking from './Component/SearchBooking';
import ChatbotPage from './Component/ChatbotPage';


const mockNotifications = [
  { id: 1, type: "crowd", message: "Low crowd detected at Eiffel Tower - Perfect time to visit!", time: "5 min ago", read: false },
  { id: 2, type: "booking", message: "Your Santorini booking is confirmed!", time: "2 hours ago", read: false },
  { id: 3, type: "alert", message: "Weather alert for Swiss Alps tour on Jan 10", time: "1 day ago", read: true },
  { id: 4, type: "suggestion", message: "She suggests visiting Louvre Museum - 30% less crowd than usual", time: "2 days ago", read: true }
];

// Sidebar Navigation
const Sidebar = ({ isOpen, setIsOpen, currentPage, setCurrentPage }) => {
  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'search', icon: Search, label: 'Search & Book Tours' },
    { id: 'crowd', icon: BarChart3, label: 'Crowd Analytics' },
    { id: 'bookings', icon: Calendar, label: 'My Bookings' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
    { id: 'profile', icon: User, label: 'User Profile' }
  ];

  return (
    <>
      <div className={`fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsOpen(false)} />
      <aside className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-gray-900 border-r border-gray-800 transform transition-transform lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center gap-2">
           
            <span className="text-lg font-bold text-gray-100">She Travel Supporter</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="lg:hidden text-gray-400 hover:text-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="p-4 space-y-2">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { setCurrentPage(item.id); setIsOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${currentPage === item.id ? 'bg-teal-500 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-gray-100'}`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
};

// Header Component
const Header = ({ setIsOpen, showNotifications, setShowNotifications }) => {
  const [showProfile, setShowProfile] = useState(false);
  const unreadCount = mockNotifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-10 bg-gray-900 border-b border-gray-800 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <button onClick={() => setIsOpen(true)} className="lg:hidden text-gray-400 hover:text-gray-100">
            <Menu className="w-6 h-6" />
          </button>
          <div className="hidden md:flex items-center flex-1 max-w-xl">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search destinations, tours, experiences..."
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <button onClick={() => setShowNotifications(!showNotifications)} className="relative p-2 text-gray-400 hover:text-gray-100 hover:bg-gray-800 rounded-lg">
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">{unreadCount}</span>
              )}
            </button>
          </div>
          <div className="relative">
            <button onClick={() => setShowProfile(!showProfile)} className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded-lg">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-blue-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
            {showProfile && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg py-2">
                <div className="px-4 py-2 border-b border-gray-700">
                  <p className="text-sm font-medium text-gray-100">Raghavan</p>
                  <p className="text-xs text-gray-400">funwithmetamil@gmail.com</p>
                </div>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700">Settings</button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700">Help & Support</button>
                <button className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-gray-700">Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

// Notification Dropdown
const NotificationDropdown = ({ show, setShow }) => {
  if (!show) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'crowd': return <Users className="w-5 h-5 text-teal-400" />;
      case 'booking': return <CheckCircle className="w-5 h-5 text-emerald-400" />;
      case 'alert': return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'suggestion': return <Zap className="w-5 h-5 text-blue-400" />;
      default: return <Bell className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="absolute right-0 mt-2 w-80 bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-h-96 overflow-y-auto">
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-lg font-semibold text-gray-100">Notifications</h3>
      </div>
      <div className="divide-y divide-gray-700">
        {mockNotifications.map(notif => (
          <div key={notif.id} className={`p-4 hover:bg-gray-750 cursor-pointer ${!notif.read ? 'bg-gray-750' : ''}`}>
            <div className="flex gap-3">
              <div className="flex-shrink-0">{getIcon(notif.type)}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-200">{notif.message}</p>
                <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
              </div>
              {!notif.read && <div className="w-2 h-2 bg-teal-500 rounded-full flex-shrink-0 mt-2" />}
            </div>
          </div>
        ))}
      </div>
      <div className="p-3 border-t border-gray-700">
        <button className="w-full text-center text-sm text-teal-400 hover:text-teal-300">View All Notifications</button>
      </div>
    </div>
  );
};







// Main App Component
const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [showNotifications, setShowNotifications] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'search': return <ChatbotPage />;
      case 'crowd': return <CrowdAnalytics />;
      case 'bookings': return <MyBookings />;
      case 'notifications': return <NotificationsPage />;
      case 'profile': return <UserProfile />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <div className="flex-1 flex flex-col min-h-screen">
          <div className="relative">
            <Header setIsOpen={setSidebarOpen} showNotifications={showNotifications} setShowNotifications={setShowNotifications} />
            {showNotifications && (
              <div className="absolute top-full right-4 z-50">
                <NotificationDropdown show={showNotifications} setShow={setShowNotifications} />
              </div>
            )}
          </div>
          <main className="flex-1 p-6">
            {renderPage()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;
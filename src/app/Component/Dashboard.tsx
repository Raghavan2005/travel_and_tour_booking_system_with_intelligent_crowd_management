"use client"
import React, { useState, useEffect } from 'react';

import { Zap, Users, MapPin, Star, Calendar, DollarSign, TrendingUp, AlertTriangle } from "lucide-react";
// Mock Data
const mockTours = [
  {
    id: 1,
    name: "Eiffel Tower Experience",
    location: "Paris, France",
    price: 89,
    originalPrice: 120,
    rating: 4.8,
    reviews: 2456,
    image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=400",
    crowdLevel: "low",
    crowdPercentage: 35,
    aiRecommended: true,
    tags: ["Cultural", "Romantic"]
  },
  {
    id: 2,
    name: "Colosseum Ancient Tour",
    location: "Rome, Italy",
    price: 75,
    originalPrice: 75,
    rating: 4.9,
    reviews: 3421,
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400",
    crowdLevel: "high",
    crowdPercentage: 85,
    aiRecommended: false,
    tags: ["Cultural", "Historical"]
  },
  {
    id: 3,
    name: "Santorini Sunset Cruise",
    location: "Santorini, Greece",
    price: 120,
    originalPrice: 150,
    rating: 4.7,
    reviews: 1823,
    image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=400",
    crowdLevel: "medium",
    crowdPercentage: 55,
    aiRecommended: true,
    tags: ["Relaxation", "Romantic"]
  },
  {
    id: 4,
    name: "Swiss Alps Adventure",
    location: "Interlaken, Switzerland",
    price: 199,
    originalPrice: 199,
    rating: 5.0,
    reviews: 987,
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400",
    crowdLevel: "low",
    crowdPercentage: 25,
    aiRecommended: true,
    tags: ["Adventure", "Nature"]
  }
];

const mockBookings = [
  { id: 1, tour: "Eiffel Tower Experience", date: "Nov 15, 2025", status: "Confirmed", price: 89 },
  { id: 2, tour: "Santorini Sunset Cruise", date: "Dec 2, 2025", status: "Pending", price: 120 },
  { id: 3, tour: "Swiss Alps Adventure", date: "Jan 10, 2026", status: "Confirmed", price: 199 }
];


// Tour Card Component
const TourCard = ({ tour }) => {
  const getCrowdColor = (level) => {
    switch (level) {
      case 'low': return 'text-emerald-400 bg-emerald-400/10';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10';
      case 'high': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getCrowdLabel = (level) => {
    switch (level) {
      case 'low': return 'Low Crowd';
      case 'medium': return 'Moderate';
      case 'high': return 'High Crowd';
      default: return 'Unknown';
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-teal-500 transition-all group">
      <div className="relative h-48 overflow-hidden">
        <img src={tour.image} alt={tour.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
        {tour.aiRecommended && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-teal-500 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
            <Zap className="w-3 h-3" />
            AI Recommended
          </div>
        )}
        <div className={`absolute top-3 right-3 ${getCrowdColor(tour.crowdLevel)} px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1`}>
          <Users className="w-3 h-3" />
          {getCrowdLabel(tour.crowdLevel)}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-100 mb-1">{tour.name}</h3>
        <div className="flex items-center gap-1 text-sm text-gray-400 mb-3">
          <MapPin className="w-4 h-4" />
          {tour.location}
        </div>
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-gray-100">{tour.rating}</span>
          </div>
          <span className="text-xs text-gray-500">({tour.reviews} reviews)</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          {tour.tags.map(tag => (
            <span key={tag} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full">{tag}</span>
          ))}
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-gray-700">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-teal-400">${tour.price}</span>
            {tour.originalPrice > tour.price && (
              <span className="text-sm text-gray-500 line-through">${tour.originalPrice}</span>
            )}
          </div>
          <button className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-medium transition-colors">
            Book Now
          </button>
        </div>
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
            <span>Crowd Density</span>
            <span>{tour.crowdPercentage}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className={`h-2 rounded-full ${tour.crowdLevel === 'low' ? 'bg-emerald-400' : tour.crowdLevel === 'medium' ? 'bg-yellow-400' : 'bg-red-400'}`} style={{ width: `${tour.crowdPercentage}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Dashboard Stats Card
const StatCard = ({ icon: Icon, label, value, change, color }) => (
  <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-teal-500 transition-colors">
    <div className="flex items-center justify-between mb-4">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
      {change && (
        <span className={`text-sm font-medium ${change > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
          {change > 0 ? '+' : ''}{change}%
        </span>
      )}
    </div>
    <h3 className="text-2xl font-bold text-gray-100 mb-1">{value}</h3>
    <p className="text-sm text-gray-400">{label}</p>
  </div>
);


// Dashboard Page
const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-100 mb-2">Welcome back, keshavallu!</h1>
        <p className="text-gray-400">Here's what's happening with your travel plans today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Calendar} label="Upcoming Bookings" value="3" change={12} color="bg-teal-500/10 text-teal-400" />
        <StatCard icon={MapPin} label="Destinations Visited" value="12" change={8} color="bg-blue-500/10 text-blue-400" />
        <StatCard icon={DollarSign} label="Total Spent" value="$1,234" change={-5} color="bg-emerald-500/10 text-emerald-400" />
        <StatCard icon={TrendingUp} label="AI Recommendations" value="8" change={15} color="bg-purple-500/10 text-purple-400" />
      </div>

      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-100 mb-4">Quick Booking Search</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Destination</label>
            <input type="text" placeholder="Where to?" className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:border-teal-500" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Date</label>
            <input type="date" className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:border-teal-500" />
          </div>
          <div className="flex items-end">
            <button className="w-full px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-medium transition-colors">Search Tours</button>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-100">AI Recommended Tours</h2>
          <button className="text-teal-400 hover:text-teal-300 text-sm font-medium">View All</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockTours.filter(t => t.aiRecommended).map(tour => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </div>

      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-6 h-6 text-yellow-400" />
          <h2 className="text-xl font-semibold text-gray-100">Crowd Alerts</h2>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-gray-100">Eiffel Tower - Low crowd detected (35% capacity)</span>
            </div>
            <span className="text-xs text-emerald-400">Perfect time!</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
              <span className="text-gray-100">Colosseum - High crowd alert (85% capacity)</span>
            </div>
            <span className="text-xs text-red-400">Consider later</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-100 mb-4">Recent Bookings</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Tour</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Status</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">Price</th>
              </tr>
            </thead>
            <tbody>
              {mockBookings.map(booking => (
                <tr key={booking.id} className="border-b border-gray-700 hover:bg-gray-750">
                  <td className="py-3 px-4 text-gray-100">{booking.tour}</td>
                  <td className="py-3 px-4 text-gray-400">{booking.date}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${booking.status === 'Confirmed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right text-gray-100 font-medium">${booking.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
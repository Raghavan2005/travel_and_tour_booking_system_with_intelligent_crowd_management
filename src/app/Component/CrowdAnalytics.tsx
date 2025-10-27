"use client"
import React, { useState, useEffect } from 'react';
import { TrendingUp, Zap, Users, AlertTriangle, CheckCircle } from "lucide-react";

// Crowd Analytics Page
const CrowdAnalytics = () => {
  const heatmapData = [
    { location: 'Eiffel Tower', crowd: 35, trend: 'down', color: 'bg-emerald-500' },
    { location: 'Louvre Museum', crowd: 45, trend: 'stable', color: 'bg-yellow-500' },
    { location: 'Arc de Triomphe', crowd: 50, trend: 'up', color: 'bg-yellow-500' },
    { location: 'Notre-Dame', crowd: 70, trend: 'up', color: 'bg-orange-500' },
    { location: 'Colosseum', crowd: 85, trend: 'up', color: 'bg-red-500' },
    { location: 'Vatican Museums', crowd: 80, trend: 'stable', color: 'bg-red-500' }
  ];

  const peakTimes = [
    { hour: '9 AM', crowd: 30 },
    { hour: '10 AM', crowd: 55 },
    { hour: '11 AM', crowd: 75 },
    { hour: '12 PM', crowd: 85 },
    { hour: '1 PM', crowd: 90 },
    { hour: '2 PM', crowd: 80 },
    { hour: '3 PM', crowd: 70 },
    { hour: '4 PM', crowd: 55 },
    { hour: '5 PM', crowd: 40 },
    { hour: '6 PM', crowd: 25 }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-100 mb-2">Crowd Analytics</h1>
        <p className="text-gray-400">Real-time insights and predictions for tourist destinations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-100">Live Crowd Heat Map</h2>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-xs text-gray-400">Live</span>
            </div>
          </div>
          <div className="space-y-3">
            {heatmapData.map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">{item.location}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-100">{item.crowd}%</span>
                    {item.trend === 'up' && <TrendingUp className="w-4 h-4 text-red-400" />}
                    {item.trend === 'down' && <TrendingUp className="w-4 h-4 text-emerald-400 rotate-180" />}
                    {item.trend === 'stable' && <span className="text-xs text-gray-500">—</span>}
                  </div>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div className={`${item.color} h-3 rounded-full transition-all duration-500`} style={{ width: `${item.crowd}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-100 mb-4">Peak Time Predictions</h2>
          <div className="h-64 flex items-end justify-between gap-2">
            {peakTimes.map((time, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-gray-700 rounded-t relative" style={{ height: `${time.crowd * 2}px` }}>
                  <div className={`absolute inset-0 rounded-t ${time.crowd > 75 ? 'bg-red-500' : time.crowd > 50 ? 'bg-yellow-500' : 'bg-emerald-500'}`} />
                </div>
                <span className="text-xs text-gray-400 transform -rotate-45 origin-top-left mt-2">{time.hour}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-center gap-6 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-emerald-500 rounded" />
              <span className="text-gray-400">Low</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded" />
              <span className="text-gray-400">Moderate</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded" />
              <span className="text-gray-400">High</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Zap className="w-6 h-6 text-teal-400" />
          <h2 className="text-xl font-semibold text-gray-100">AI Alternative Suggestions</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-100">Instead of Colosseum (85%)</h3>
              <span className="text-xs text-emerald-400 font-medium">RECOMMENDED</span>
            </div>
            <p className="text-sm text-gray-300 mb-3">Visit Roman Forum nearby - similar experience with 40% less crowd</p>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-emerald-400">45% capacity</span>
              <span className="text-xs text-gray-500 ml-auto">5 min walk</span>
            </div>
          </div>
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-100">Instead of Notre-Dame (70%)</h3>
              <span className="text-xs text-emerald-400 font-medium">RECOMMENDED</span>
            </div>
            <p className="text-sm text-gray-300 mb-3">Explore Sainte-Chapelle - stunning Gothic architecture, fewer tourists</p>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-emerald-400">30% capacity</span>
              <span className="text-xs text-gray-500 ml-auto">3 min walk</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-100 mb-4">Crowd Alerts & Notifications</h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-4 bg-gray-750 rounded-lg border border-gray-700">
            <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-medium text-gray-100 mb-1">High Crowd Warning</h3>
              <p className="text-sm text-gray-400">Colosseum experiencing peak crowds (85%). Consider visiting after 4 PM for 50% less crowd.</p>
              <span className="text-xs text-gray-500 mt-2 inline-block">Updated 5 minutes ago</span>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-750 rounded-lg border border-gray-700">
            <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-medium text-gray-100 mb-1">Perfect Time Alert</h3>
              <p className="text-sm text-gray-400">Eiffel Tower crowd at 35% - ideal time to visit! Expected to remain low for next 2 hours.</p>
              <span className="text-xs text-gray-500 mt-2 inline-block">Updated 2 minutes ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CrowdAnalytics;
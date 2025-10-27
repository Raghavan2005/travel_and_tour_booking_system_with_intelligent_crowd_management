import React, { useState, useEffect } from 'react';
import { TrendingUp, Zap, Users, AlertTriangle, CheckCircle, Clock } from "lucide-react";

/**
 * Crowd Analytics Dashboard
 * Displays real-time and predictive insights for tourist destinations.
 * Uses a dark theme with responsive grid layout and animated status indicators.
 */
const CrowdAnalytics = () => {
  // State for dynamic content (Last Updated Time)
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minuteAA
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // 60 seconds

    return () => clearInterval(timer);
  }, []);

  // Static Data
  const heatmapData = [
    { location: 'Eiffel Tower', crowd: 35, trend: 'down', color: 'bg-emerald-500', city: 'Paris' },
    { location: 'Louvre Museum', crowd: 45, trend: 'stable', color: 'bg-yellow-500', city: 'Paris' },
    { location: 'Arc de Triomphe', crowd: 50, trend: 'up', color: 'bg-yellow-500', city: 'Paris' },
    { location: 'Notre-Dame', crowd: 70, trend: 'up', color: 'bg-orange-500', city: 'Paris' },
    { location: 'Colosseum', crowd: 85, trend: 'up', color: 'bg-red-500', city: 'Rome' },
    { location: 'Vatican Museums', crowd: 80, trend: 'stable', color: 'bg-red-500', city: 'Rome' }
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

  const formattedTime = currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  // Component structure starts here
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8 font-inter">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header and Last Updated Time */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-gray-700 pb-4">
          <div>
            <h1 className="text-4xl font-extrabold text-teal-400 mb-1">GLOBAL CROWD ANALYTICS</h1>
            <p className="text-gray-400 text-lg">Real-time insights and predictions for key destinations</p>
          </div>
          <div className="flex items-center gap-2 mt-4 sm:mt-0 bg-gray-800 p-2 rounded-lg border border-gray-700 shadow-lg">
            <Clock className="w-5 h-5 text-yellow-400" />
            <span className="text-sm font-medium text-gray-300">Last Updated: {formattedTime}</span>
          </div>
        </div>

        {/* Top Analytics Grid: Heat Map and Peak Time Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Live Crowd Heat Map */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-100">Live Destination Traffic</h2>
              <div className="flex items-center gap-2 bg-red-900/30 p-1 px-3 rounded-full border border-red-500/50">
                <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse" />
                <span className="text-xs text-red-300 font-semibold">LIVE DATA</span>
              </div>
            </div>
            
            <div className="space-y-4">
              {heatmapData.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-medium text-gray-300">{item.location} ({item.city})</span>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold text-gray-100">{item.crowd}%</span>
                      {/* Trend Indicator */}
                      {item.trend === 'up' && <TrendingUp className="w-5 h-5 text-red-400 transition-transform duration-300" />}
                      {item.trend === 'down' && <TrendingUp className="w-5 h-5 text-emerald-400 rotate-180 transition-transform duration-300" />}
                      {item.trend === 'stable' && <span className="text-sm text-gray-500">→</span>}
                    </div>
                  </div>
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-700 rounded-full h-3.5 overflow-hidden">
                    <div className={`${item.color} h-3.5 rounded-full transition-all duration-700 ease-out`} style={{ width: `${item.crowd}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Peak Time Predictions Bar Chart */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-100 mb-6">Predicted Hourly Traffic (Today)</h2>
            <div className="h-64 flex items-end justify-between gap-1 md:gap-2 border-l border-b border-gray-700 pb-2 pl-2">
              {peakTimes.map((time, idx) => (
                <div 
                  key={idx} 
                  className="flex-1 flex flex-col items-center group cursor-pointer transition-all duration-300"
                  style={{ height: '100%' }} // Ensure container fills height
                >
                  <div 
                    className="w-4/5 bg-gray-700 rounded-t-lg relative transition-all duration-500 hover:scale-y-105" 
                    style={{ height: `${time.crowd}%` }} // Use crowd as percentage height
                  >
                    <div className={`absolute inset-0 rounded-t-lg transition-colors duration-300 ${time.crowd > 75 ? 'bg-red-500' : time.crowd > 50 ? 'bg-yellow-500' : 'bg-emerald-500'}`} />
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-semibold text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {time.crowd}%
                    </span>
                  </div>
                  <span className="text-xs text-gray-400 mt-2 font-medium">{time.hour.split(' ')[0]}</span>
                </div>
              ))}
            </div>
            
            {/* Legend */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-emerald-500 rounded-full" />
                <span className="text-gray-400">Low (0-50%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <span className="text-gray-400">Moderate (51-75%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <span className="text-gray-400">High (76%+)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Alternative Suggestions Panel */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-6 h-6 text-teal-400 fill-teal-400/20" />
            <h2 className="text-2xl font-bold text-gray-100">Smart Crowd Avoidance Suggestions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Suggestion 1 */}
            <div className="p-5 bg-teal-800/20 border border-teal-500/40 rounded-lg transition-shadow hover:shadow-teal-500/30 hover:shadow-xl duration-300">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-semibold text-gray-100">Instead of Colosseum (85%)</h3>
                <span className="text-sm text-teal-300 font-bold bg-teal-900/50 px-3 py-1 rounded-full">RECOMMENDED</span>
              </div>
              <p className="text-base text-gray-300 mb-4">
                Visit the **Roman Forum** nearby. Offers a similar, rich historical experience with significantly lower crowd density.
              </p>
              <div className="flex items-center gap-4 pt-2 border-t border-teal-500/20">
                <div className="flex items-center gap-1">
                  <Users className="w-5 h-5 text-teal-400" />
                  <span className="text-sm text-teal-300 font-semibold">~45% capacity</span>
                </div>
                <span className="text-xs text-gray-500 ml-auto">5 min walk</span>
              </div>
            </div>
            
            {/* Suggestion 2 */}
            <div className="p-5 bg-teal-800/20 border border-teal-500/40 rounded-lg transition-shadow hover:shadow-teal-500/30 hover:shadow-xl duration-300">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-semibold text-gray-100">Instead of Notre-Dame (70%)</h3>
                <span className="text-sm text-teal-300 font-bold bg-teal-900/50 px-3 py-1 rounded-full">RECOMMENDED</span>
              </div>
              <p className="text-base text-gray-300 mb-4">
                Explore **Sainte-Chapelle**. Stunning Gothic architecture and legendary stained glass, typically with fewer tourists.
              </p>
              <div className="flex items-center gap-4 pt-2 border-t border-teal-500/20">
                <div className="flex items-center gap-1">
                  <Users className="w-5 h-5 text-teal-400" />
                  <span className="text-sm text-teal-300 font-semibold">~30% capacity</span>
                </div>
                <span className="text-xs text-gray-500 ml-auto">3 min walk</span>
              </div>
            </div>
          </div>
        </div>

        {/* Alerts & Notifications Panel */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-2xl">
          <h2 className="text-2xl font-bold text-gray-100 mb-6">Crowd Alerts & Notifications</h2>
          <div className="space-y-4">
            
            {/* Warning Alert */}
            <div className="flex items-start gap-4 p-4 bg-yellow-900/20 rounded-lg border border-yellow-500/30">
              <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-yellow-300 mb-1">High Crowd Warning: Colosseum</h3>
                <p className="text-sm text-gray-300">Colosseum is experiencing peak crowds (85% and rising). Current wait time is 90 minutes. Consider visiting after 4 PM when capacity is predicted to drop below 50%.</p>
                <span className="text-xs text-gray-500 mt-2 inline-block">Updated 5 minutes ago</span>
              </div>
            </div>
            
            {/* Success Alert */}
            <div className="flex items-start gap-4 p-4 bg-emerald-900/20 rounded-lg border border-emerald-500/30">
              <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-emerald-300 mb-1">Optimal Time Alert: Eiffel Tower</h3>
                <p className="text-sm text-gray-300">Eiffel Tower crowd is currently at 35% - this is an ideal time to visit! Minimal wait is expected to last for the next 2 hours.</p>
                <span className="text-xs text-gray-500 mt-2 inline-block">Updated 2 minutes ago</span>
              </div>
            </div>

            {/* General Info Alert */}
            <div className="flex items-start gap-4 p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
              <Zap className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-blue-300 mb-1">Trend Watch: Notre-Dame</h3>
                <p className="text-sm text-gray-300">Crowd levels are trending up sharply due to a large organized tour group arrival. Expect a capacity increase from 70% to 90% in the next hour.</p>
                <span className="text-xs text-gray-500 mt-2 inline-block">Forecast generated 1 minute ago</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CrowdAnalytics;

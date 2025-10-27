import { MapPin, DollarSign, Sparkles, Clock, Bot, ArrowRight, User, Send, Users } from "lucide-react";
import { useState } from "react";

// AI Travel Assistant Chatbot Page
const ChatbotPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Hello! I\'m your AI Travel Assistant. I can help you plan your perfect trip with personalized recommendations based on crowd levels, weather, and your preferences. Where would you like to go?',
      timestamp: new Date(Date.now() - 60000)
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [fromPlace, setFromPlace] = useState('');
  const [toPlace, setToPlace] = useState('');
  const [showQuickActions, setShowQuickActions] = useState(true);

  const popularDestinations = [
    'Paris, France',
    'Tokyo, Japan',
    'New York, USA',
    'Rome, Italy',
    'London, UK',
    'Dubai, UAE',
    'Barcelona, Spain',
    'Sydney, Australia'
  ];

  const quickActions = [
    { icon: MapPin, text: 'Show me low crowd destinations', action: 'crowd' },
    { icon: DollarSign, text: 'Budget-friendly tours', action: 'budget' },
    { icon: Sparkles, text: 'AI recommendations for me', action: 'recommend' },
    { icon: Clock, text: 'Best time to visit', action: 'timing' }
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    setShowQuickActions(false);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage, fromPlace, toPlace);
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        sender: 'bot',
        text: botResponse,
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (message, from, to) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('crowd') || lowerMessage.includes('busy')) {
      return `Based on real-time data, here are destinations with low crowd levels right now:\n\n🟢 Eiffel Tower - 35% capacity (Perfect time!)\n🟢 Swiss Alps - 25% capacity\n🟡 Santorini - 55% capacity\n\nWould you like me to book any of these for you?`;
    } else if (lowerMessage.includes('budget') || lowerMessage.includes('cheap')) {
      return `I found some amazing budget-friendly options for you:\n\n💰 Eiffel Tower Experience - $89 (was $120)\n💰 Colosseum Tour - $75\n💰 Tokyo City Explorer - $95\n\nAll tours include skip-the-line access and a guide. Which one interests you?`;
    } else if (lowerMessage.includes('recommend') || lowerMessage.includes('suggest')) {
      return `Based on your travel history and preferences, I recommend:\n\n✨ Swiss Alps Adventure - Perfect for nature lovers, low crowd (25%)\n✨ Santorini Sunset Cruise - Romantic experience, moderate crowd\n✨ Cultural Paris Tour - Museums and galleries, best visited mornings\n\nThese match your interest in adventure and cultural experiences!`;
    } else if (lowerMessage.includes('weather') || lowerMessage.includes('temperature')) {
      return `Current weather conditions:\n\n☀️ Paris: 18°C, Clear skies - Perfect for sightseeing\n⛅ Rome: 22°C, Partly cloudy\n🌤️ Santorini: 24°C, Sunny\n\nAll destinations have great weather for outdoor activities today!`;
    } else if (from && to) {
      return `Great! Planning your trip from ${from} to ${to}.\n\n✈️ Best routes available\n📊 Current crowd level: Low (35%)\n⏰ Recommended visit time: 10 AM - 2 PM\n💡 Tip: Book in advance to save 25%\n\nWould you like me to show you available tours in ${to}?`;
    } else if (to) {
      return `${to} is an excellent choice! Here's what I found:\n\n📍 8 popular attractions\n🎫 15 available tours\n👥 Current crowd level: Moderate\n⭐ Top rated: 4.8/5\n\nBest time to visit: Early morning (9-11 AM) or late afternoon (4-6 PM) to avoid crowds. Would you like to see specific tour options?`;
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return `Hello! I'm here to help you plan an amazing trip. I can:\n\n✅ Find tours with low crowd levels\n✅ Suggest destinations based on your budget\n✅ Provide real-time weather updates\n✅ Give personalized recommendations\n\nWhere would you like to travel?`;
    } else {
      return `I'd be happy to help you with that! Could you provide more details? For example:\n\n• Where do you want to go?\n• What's your budget range?\n• What type of experience are you looking for?\n• Any specific dates in mind?\n\nYou can also use the form above to select your departure and destination cities.`;
    }
  };

  const handleQuickAction = (action) => {
    let message = '';
    switch (action) {
      case 'crowd':
        message = 'Show me destinations with low crowd levels';
        break;
      case 'budget':
        message = 'What are the most budget-friendly tours available?';
        break;
      case 'recommend':
        message = 'Give me AI-powered recommendations based on my preferences';
        break;
      case 'timing':
        message = 'What\'s the best time to visit popular destinations?';
        break;
      default:
        message = '';
    }
    setInputMessage(message);
  };

  const handlePlanTrip = () => {
    if (fromPlace && toPlace) {
      const message = `I want to plan a trip from ${fromPlace} to ${toPlace}`;
      setInputMessage(message);
      handleSendMessage();
    }
  };

  return (
    <div className="space-y-6 h-full">
      <div>
        <h1 className="text-3xl font-bold text-gray-100 mb-2">AI Travel Assistant</h1>
        <p className="text-gray-400">Get personalized travel recommendations and real-time crowd insights</p>
      </div>

      {/* Trip Planning Form */}
      <div className="bg-gradient-to-r from-teal-500/10 to-blue-500/10 border border-teal-500/20 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Bot className="w-6 h-6 text-teal-400" />
          <h2 className="text-lg font-semibold text-gray-100">Plan Your Trip</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">From</label>
            <select 
              value={fromPlace}
              onChange={(e) => setFromPlace(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:border-teal-500"
            >
              <option value="">Select departure city</option>
              {popularDestinations.map(dest => (
                <option key={dest} value={dest}>{dest}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">To</label>
            <select 
              value={toPlace}
              onChange={(e) => setToPlace(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:border-teal-500"
            >
              <option value="">Select destination</option>
              {popularDestinations.map(dest => (
                <option key={dest} value={dest}>{dest}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button 
              onClick={handlePlanTrip}
              disabled={!fromPlace || !toPlace}
              className="w-full px-4 py-3 bg-teal-500 hover:bg-teal-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              Plan My Trip
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg flex flex-col" style={{ height: '600px' }}>
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex gap-3 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${message.sender === 'bot' ? 'bg-gradient-to-br from-teal-500 to-blue-500' : 'bg-gray-700'}`}>
                  {message.sender === 'bot' ? <Bot className="w-5 h-5 text-white" /> : <User className="w-5 h-5 text-gray-300" />}
                </div>
                <div>
                  <div className={`px-4 py-3 rounded-lg ${message.sender === 'bot' ? 'bg-gray-750 text-gray-100' : 'bg-teal-500 text-white'}`}>
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 px-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex gap-3 max-w-[80%]">
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-teal-500 to-blue-500">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="px-4 py-3 rounded-lg bg-gray-750">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        {showQuickActions && messages.length === 1 && (
          <div className="px-6 py-4 border-t border-gray-700">
            <p className="text-sm text-gray-400 mb-3">Quick Actions:</p>
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickAction(action.action)}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-750 hover:bg-gray-700 border border-gray-600 rounded-lg text-sm text-gray-300 transition-colors"
                >
                  <action.icon className="w-4 h-4 text-teal-400" />
                  <span className="text-left">{action.text}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me anything about your travel plans..."
              className="flex-1 px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-teal-500"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className="px-6 py-3 bg-teal-500 hover:bg-teal-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* AI Features Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-teal-500/10 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-teal-400" />
            </div>
            <h3 className="font-semibold text-gray-100">Real-Time Crowd Data</h3>
          </div>
          <p className="text-sm text-gray-400">Get instant updates on crowd levels at popular destinations</p>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="font-semibold text-gray-100">Smart Recommendations</h3>
          </div>
          <p className="text-sm text-gray-400">AI-powered suggestions based on your preferences and history</p>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="font-semibold text-gray-100">Best Time Predictions</h3>
          </div>
          <p className="text-sm text-gray-400">Find the perfect time to visit with minimal crowds</p>
        </div>
      </div>
    </div>
  );
};
export default ChatbotPage;
import { User } from "lucide-react";

// User Profile Page
const UserProfile = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-100 mb-2">User Profile</h1>
        <p className="text-gray-400">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-gradient-to-br from-teal-500 to-blue-500 rounded-full flex items-center justify-center mb-4">
                <User className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-100 mb-1">Vallu</h3>
              <p className="text-sm text-gray-400 mb-4">vallu@rec.com</p>
              <button className="w-full px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-medium transition-colors mb-2">Edit Profile</button>
              <button className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg font-medium transition-colors">Change Password</button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-100 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">First Name</label>
                <input type="text" value="keshavallu" className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:border-teal-500" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Last Name</label>
                <input type="text" value="Doe" className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:border-teal-500" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Email</label>
                <input type="email" value="keshavallu@gmail.com" className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:border-teal-500" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Phone</label>
                <input type="tel" value="+1 234 567 8900" className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:border-teal-500" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-100 mb-4">Travel Preferences</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Preferred Destinations</label>
                <div className="flex flex-wrap gap-2">
                  {['Europe', 'Asia', 'Americas', 'Africa'].map(dest => (
                    <span key={dest} className="px-3 py-1 bg-teal-500 text-white rounded-full text-sm">{dest}</span>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Interests</label>
                <div className="flex flex-wrap gap-2">
                  {['Adventure', 'Cultural', 'Nature'].map(interest => (
                    <span key={interest} className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm">{interest}</span>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
                <span className="text-gray-300">Enable crowd alerts</span>
                <div className="w-12 h-6 bg-teal-500 rounded-full relative cursor-pointer">
                  <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full" />
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
                <span className="text-gray-300">AI recommendations</span>
                <div className="w-12 h-6 bg-teal-500 rounded-full relative cursor-pointer">
                  <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-100 mb-4">Account Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-teal-400">12</p>
                <p className="text-sm text-gray-400">Tours Completed</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-400">8</p>
                <p className="text-sm text-gray-400">Countries Visited</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-emerald-400">$1,234</p>
                <p className="text-sm text-gray-400">Total Spent</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-400">4.8</p>
                <p className="text-sm text-gray-400">Avg Rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserProfile;
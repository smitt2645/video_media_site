import { Bell, Menu, Search, Video, Youtube } from 'lucide-react';
import React from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Header = ({
  user
}) => {
  const getUser = useSelector(state=>state.user);
  console.log("getUser from HEADER:::::",getUser.user?.data)
 console.log(user);
  return (
    <div className=''>
       <header className="bg-white border-b px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-100 rounded-full">
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2">
              <Youtube className="w-8 h-8 text-red-600" />
              <span className="text-xl font-bold">YouTube</span>
            </div>
          </div>

          <div className="flex-1 max-w-2xl mx-8">
            <div className="flex items-center">
              <div className="flex-1 flex items-center border rounded-l-full px-4 py-2">
                <input
                  type="text"
                  placeholder="Search"
                  className="flex-1 outline-none"
                />
              </div>
              <button className="bg-gray-100 border border-l-0 px-6 py-2 rounded-r-full hover:bg-gray-200">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Video className="w-6 h-6" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Bell className="w-6 h-6" />
            </button>
            <div className="max-w-full h-12 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold cursor-pointer">
              {getUser.user?.data?.username || "User"}
            </div>
          </div>
        </header>
        <div className="flex justify-center gap-3 p-4">
                  {['All', 'Music', 'Gaming', 'Live', 'News', 'Sports', 'Learning', 'Fashion', 'Podcasts'].map((filter, idx) => (
                    <button
                      key={idx}
                      className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                        idx === 0 ? 'bg-gray-900 text-white' : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
          </div>
  )
}

export default Header;

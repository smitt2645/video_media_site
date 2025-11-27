import React, { useState } from 'react';
import { Menu, Home, Compass, PlaySquare, Clock, ThumbsUp, History, Youtube, TrendingUp, Music, Gamepad2, Trophy, Lightbulb, Shirt, Podcast, Film, Settings, HelpCircle, MessageSquare, Search, Bell, Video, BarChart3 } from 'lucide-react';
import SideBar from "../../pages/sideBar/SideBar"
const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('home');

  const videos = [
    { id: 1, title: 'Building a Full Stack App with React & Node.js', channel: 'Tech Academy', views: '1.2M', time: '2 days ago', duration: '15:23', thumbnail: 'bg-gradient-to-br from-blue-500 to-purple-600' },
    { id: 2, title: 'Top 10 JavaScript Tips for Beginners', channel: 'Code Masters', views: '856K', time: '1 week ago', duration: '12:45', thumbnail: 'bg-gradient-to-br from-red-500 to-pink-600' },
    { id: 3, title: 'Understanding CSS Grid Layout', channel: 'Design Pro', views: '543K', time: '3 days ago', duration: '18:30', thumbnail: 'bg-gradient-to-br from-green-500 to-teal-600' },
    { id: 4, title: 'Machine Learning Basics Explained', channel: 'AI Insights', views: '2.1M', time: '5 days ago', duration: '22:15', thumbnail: 'bg-gradient-to-br from-yellow-500 to-orange-600' },
    { id: 5, title: 'Web Design Trends 2024', channel: 'Creative Hub', views: '678K', time: '1 day ago', duration: '10:55', thumbnail: 'bg-gradient-to-br from-indigo-500 to-blue-600' },
    { id: 6, title: 'Advanced React Hooks Tutorial', channel: 'React Mastery', views: '1.5M', time: '4 days ago', duration: '25:40', thumbnail: 'bg-gradient-to-br from-purple-500 to-pink-600' },
    { id: 7, title: 'Docker Tutorial for Beginners', channel: 'DevOps Guide', views: '920K', time: '6 days ago', duration: '20:18', thumbnail: 'bg-gradient-to-br from-cyan-500 to-blue-600' },
    { id: 8, title: 'Python Data Science Complete Course', channel: 'Data School', views: '3.2M', time: '1 week ago', duration: '45:22', thumbnail: 'bg-gradient-to-br from-emerald-500 to-green-600' },
  ];

  const sidebarItems = [
    { icon: Home, label: 'Home', id: 'home' },
    { icon: Compass, label: 'Explore', id: 'explore' },
    { icon: PlaySquare, label: 'Subscriptions', id: 'subscriptions' },
  ];

  const libraryItems = [
    { icon: History, label: 'History', id: 'history' },
    { icon: Clock, label: 'Watch Later', id: 'watch-later' },
    { icon: ThumbsUp, label: 'Liked Videos', id: 'liked' },
    { icon: BarChart3, label: 'Your Videos', id: 'your-videos' },
  ];

  const exploreItems = [
    { icon: TrendingUp, label: 'Trending' },
    { icon: Music, label: 'Music' },
    { icon: Gamepad2, label: 'Gaming' },
    { icon: Trophy, label: 'Sports' },
    { icon: Film, label: 'Movies' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
       
        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Filter Chips */}
       

          {/* Video Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {videos.map((video) => (
              <div key={video.id} className="cursor-pointer group">
                {/* Thumbnail */}
                <div className="relative mb-3 rounded-xl overflow-hidden">
                  <div className={`${video.thumbnail} aspect-video flex items-center justify-center`}>
                    <PlaySquare className="w-16 h-16 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <span className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-1.5 py-0.5 rounded">
                    {video.duration}
                  </span>
                </div>

                {/* Video Info */}
                <div className="flex gap-3">
                  <div className="w-9 h-9 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                    {video.channel[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm line-clamp-2 mb-1 group-hover:text-blue-600">
                      {video.title}
                    </h3>
                    <p className="text-gray-600 text-xs">{video.channel}</p>
                    <p className="text-gray-600 text-xs">
                      {video.views} views • {video.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
export default Dashboard;
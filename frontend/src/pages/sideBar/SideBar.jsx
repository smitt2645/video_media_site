import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  Menu,
  Home,
  Compass,
  PlaySquare,
  Clock,
  ThumbsUp,
  History,
  Youtube,
  TrendingUp,
  Music,
  Gamepad2,
  Trophy,
  Lightbulb,
  Shirt,
  Podcast,
  Film,
  Settings,
  HelpCircle,
  MessageSquare,
  Search,
  Bell,
  Video,
  BarChart3,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("home");
  const navigate = useNavigate();
  useEffect(() => {
    if (sidebarOpen === true) {
      setSidebarOpen(true);
    } else {
      setSidebarOpen(false);
    }
  }, [sidebarOpen]);

  const sidebarItems = [
    { icon: Home, label: "Home", id: "home" },
    { icon: Compass, label: "Explore", id: "explore" },
    { icon: PlaySquare, label: "Subscriptions", id: "subscriptions" },
  ];

  const libraryItems = [
    { icon: History, label: "History", id: "history" },
    { icon: Clock, label: "Watch Later", id: "watch-later" },
    { icon: ThumbsUp, label: "Liked Videos", id: "liked" },
    { icon: BarChart3, label: "Your Videos", id: "your-videos" },
  ];

  const exploreItems = [
    { icon: TrendingUp, label: "Trending" },
    { icon: Music, label: "Music" },
    { icon: Gamepad2, label: "Gaming" },
    { icon: Trophy, label: "Sports" },
    { icon: Film, label: "Movies" },
  ];
  return (
    <div>
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-white border-r transition-all duration-300 overflow-y-auto`}
      >
        <div className="p-4">
          {/* Main Navigation */}
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full cursor-pointer flex items-center gap-4 px-3 py-2 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? "bg-gray-100 "
                    : "pointer hover:bg-gray-50"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {sidebarOpen && (
                  <span className="font-medium cursor-pointer">
                    {item.label}
                  </span>
                )}
              </button>
            ))}
          </div>

          {sidebarOpen && (
            <>
              {/* Library Section */}
              <div className="mt-6 pt-6 border-t">
                <h3 className="px-3 mb-2 text-sm font-semibold text-gray-600">
                  Library
                </h3>
                <div className="space-y-1">
                  {libraryItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full cursor-pointer flex items-center gap-4 px-3 py-2 rounded-lg transition-colors ${
                        activeTab === item.id
                          ? "bg-gray-100"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Explore Section */}
              <div className="mt-6 pt-6 border-t">
                <h3 className="px-3 mb-2 text-sm font-semibold text-gray-600">
                  Explore
                </h3>
                <div className="space-y-1">
                  {exploreItems.map((item, idx) => (
                    <button
                      key={idx}
                      className="w-full flex items-center cursor-pointer gap-4 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Footer Links */}
              <div className="mt-6 pt-6 border-t">
                <div className="space-y-1 ">
                  <button
                    onClick={() => navigate("/profile-settings")}
                    className="w-full flex cursor-pointer  items-center gap-4 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Settings className="w-5 h-5" />
                    <span>Settings</span>
                  </button>
                  <button className="w-full flex cursor-pointer items-center gap-4 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <HelpCircle className="w-5 h-5" />
                    <span>Help</span>
                  </button>
                  <button className="w-full cursor-pointer flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <MessageSquare className="w-5 h-5" />
                    <span>Feedback</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </aside>
    </div>
  );
};

export default SideBar;

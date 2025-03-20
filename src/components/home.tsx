import React, { useState } from "react";
import Navbar from "./layout/Navbar";
import SidebarContainer from "./sidebar/SidebarContainer";
import CreatePostModal from "./modals/CreatePostModal";
import AuthModal from "./auth/AuthModal";
import { AlertCircle, BookOpen, Megaphone, Users, Plus } from "lucide-react";

const Home: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Mock user data
  const userData = {
    name: "Demo User",
    username: "demo_activist",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=demo_activist",
    followers: 128,
    following: 87,
    activeCauses: 12,
  };

  // Mock categories data
  const categoriesData = [
    {
      id: "environment",
      name: "Environment",
      count: 243,
      icon: <AlertCircle className="h-4 w-4" />,
      color: "text-green-600",
    },
    {
      id: "education",
      name: "Education",
      count: 187,
      icon: <BookOpen className="h-4 w-4" />,
      color: "text-blue-600",
    },
    {
      id: "human-rights",
      name: "Human Rights",
      count: 312,
      icon: <Users className="h-4 w-4" />,
      color: "text-purple-600",
    },
    {
      id: "free-speech",
      name: "Free Speech",
      count: 156,
      icon: <Megaphone className="h-4 w-4" />,
      color: "text-red-600",
    },
  ];

  const handleOpenAuthModal = () => {
    setShowAuthModal(true);
  };

  const handleCloseAuthModal = () => {
    setShowAuthModal(false);
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setShowAuthModal(false);
  };

  const handleCreatePost = () => {
    if (isAuthenticated) {
      setShowCreatePostModal(true);
    } else {
      setShowAuthModal(true);
    }
  };

  const handlePostSubmit = (postData: any) => {
    console.log("New post submitted:", postData);
    setShowCreatePostModal(false);
    // Here you would typically send the post data to your backend
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar
        isAuthenticated={isAuthenticated}
        username={userData.username}
        avatarUrl={userData.avatar}
        notificationCount={5}
        onOpenAuthModal={handleOpenAuthModal}
      />

      <main className="flex flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col md:flex-row">
          {/* Main Feed Area */}
          <div className="flex-1 overflow-hidden">
            <div className="max-w-3xl mx-auto px-4 py-6">
              <h2 className="text-2xl font-bold mb-6">Your Feed</h2>

              {/* Feed filters */}
              <div className="flex space-x-4 mb-6 border-b pb-2">
                <button className="px-4 py-2 text-blue-600 border-b-2 border-blue-600 font-medium">
                  All
                </button>
                <button className="px-4 py-2 text-gray-500 hover:text-gray-700">
                  Dava/Cases
                </button>
                <button className="px-4 py-2 text-gray-500 hover:text-gray-700">
                  Haykır/Shout
                </button>
              </div>

              {/* Feed content */}
              <div className="space-y-6">
                {/* Sample post card */}
                <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-center mb-3">
                      <img
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=user123"
                        alt="User avatar"
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <h3 className="font-medium">Jane Activist</h3>
                        <p className="text-sm text-gray-500">
                          2 hours ago · Environment
                        </p>
                      </div>
                    </div>
                    <p className="mb-3">
                      We need to address the growing plastic pollution in our
                      oceans. Join our cleanup event this weekend!
                    </p>
                    <img
                      src="https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=800&q=80"
                      alt="Ocean pollution"
                      className="w-full h-48 object-cover rounded-md mb-3"
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>42 comments</span>
                      <span>128 reactions</span>
                      <span>18 shares</span>
                    </div>
                  </div>
                  <div className="border-t px-4 py-2 flex space-x-4">
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600">
                      <span>Comment</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600">
                      <span>React</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600">
                      <span>Share</span>
                    </button>
                  </div>
                </div>

                {/* Another sample post */}
                <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-center mb-3">
                      <img
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=user456"
                        alt="User avatar"
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <h3 className="font-medium">Alex Changemaker</h3>
                        <p className="text-sm text-gray-500">
                          Yesterday · Human Rights
                        </p>
                      </div>
                    </div>
                    <p className="mb-3">
                      New petition to support equal access to education in
                      underserved communities. Please sign and share!
                    </p>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>18 comments</span>
                      <span>76 reactions</span>
                      <span>32 shares</span>
                    </div>
                  </div>
                  <div className="border-t px-4 py-2 flex space-x-4">
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600">
                      <span>Comment</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600">
                      <span>React</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600">
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Create post button */}
              <button
                onClick={handleCreatePost}
                className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-colors"
                aria-label="Create new post"
              >
                <Plus className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Sidebar - Hidden on mobile */}
          <div className="hidden md:block md:w-80 lg:w-96 overflow-y-auto">
            <SidebarContainer
              user={isAuthenticated ? userData : undefined}
              categories={categoriesData}
              onCategoryClick={(category) =>
                console.log("Category clicked:", category)
              }
            />
          </div>
        </div>
      </main>

      {/* Modals */}
      <CreatePostModal
        open={showCreatePostModal}
        onOpenChange={setShowCreatePostModal}
        onSubmit={handlePostSubmit}
      />

      <AuthModal
        open={showAuthModal}
        onClose={handleCloseAuthModal}
        defaultTab="login"
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default Home;

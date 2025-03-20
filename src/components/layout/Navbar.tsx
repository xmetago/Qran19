import React from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Bell,
  Menu,
  X,
  Home,
  Users,
  MessageSquare,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  isAuthenticated?: boolean;
  username?: string;
  avatarUrl?: string;
  notificationCount?: number;
  onOpenAuthModal?: () => void;
}

const Navbar = ({
  isAuthenticated = false,
  username = "Guest User",
  avatarUrl = "",
  notificationCount = 0,
  onOpenAuthModal = () => {},
}: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-primary">WhoDoom</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-6">
          <Link
            to="/"
            className="text-sm font-medium text-gray-700 hover:text-primary"
          >
            <Home className="inline-block w-5 h-5 mr-1" />
            Home
          </Link>
          <Link
            to="/explore"
            className="text-sm font-medium text-gray-700 hover:text-primary"
          >
            <BookOpen className="inline-block w-5 h-5 mr-1" />
            Explore
          </Link>
          <Link
            to="/community"
            className="text-sm font-medium text-gray-700 hover:text-primary"
          >
            <Users className="inline-block w-5 h-5 mr-1" />
            Community
          </Link>
          <Link
            to="/messages"
            className="text-sm font-medium text-gray-700 hover:text-primary"
          >
            <MessageSquare className="inline-block w-5 h-5 mr-1" />
            Messages
          </Link>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex md:flex-1 md:max-w-md md:mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search for causes, posts, users..."
              className="pl-10 pr-4 w-full"
            />
          </div>
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              {/* Notifications */}
              <button className="relative p-1 text-gray-700 rounded-full hover:bg-gray-100">
                <Bell className="w-6 h-6" />
                {notificationCount > 0 && (
                  <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full">
                    {notificationCount > 9 ? "9+" : notificationCount}
                  </span>
                )}
              </button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center space-x-2 focus:outline-none">
                    <Avatar>
                      <AvatarImage
                        src={
                          avatarUrl ||
                          `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`
                        }
                        alt={username}
                      />
                      <AvatarFallback>
                        {username.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link to="/profile" className="w-full">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/settings" className="w-full">
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link to="/logout" className="w-full">
                      Logout
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={onOpenAuthModal}>
                Login
              </Button>
              <Button onClick={onOpenAuthModal}>Sign Up</Button>
            </>
          )}

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-2">
          <div className="px-4 py-2">
            <div className="relative w-full mb-4">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search for causes, posts, users..."
                className="pl-10 pr-4 w-full"
              />
            </div>
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                className="flex items-center py-2 text-base font-medium text-gray-700 hover:text-primary"
              >
                <Home className="w-5 h-5 mr-3" />
                Home
              </Link>
              <Link
                to="/explore"
                className="flex items-center py-2 text-base font-medium text-gray-700 hover:text-primary"
              >
                <BookOpen className="w-5 h-5 mr-3" />
                Explore
              </Link>
              <Link
                to="/community"
                className="flex items-center py-2 text-base font-medium text-gray-700 hover:text-primary"
              >
                <Users className="w-5 h-5 mr-3" />
                Community
              </Link>
              <Link
                to="/messages"
                className="flex items-center py-2 text-base font-medium text-gray-700 hover:text-primary"
              >
                <MessageSquare className="w-5 h-5 mr-3" />
                Messages
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;


import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Settings, LogOut, User, Sun, Moon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { AuthDialog } from '@/components/AuthDialog';
import { NotificationPopover } from '@/components/NotificationPopover';
import { CalendarView } from '@/components/CalendarView';
import { Task } from '@/pages/Index';

interface HeaderProps {
  tasks?: Task[];
}

export const Header = ({ tasks = [] }: HeaderProps) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  const getUserInitials = () => {
    if (user?.displayName) {
      return user.displayName.split(' ').map(n => n[0]).join('').toUpperCase();
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return 'U';
  };

  return (
    <header className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-purple-100 dark:border-gray-700 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
                TaskFlow
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Manage • Collaborate • Achieve</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="hover:bg-purple-50 dark:hover:bg-gray-800 transition-colors"
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Sun className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              )}
            </Button>

            {user ? (
              <>
                {/* Notifications */}
                <NotificationPopover tasks={tasks} />
                
                {/* Calendar View */}
                <CalendarView tasks={tasks} />
                
                {/* Profile Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="p-0 hover:ring-2 hover:ring-purple-200 transition-all rounded-full">
                      <Avatar className="cursor-pointer border-2 border-purple-200 hover:border-purple-400 transition-colors h-10 w-10">
                        <AvatarImage src={user.photoURL || ""} />
                        <AvatarFallback className="bg-gradient-to-br from-purple-600 to-pink-600 text-white font-semibold">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl">
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{user.displayName || 'User'}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                    </div>
                    <DropdownMenuItem className="hover:bg-purple-50 dark:hover:bg-gray-700 cursor-pointer">
                      <User className="mr-3 h-4 w-4 text-gray-500" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-purple-50 dark:hover:bg-gray-700 cursor-pointer">
                      <Settings className="mr-3 h-4 w-4 text-gray-500" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={logout}
                      className="hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer text-red-600 dark:text-red-400"
                    >
                      <LogOut className="mr-3 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex space-x-3">
                <Button 
                  variant="ghost" 
                  onClick={() => setShowAuthDialog(true)}
                  className="hover:bg-purple-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium px-6"
                >
                  Sign In
                </Button>
                <Button 
                  onClick={() => setShowAuthDialog(true)}
                  className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 text-white font-medium px-6 shadow-lg hover:shadow-xl transition-all"
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <AuthDialog open={showAuthDialog} onOpenChange={setShowAuthDialog} />
    </header>
  );
};

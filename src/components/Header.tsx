
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Bell, Settings, LogOut, User, Check, Clock, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notifications] = useState([
    { id: 1, title: 'Task Due Soon', message: 'Complete project proposal by 5 PM', type: 'warning', time: '2 minutes ago' },
    { id: 2, title: 'Task Completed', message: 'John marked "Database setup" as complete', type: 'success', time: '1 hour ago' },
    { id: 3, title: 'New Shared Task', message: 'Sarah shared "UI Design Review" with you', type: 'info', time: '3 hours ago' }
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'success': return <Check className="h-4 w-4 text-green-500" />;
      default: return <Clock className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <header className="bg-white/95 backdrop-blur-xl border-b border-purple-100 sticky top-0 z-50 shadow-sm">
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
              <p className="text-xs text-gray-500 font-medium">Manage • Collaborate • Achieve</p>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            {isLoggedIn ? (
              <>
                {/* Notifications Popover */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="sm" className="relative hover:bg-purple-50 transition-colors">
                      <Bell className="h-5 w-5 text-gray-600" />
                      {notifications.length > 0 && (
                        <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-2 border-white">
                          {notifications.length}
                        </Badge>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-0 bg-white border border-gray-200 shadow-xl" align="end">
                    <div className="p-4 border-b border-gray-100">
                      <h3 className="font-semibold text-gray-900">Notifications</h3>
                      <p className="text-sm text-gray-500">{notifications.length} new notifications</p>
                    </div>
                    <div className="max-h-80 overflow-auto">
                      {notifications.map((notification) => (
                        <div key={notification.id} className="p-4 hover:bg-gray-50 border-b border-gray-50 last:border-b-0 transition-colors">
                          <div className="flex items-start space-x-3">
                            {getNotificationIcon(notification.type)}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                              <p className="text-sm text-gray-600">{notification.message}</p>
                              <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 border-t border-gray-100">
                      <Button variant="ghost" className="w-full text-sm text-purple-600 hover:bg-purple-50">
                        View all notifications
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
                
                {/* Profile Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="p-0 hover:ring-2 hover:ring-purple-200 transition-all rounded-full">
                      <Avatar className="cursor-pointer border-2 border-purple-200 hover:border-purple-400 transition-colors h-10 w-10">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback className="bg-gradient-to-br from-purple-600 to-pink-600 text-white font-semibold">
                          JD
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-white border border-gray-200 shadow-xl">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">John Doe</p>
                      <p className="text-xs text-gray-500">john.doe@example.com</p>
                    </div>
                    <DropdownMenuItem className="hover:bg-purple-50 cursor-pointer">
                      <User className="mr-3 h-4 w-4 text-gray-500" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-purple-50 cursor-pointer">
                      <Settings className="mr-3 h-4 w-4 text-gray-500" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => setIsLoggedIn(false)}
                      className="hover:bg-red-50 cursor-pointer text-red-600"
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
                  onClick={() => setIsLoggedIn(true)}
                  className="hover:bg-purple-50 text-gray-700 font-medium px-6"
                >
                  Sign In
                </Button>
                <Button 
                  onClick={() => setIsLoggedIn(true)}
                  className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 text-white font-medium px-6 shadow-lg hover:shadow-xl transition-all"
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

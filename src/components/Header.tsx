
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Bell, Settings, LogOut, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-lg border-b border-purple-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                TaskFlow
              </h1>
              <p className="text-xs text-gray-500">Manage • Collaborate • Achieve</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600">
                    3
                  </Badge>
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer border-2 border-purple-200 hover:border-purple-400 transition-colors">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback className="bg-gradient-to-br from-purple-600 to-pink-600 text-white">
                        JD
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setIsLoggedIn(false)}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex space-x-2">
                <Button 
                  variant="ghost" 
                  onClick={() => setIsLoggedIn(true)}
                  className="hover:bg-purple-50"
                >
                  Sign In
                </Button>
                <Button 
                  onClick={() => setIsLoggedIn(true)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
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

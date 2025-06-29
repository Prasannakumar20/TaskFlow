
import { useState, useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Clock, AlertTriangle } from 'lucide-react';
import { Task } from '@/pages/Index';
import { format, isToday, isTomorrow, differenceInDays } from 'date-fns';

interface NotificationPopoverProps {
  tasks: Task[];
}

export const NotificationPopover = ({ tasks }: NotificationPopoverProps) => {
  const [notifications, setNotifications] = useState<Array<{
    id: string;
    type: 'overdue' | 'due-today' | 'due-tomorrow' | 'due-soon';
    message: string;
    task: Task;
  }>>([]);

  useEffect(() => {
    const now = new Date();
    const newNotifications = tasks
      .filter(task => task.dueDate && task.status !== 'completed')
      .map(task => {
        const dueDate = task.dueDate!;
        const daysUntilDue = differenceInDays(dueDate, now);

        if (daysUntilDue < 0) {
          return {
            id: task.id,
            type: 'overdue' as const,
            message: `"${task.title}" is ${Math.abs(daysUntilDue)} day(s) overdue`,
            task
          };
        } else if (isToday(dueDate)) {
          return {
            id: task.id,
            type: 'due-today' as const,
            message: `"${task.title}" is due today`,
            task
          };
        } else if (isTomorrow(dueDate)) {
          return {
            id: task.id,
            type: 'due-tomorrow' as const,
            message: `"${task.title}" is due tomorrow`,
            task
          };
        } else if (daysUntilDue <= 3) {
          return {
            id: task.id,
            type: 'due-soon' as const,
            message: `"${task.title}" is due in ${daysUntilDue} day(s)`,
            task
          };
        }
        return null;
      })
      .filter(Boolean) as typeof notifications;

    setNotifications(newNotifications);
  }, [tasks]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'overdue': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'due-today': return <Clock className="h-4 w-4 text-orange-500" />;
      default: return <Clock className="h-4 w-4 text-blue-500" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'overdue': return 'bg-red-50 border-red-200';
      case 'due-today': return 'bg-orange-50 border-orange-200';
      case 'due-tomorrow': return 'bg-yellow-50 border-yellow-200';
      default: return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="relative hover:bg-purple-50 transition-colors">
          <Bell className="h-5 w-5 text-gray-600" />
          {notifications.length > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 border-2 border-white">
              {notifications.length}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 bg-white border border-gray-200 shadow-xl" align="end">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Task Notifications</h3>
          <p className="text-sm text-gray-500">{notifications.length} notifications</p>
        </div>
        <div className="max-h-80 overflow-auto">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              <Bell className="h-8 w-8 mx-auto mb-2 text-gray-300" />
              <p>No notifications</p>
              <p className="text-xs">All tasks are on track!</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div key={notification.id} className={`p-4 border-b border-gray-50 last:border-b-0 ${getNotificationColor(notification.type)}`}>
                <div className="flex items-start space-x-3">
                  {getNotificationIcon(notification.type)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Priority: {notification.task.priority} | Due: {format(notification.task.dueDate!, 'MMM d, yyyy')}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {notifications.length > 0 && (
          <div className="p-4 border-t border-gray-100">
            <p className="text-xs text-center text-gray-500">
              Stay on top of your tasks!
            </p>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

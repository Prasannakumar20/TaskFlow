
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon } from 'lucide-react';
import { Task } from '@/pages/Index';
import { format, isSameDay } from 'date-fns';

interface CalendarViewProps {
  tasks: Task[];
}

export const CalendarView = ({ tasks }: CalendarViewProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const getTasksForDate = (date: Date) => {
    return tasks.filter(task => task.dueDate && isSameDay(task.dueDate, date));
  };

  const getDatesWithTasks = () => {
    return tasks
      .filter(task => task.dueDate)
      .map(task => task.dueDate!)
      .filter((date, index, self) => 
        self.findIndex(d => isSameDay(d, date)) === index
      );
  };

  const selectedDateTasks = selectedDate ? getTasksForDate(selectedDate) : [];
  const datesWithTasks = getDatesWithTasks();

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="hover:bg-purple-50 transition-colors">
          <CalendarIcon className="h-5 w-5 text-gray-600" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 bg-white border border-gray-200 shadow-xl" align="end">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Task Calendar</h3>
          <p className="text-sm text-gray-500">View tasks by date</p>
        </div>
        
        <div className="p-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="pointer-events-auto"
            modifiers={{
              hasTask: datesWithTasks
            }}
            modifiersStyles={{
              hasTask: {
                backgroundColor: 'rgb(147 51 234 / 0.1)',
                color: 'rgb(147 51 234)',
                fontWeight: 'bold'
              }
            }}
          />
        </div>

        {selectedDate && (
          <div className="border-t border-gray-100">
            <div className="p-4">
              <h4 className="font-medium text-gray-900 mb-3">
                Tasks for {format(selectedDate, 'MMM d, yyyy')}
              </h4>
              {selectedDateTasks.length === 0 ? (
                <p className="text-sm text-gray-500">No tasks scheduled for this date</p>
              ) : (
                <div className="space-y-2">
                  {selectedDateTasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{task.title}</p>
                        <p className="text-xs text-gray-500">{task.status.replace('-', ' ')}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${getPriorityColor(task.priority)}`} />
                        <Badge variant="outline" className="text-xs">
                          {task.priority}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

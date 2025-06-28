
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Calendar, MoreHorizontal, Edit, Trash2, Share, Clock, Users } from 'lucide-react';
import { Task } from '@/pages/Index';
import { format } from 'date-fns';

interface TaskCardProps {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
  onStatusChange: (status: Task['status']) => void;
}

export const TaskCard = ({ task, onEdit, onDelete, onStatusChange }: TaskCardProps) => {
  const priorityColors = {
    high: 'bg-red-100 text-red-800 border-red-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    low: 'bg-green-100 text-green-800 border-green-200'
  };

  const statusColors = {
    todo: 'bg-gray-100 text-gray-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800'
  };

  const isOverdue = task.dueDate && new Date() > task.dueDate && task.status !== 'completed';

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-purple-700 transition-colors">
              {task.title}
            </h4>
            <p className="text-sm text-gray-600 line-clamp-2">{task.description}</p>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onEdit}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share className="mr-2 h-4 w-4" />
                Share
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onDelete} className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Badge className={priorityColors[task.priority]}>
              {task.priority} priority
            </Badge>
            <Badge className={statusColors[task.status]}>
              {task.status.replace('-', ' ')}
            </Badge>
          </div>

          {task.dueDate && (
            <div className={`flex items-center text-sm ${isOverdue ? 'text-red-600' : 'text-gray-600'}`}>
              <Calendar className="mr-1 h-4 w-4" />
              {format(task.dueDate, 'MMM d, yyyy')}
              {isOverdue && <span className="ml-1 text-xs">(Overdue)</span>}
            </div>
          )}

          {task.sharedWith.length > 0 && (
            <div className="flex items-center text-sm text-gray-600">
              <Users className="mr-1 h-4 w-4" />
              Shared with {task.sharedWith.length} people
            </div>
          )}

          {task.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {task.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center text-xs text-gray-500">
              <Clock className="mr-1 h-3 w-3" />
              {format(task.createdAt, 'MMM d')}
            </div>
            
            <div className="flex gap-1">
              {task.status !== 'todo' && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onStatusChange('todo')}
                  className="text-xs"
                >
                  To Do
                </Button>
              )}
              {task.status !== 'in-progress' && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onStatusChange('in-progress')}
                  className="text-xs"
                >
                  In Progress
                </Button>
              )}
              {task.status !== 'completed' && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onStatusChange('completed')}
                  className="text-xs"
                >
                  Complete
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

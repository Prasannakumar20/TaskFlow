
import { TaskCard } from '@/components/TaskCard';
import { Task } from '@/pages/Index';

interface TaskBoardProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onStatusChange: (taskId: string, status: Task['status']) => void;
}

export const TaskBoard = ({ tasks, onEditTask, onDeleteTask, onStatusChange }: TaskBoardProps) => {
  const todoTasks = tasks.filter(task => task.status === 'todo');
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress');
  const completedTasks = tasks.filter(task => task.status === 'completed');

  const columns = [
    { id: 'todo', title: 'To Do', tasks: todoTasks, color: 'from-orange-500 to-yellow-500' },
    { id: 'in-progress', title: 'In Progress', tasks: inProgressTasks, color: 'from-blue-500 to-cyan-500' },
    { id: 'completed', title: 'Completed', tasks: completedTasks, color: 'from-green-500 to-emerald-500' }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((column) => (
          <div key={column.id} className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className={`text-lg font-semibold bg-gradient-to-r ${column.color} bg-clip-text text-transparent`}>
                {column.title}
              </h3>
              <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${column.color} text-white`}>
                {column.tasks.length}
              </span>
            </div>
            
            <div className="space-y-3 min-h-[200px]">
              {column.tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={() => onEditTask(task)}
                  onDelete={() => onDeleteTask(task.id)}
                  onStatusChange={(status) => onStatusChange(task.id, status)}
                />
              ))}
              
              {column.tasks.length === 0 && (
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
                  <p className="text-gray-400">No tasks in {column.title.toLowerCase()}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

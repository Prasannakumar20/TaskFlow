
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Clock, AlertCircle, Users } from 'lucide-react';
import { Task } from '@/pages/Index';

interface TaskStatsProps {
  tasks: Task[];
}

export const TaskStats = ({ tasks }: TaskStatsProps) => {
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress').length;
  const todoTasks = tasks.filter(task => task.status === 'todo').length;
  const sharedTasks = tasks.filter(task => task.sharedWith.length > 0).length;

  const stats = [
    {
      label: 'Completed',
      value: completedTasks,
      icon: CheckCircle,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      label: 'In Progress',
      value: inProgressTasks,
      icon: Clock,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      label: 'To Do',
      value: todoTasks,
      icon: AlertCircle,
      color: 'from-orange-500 to-yellow-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700'
    },
    {
      label: 'Shared',
      value: sharedTasks,
      icon: Users,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label} className={`${stat.bgColor} border-0 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${stat.textColor}`}>
                    {stat.label}
                  </p>
                  <p className={`text-3xl font-bold ${stat.textColor} mt-1`}>
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-full bg-gradient-to-br ${stat.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

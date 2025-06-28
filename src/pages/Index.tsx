
import { useState, useEffect } from 'react';
import { TaskBoard } from '@/components/TaskBoard';
import { TaskForm } from '@/components/TaskForm';
import { TaskFilters } from '@/components/TaskFilters';
import { TaskStats } from '@/components/TaskStats';
import { Header } from '@/components/Header';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { useTasks } from '@/hooks/useTasks';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'completed';
  dueDate: Date | null;
  createdAt: Date;
  sharedWith: string[];
  tags: string[];
}

const Index = () => {
  const { user, loading: authLoading } = useAuth();
  const { tasks, loading: tasksLoading, createTask, updateTask, deleteTask, shareTaskViaEmail } = useTasks();
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter tasks based on current filters
  useEffect(() => {
    let filtered = tasks;

    if (filterStatus !== 'all') {
      filtered = filtered.filter(task => task.status === filterStatus);
    }

    if (filterPriority !== 'all') {
      filtered = filtered.filter(task => task.priority === filterPriority);
    }

    if (searchQuery) {
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredTasks(filtered);
  }, [tasks, filterStatus, filterPriority, searchQuery]);

  const handleCreateTask = async (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    await createTask(taskData);
    setIsFormOpen(false);
  };

  const handleUpdateTask = async (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    if (!editingTask) return;
    await updateTask(editingTask.id, taskData);
    setEditingTask(null);
  };

  const handleDeleteTask = async (taskId: string) => {
    await deleteTask(taskId);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleStatusChange = async (taskId: string, newStatus: Task['status']) => {
    await updateTask(taskId, { status: newStatus });
  };

  const handleShareTask = async (task: Task, emails: string[]) => {
    await shareTaskViaEmail(task, emails);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg animate-pulse mx-auto mb-4">
            <span className="text-white font-bold text-2xl">T</span>
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-8">
              <span className="text-white font-bold text-4xl">T</span>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Welcome to TaskFlow
            </h1>
            <p className="text-gray-600 mb-8">
              Sign in with your Google account to start managing tasks, collaborating with your team, and staying organized.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10">
        <Header />
        
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Task Management
            </h1>
            <p className="text-gray-600">Organize, prioritize, and collaborate on your tasks in real-time</p>
          </div>

          <TaskStats tasks={tasks} />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            <div className="lg:col-span-1">
              <TaskFilters
                filterStatus={filterStatus}
                filterPriority={filterPriority}
                searchQuery={searchQuery}
                onStatusChange={setFilterStatus}
                onPriorityChange={setFilterPriority}
                onSearchChange={setSearchQuery}
              />
            </div>
            
            <div className="lg:col-span-3">
              {tasksLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                </div>
              ) : (
                <TaskBoard
                  tasks={filteredTasks}
                  onEditTask={handleEditTask}
                  onDeleteTask={handleDeleteTask}
                  onStatusChange={handleStatusChange}
                  onShareTask={handleShareTask}
                />
              )}
            </div>
          </div>
        </div>

        {/* Floating Action Button */}
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button
              size="lg"
              className="fixed bottom-8 right-8 rounded-full w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110"
            >
              <Plus className="h-8 w-8" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <TaskForm
              onSubmit={handleCreateTask}
              onClose={() => setIsFormOpen(false)}
            />
          </DialogContent>
        </Dialog>

        {/* Edit Task Dialog */}
        <Dialog open={!!editingTask} onOpenChange={() => setEditingTask(null)}>
          <DialogContent className="max-w-2xl">
            {editingTask && (
              <TaskForm
                task={editingTask}
                onSubmit={handleUpdateTask}
                onClose={() => setEditingTask(null)}
                isEditing
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Index;

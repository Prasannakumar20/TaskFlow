
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Task } from '@/pages/Index';
import { toast } from '@/hooks/use-toast';

export const useTasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch tasks from Supabase
  const fetchTasks = async () => {
    if (!user) {
      setTasks([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .or(`user_id.eq.${user.id},shared_with.cs.{${user.email}}`);

      if (error) throw error;

      const formattedTasks: Task[] = data.map(task => ({
        id: task.id,
        title: task.title,
        description: task.description || '',
        priority: task.priority,
        status: task.status,
        dueDate: task.due_date ? new Date(task.due_date) : null,
        createdAt: new Date(task.created_at),
        sharedWith: task.shared_with || [],
        tags: task.tags || []
      }));

      setTasks(formattedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast({
        title: "Error",
        description: "Failed to fetch tasks.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Create task
  const createTask = async (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert({
          title: taskData.title,
          description: taskData.description,
          priority: taskData.priority,
          status: taskData.status,
          due_date: taskData.dueDate?.toISOString(),
          shared_with: taskData.sharedWith,
          tags: taskData.tags,
          user_id: user.id
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Task created successfully!",
      });

      fetchTasks(); // Refresh tasks
    } catch (error) {
      console.error('Error creating task:', error);
      toast({
        title: "Error",
        description: "Failed to create task.",
        variant: "destructive",
      });
    }
  };

  // Update task
  const updateTask = async (taskId: string, taskData: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('tasks')
        .update({
          title: taskData.title,
          description: taskData.description,
          priority: taskData.priority,
          status: taskData.status,
          due_date: taskData.dueDate?.toISOString(),
          shared_with: taskData.sharedWith,
          tags: taskData.tags
        })
        .eq('id', taskId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Task updated successfully!",
      });

      fetchTasks(); // Refresh tasks
    } catch (error) {
      console.error('Error updating task:', error);
      toast({
        title: "Error",
        description: "Failed to update task.",
        variant: "destructive",
      });
    }
  };

  // Delete task
  const deleteTask = async (taskId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Task deleted successfully!",
      });

      fetchTasks(); // Refresh tasks
    } catch (error) {
      console.error('Error deleting task:', error);
      toast({
        title: "Error",
        description: "Failed to delete task.",
        variant: "destructive",
      });
    }
  };

  // Share task via email
  const shareTaskViaEmail = async (task: Task, emails: string[]) => {
    try {
      // Update task with new shared emails
      const updatedSharedWith = [...new Set([...task.sharedWith, ...emails])];
      await updateTask(task.id, { sharedWith: updatedSharedWith });

      // Send email notifications (this would typically be done via Supabase Edge Functions)
      toast({
        title: "Task Shared",
        description: `Task shared with ${emails.join(', ')}`,
      });
    } catch (error) {
      console.error('Error sharing task:', error);
      toast({
        title: "Error",
        description: "Failed to share task.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchTasks();

    // Set up real-time subscription
    const channel = supabase
      .channel('tasks')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'tasks' },
        () => {
          fetchTasks(); // Refresh tasks on any change
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  return {
    tasks,
    loading,
    createTask,
    updateTask,
    deleteTask,
    shareTaskViaEmail,
    refreshTasks: fetchTasks
  };
};

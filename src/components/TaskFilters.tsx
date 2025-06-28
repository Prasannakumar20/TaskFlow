
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';

interface TaskFiltersProps {
  filterStatus: string;
  filterPriority: string;
  searchQuery: string;
  onStatusChange: (status: string) => void;
  onPriorityChange: (priority: string) => void;
  onSearchChange: (query: string) => void;
}

export const TaskFilters = ({
  filterStatus,
  filterPriority,
  searchQuery,
  onStatusChange,
  onPriorityChange,
  onSearchChange
}: TaskFiltersProps) => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Filter className="h-5 w-5 text-purple-600" />
          Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="search" className="text-sm font-medium text-gray-700 mb-2 block">
            Search Tasks
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="search"
              placeholder="Search by title, description, or tags..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 border-purple-200 focus:border-purple-400"
            />
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">
            Status
          </Label>
          <Select value={filterStatus} onValueChange={onStatusChange}>
            <SelectTrigger className="border-purple-200 focus:border-purple-400">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="todo">To Do</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">
            Priority
          </Label>
          <Select value={filterPriority} onValueChange={onPriorityChange}>
            <SelectTrigger className="border-purple-200 focus:border-purple-400">
              <SelectValue placeholder="Filter by priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="high">High Priority</SelectItem>
              <SelectItem value="medium">Medium Priority</SelectItem>
              <SelectItem value="low">Low Priority</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Filter, 
  SortAsc, 
  SortDesc, 
  Trash2, 
  CheckCircle2, 
  Circle, 
  List,
  Calendar,
  Flag
} from 'lucide-react';
import { useTodos } from '../../contexts/TodoContext';
import TodoItem from './TodoItem';

const TodoList = () => {
  const { 
    todos, 
    isLoading, 
    filter, 
    sortBy, 
    order, 
    setFilter, 
    setSort, 
    clearCompleted 
  } = useTodos();

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleSortChange = (newSortBy) => {
    if (sortBy === newSortBy) {
      // Toggle order if same sort field
      setSort(newSortBy, order === 'desc' ? 'asc' : 'desc');
    } else {
      setSort(newSortBy, 'desc');
    }
  };

  const handleClearCompleted = async () => {
    const completedCount = todos.filter(todo => todo.completed).length;
    if (completedCount === 0) return;
    
    if (window.confirm(`Are you sure you want to delete ${completedCount} completed todo(s)?`)) {
      await clearCompleted();
    }
  };

  const getFilterStats = () => {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const active = total - completed;
    return { total, completed, active };
  };

  const stats = getFilterStats();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filter and Sort Controls */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center justify-between">
            <div className="flex items-center">
              <List className="h-5 w-5 mr-2" />
              Your Todos
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Badge variant="outline">{stats.total} total</Badge>
              <Badge variant="outline">{stats.active} active</Badge>
              <Badge variant="outline">{stats.completed} completed</Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Filter Buttons */}
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <div className="flex space-x-1">
                <Button
                  size="sm"
                  variant={filter === 'all' ? 'default' : 'outline'}
                  onClick={() => handleFilterChange('all')}
                >
                  <Circle className="h-3 w-3 mr-1" />
                  All
                </Button>
                <Button
                  size="sm"
                  variant={filter === 'active' ? 'default' : 'outline'}
                  onClick={() => handleFilterChange('active')}
                >
                  <Circle className="h-3 w-3 mr-1" />
                  Active
                </Button>
                <Button
                  size="sm"
                  variant={filter === 'completed' ? 'default' : 'outline'}
                  onClick={() => handleFilterChange('completed')}
                >
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Completed
                </Button>
              </div>
            </div>

            {/* Sort and Actions */}
            <div className="flex items-center space-x-2">
              {/* Sort Buttons */}
              <div className="flex space-x-1">
                <Button
                  size="sm"
                  variant={sortBy === 'createdAt' ? 'default' : 'outline'}
                  onClick={() => handleSortChange('createdAt')}
                >
                  <Calendar className="h-3 w-3 mr-1" />
                  Date
                  {sortBy === 'createdAt' && (
                    order === 'desc' ? <SortDesc className="h-3 w-3 ml-1" /> : <SortAsc className="h-3 w-3 ml-1" />
                  )}
                </Button>
                <Button
                  size="sm"
                  variant={sortBy === 'priority' ? 'default' : 'outline'}
                  onClick={() => handleSortChange('priority')}
                >
                  <Flag className="h-3 w-3 mr-1" />
                  Priority
                  {sortBy === 'priority' && (
                    order === 'desc' ? <SortDesc className="h-3 w-3 ml-1" /> : <SortAsc className="h-3 w-3 ml-1" />
                  )}
                </Button>
              </div>

              {/* Clear Completed */}
              {stats.completed > 0 && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleClearCompleted}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  Clear Completed
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Todo Items */}
      <div className="space-y-3">
        {todos.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <div className="text-gray-500">
                <Circle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">No todos found</h3>
                <p className="text-sm">
                  {filter === 'all' 
                    ? "Start by adding your first todo above!"
                    : filter === 'active'
                    ? "No active todos. Great job!"
                    : "No completed todos yet."
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          todos.map(todo => (
            <TodoItem key={todo._id} todo={todo} />
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList;


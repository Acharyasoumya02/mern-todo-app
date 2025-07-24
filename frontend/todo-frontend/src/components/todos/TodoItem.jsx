import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Check, 
  X, 
  Edit2, 
  Trash2, 
  Save, 
  Calendar,
  AlertCircle,
  Circle
} from 'lucide-react';
import { useTodos } from '../../contexts/TodoContext';

const TodoItem = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: todo.title,
    description: todo.description || '',
    priority: todo.priority,
    dueDate: todo.dueDate ? new Date(todo.dueDate).toISOString().split('T')[0] : '',
  });

  const { updateTodo, deleteTodo, toggleTodo } = useTodos();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!editData.title.trim()) return;
    
    const result = await updateTodo(todo._id, {
      ...editData,
      dueDate: editData.dueDate || null,
    });
    
    if (result.success) {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditData({
      title: todo.title,
      description: todo.description || '',
      priority: todo.priority,
      dueDate: todo.dueDate ? new Date(todo.dueDate).toISOString().split('T')[0] : '',
    });
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      await deleteTodo(todo._id);
    }
  };

  const handleToggle = async () => {
    await toggleTodo(todo._id);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="h-3 w-3" />;
      case 'medium':
        return <Circle className="h-3 w-3" />;
      case 'low':
        return <Circle className="h-3 w-3" />;
      default:
        return <Circle className="h-3 w-3" />;
    }
  };

  const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;

  return (
    <Card className={`transition-all duration-200 hover-lift animate-slide-up ${todo.completed ? 'opacity-75' : ''} ${isOverdue ? 'border-red-300' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          {/* Checkbox */}
          <button
            onClick={handleToggle}
            className={`mt-1 flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 hover:scale-110 ${
              todo.completed
                ? 'bg-green-500 border-green-500 text-white animate-scale-in'
                : 'border-gray-300 hover:border-green-400 hover:bg-green-50'
            }`}
          >
            {todo.completed && <Check className="h-3 w-3 animate-bounce-in" />}
          </button>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="space-y-3">
                <Input
                  value={editData.title}
                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  placeholder="Todo title"
                  className="font-medium"
                />
                <Textarea
                  value={editData.description}
                  onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                  placeholder="Description (optional)"
                  rows={2}
                />
                <div className="flex space-x-2">
                  <select
                    value={editData.priority}
                    onChange={(e) => setEditData({ ...editData, priority: e.target.value })}
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                  <Input
                    type="date"
                    value={editData.dueDate}
                    onChange={(e) => setEditData({ ...editData, dueDate: e.target.value })}
                    className="w-auto"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" onClick={handleSave}>
                    <Save className="h-3 w-3 mr-1" />
                    Save
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleCancel}>
                    <X className="h-3 w-3 mr-1" />
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className={`font-medium ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                    {todo.title}
                  </h3>
                  <Badge variant="outline" className={`text-xs ${getPriorityColor(todo.priority)}`}>
                    {getPriorityIcon(todo.priority)}
                    <span className="ml-1 capitalize">{todo.priority}</span>
                  </Badge>
                </div>
                
                {todo.description && (
                  <p className={`text-sm text-gray-600 mb-2 ${todo.completed ? 'line-through' : ''}`}>
                    {todo.description}
                  </p>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    {todo.dueDate && (
                      <div className={`flex items-center space-x-1 ${isOverdue ? 'text-red-600' : ''}`}>
                        <Calendar className="h-3 w-3" />
                        <span>
                          {new Date(todo.dueDate).toLocaleDateString()}
                          {isOverdue && ' (Overdue)'}
                        </span>
                      </div>
                    )}
                    <span>
                      Created {new Date(todo.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  {!todo.completed && (
                    <div className="flex space-x-1">
                      <Button size="sm" variant="ghost" onClick={handleEdit}>
                        <Edit2 className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={handleDelete} className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TodoItem;


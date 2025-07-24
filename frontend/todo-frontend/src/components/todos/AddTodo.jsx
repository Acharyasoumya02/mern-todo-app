import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Calendar, Flag } from 'lucide-react';
import { useTodos } from '../../contexts/TodoContext';

const AddTodo = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
  });

  const { createTodo } = useTodos();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) return;
    
    const result = await createTodo({
      ...formData,
      dueDate: formData.dueDate || null,
    });
    
    if (result.success) {
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: '',
      });
      setIsExpanded(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleQuickAdd = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    
    const result = await createTodo({
      title: formData.title,
      priority: 'medium',
    });
    
    if (result.success) {
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: '',
      });
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <Plus className="h-5 w-5 mr-2" />
          Add New Todo
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={isExpanded ? handleSubmit : handleQuickAdd}>
          <div className="space-y-4">
            {/* Title Input */}
            <div className="flex space-x-2">
              <Input
                name="title"
                placeholder="What needs to be done?"
                value={formData.title}
                onChange={handleChange}
                onFocus={() => setIsExpanded(true)}
                className="flex-1"
              />
              {!isExpanded && (
                <Button type="submit" disabled={!formData.title.trim()}>
                  <Plus className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Expanded Form */}
            {isExpanded && (
              <>
                <Textarea
                  name="description"
                  placeholder="Description (optional)"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                />
                
                <div className="flex space-x-4">
                  {/* Priority */}
                  <div className="flex items-center space-x-2">
                    <Flag className="h-4 w-4 text-gray-500" />
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="low">Low Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="high">High Priority</option>
                    </select>
                  </div>
                  
                  {/* Due Date */}
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <Input
                      type="date"
                      name="dueDate"
                      value={formData.dueDate}
                      onChange={handleChange}
                      className="w-auto"
                    />
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button type="submit" disabled={!formData.title.trim()}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Todo
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setIsExpanded(false);
                      setFormData({
                        title: '',
                        description: '',
                        priority: 'medium',
                        dueDate: '',
                      });
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddTodo;


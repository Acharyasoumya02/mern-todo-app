import { useAuth } from '../contexts/AuthContext';
import { TodoProvider } from '../contexts/TodoContext';
import { Button } from '@/components/ui/button';
import { LogOut, User, CheckSquare } from 'lucide-react';
import AddTodo from './todos/AddTodo';
import TodoList from './todos/TodoList';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <TodoProvider>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <CheckSquare className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-semibold text-gray-900">
                  MERN ToDo App
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{user?.name}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  className="flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </div>
            </div>
          </div>
        </header>
        
        <main className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {/* Welcome Section */}
            <div className="text-center py-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Welcome back, {user?.name}!
              </h2>
              <p className="text-gray-600">
                Manage your tasks efficiently with our MERN stack todo application.
              </p>
            </div>

            {/* Add Todo Section */}
            <AddTodo />

            {/* Todo List Section */}
            <TodoList />
          </div>
        </main>
      </div>
    </TodoProvider>
  );
};

export default Dashboard;


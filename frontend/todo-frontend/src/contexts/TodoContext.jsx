import { createContext, useContext, useReducer, useEffect } from 'react';
import { todoAPI } from '../lib/api';
import toast from 'react-hot-toast';

// Initial state
const initialState = {
  todos: [],
  isLoading: false,
  filter: 'all', // all, active, completed
  sortBy: 'createdAt',
  order: 'desc',
};

// Action types
const TODO_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_TODOS: 'SET_TODOS',
  ADD_TODO: 'ADD_TODO',
  UPDATE_TODO: 'UPDATE_TODO',
  DELETE_TODO: 'DELETE_TODO',
  SET_FILTER: 'SET_FILTER',
  SET_SORT: 'SET_SORT',
  CLEAR_COMPLETED: 'CLEAR_COMPLETED',
};

// Reducer function
const todoReducer = (state, action) => {
  switch (action.type) {
    case TODO_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case TODO_ACTIONS.SET_TODOS:
      return {
        ...state,
        todos: action.payload,
        isLoading: false,
      };
    case TODO_ACTIONS.ADD_TODO:
      return {
        ...state,
        todos: [action.payload, ...state.todos],
      };
    case TODO_ACTIONS.UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo._id === action.payload._id ? action.payload : todo
        ),
      };
    case TODO_ACTIONS.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo._id !== action.payload),
      };
    case TODO_ACTIONS.SET_FILTER:
      return {
        ...state,
        filter: action.payload,
      };
    case TODO_ACTIONS.SET_SORT:
      return {
        ...state,
        sortBy: action.payload.sortBy,
        order: action.payload.order,
      };
    case TODO_ACTIONS.CLEAR_COMPLETED:
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      };
    default:
      return state;
  }
};

// Create context
const TodoContext = createContext();

// Todo provider component
export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  // Fetch todos
  const fetchTodos = async () => {
    try {
      dispatch({ type: TODO_ACTIONS.SET_LOADING, payload: true });
      const params = {
        sortBy: state.sortBy,
        order: state.order,
      };
      
      if (state.filter === 'active') {
        params.completed = false;
      } else if (state.filter === 'completed') {
        params.completed = true;
      }

      const response = await todoAPI.getTodos(params);
      dispatch({ type: TODO_ACTIONS.SET_TODOS, payload: response.data.data });
    } catch (error) {
      dispatch({ type: TODO_ACTIONS.SET_LOADING, payload: false });
      toast.error('Failed to fetch todos');
    }
  };

  // Create todo
  const createTodo = async (todoData) => {
    try {
      const response = await todoAPI.createTodo(todoData);
      dispatch({ type: TODO_ACTIONS.ADD_TODO, payload: response.data.data });
      toast.success('Todo created successfully');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create todo';
      toast.error(message);
      return { success: false, message };
    }
  };

  // Update todo
  const updateTodo = async (id, todoData) => {
    try {
      const response = await todoAPI.updateTodo(id, todoData);
      dispatch({ type: TODO_ACTIONS.UPDATE_TODO, payload: response.data.data });
      toast.success('Todo updated successfully');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update todo';
      toast.error(message);
      return { success: false, message };
    }
  };

  // Toggle todo completion
  const toggleTodo = async (id) => {
    try {
      const response = await todoAPI.toggleTodo(id);
      dispatch({ type: TODO_ACTIONS.UPDATE_TODO, payload: response.data.data });
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to toggle todo';
      toast.error(message);
      return { success: false, message };
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      await todoAPI.deleteTodo(id);
      dispatch({ type: TODO_ACTIONS.DELETE_TODO, payload: id });
      toast.success('Todo deleted successfully');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete todo';
      toast.error(message);
      return { success: false, message };
    }
  };

  // Clear completed todos
  const clearCompleted = async () => {
    try {
      await todoAPI.deleteCompleted();
      dispatch({ type: TODO_ACTIONS.CLEAR_COMPLETED });
      toast.success('Completed todos cleared');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to clear completed todos';
      toast.error(message);
      return { success: false, message };
    }
  };

  // Set filter
  const setFilter = (filter) => {
    dispatch({ type: TODO_ACTIONS.SET_FILTER, payload: filter });
  };

  // Set sort
  const setSort = (sortBy, order) => {
    dispatch({ type: TODO_ACTIONS.SET_SORT, payload: { sortBy, order } });
  };

  // Fetch todos when filter or sort changes
  useEffect(() => {
    fetchTodos();
  }, [state.filter, state.sortBy, state.order]);

  const value = {
    ...state,
    fetchTodos,
    createTodo,
    updateTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    setFilter,
    setSort,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

// Custom hook to use todo context
export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return context;
};

export default TodoContext;


const express = require('express');
const { body, validationResult } = require('express-validator');
const Todo = require('../models/Todo');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/todos
// @desc    Get all todos for the authenticated user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { completed, priority, sortBy = 'createdAt', order = 'desc' } = req.query;
    
    // Build filter object
    const filter = { user: req.user._id };
    
    if (completed !== undefined) {
      filter.completed = completed === 'true';
    }
    
    if (priority) {
      filter.priority = priority;
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = order === 'desc' ? -1 : 1;

    const todos = await Todo.find(filter).sort(sort);

    res.json({
      success: true,
      count: todos.length,
      data: todos
    });
  } catch (error) {
    console.error('Get todos error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/todos/:id
// @desc    Get a single todo by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }

    res.json({
      success: true,
      data: todo
    });
  } catch (error) {
    console.error('Get todo error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid todo ID'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/todos
// @desc    Create a new todo
// @access  Private
router.post('/', [
  auth,
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 200 })
    .withMessage('Title cannot exceed 200 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description cannot exceed 1000 characters'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Priority must be low, medium, or high'),
  body('dueDate')
    .optional()
    .isISO8601()
    .withMessage('Due date must be a valid date')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { title, description, priority, dueDate } = req.body;

    const todo = new Todo({
      title,
      description,
      priority,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      user: req.user._id
    });

    await todo.save();

    res.status(201).json({
      success: true,
      message: 'Todo created successfully',
      data: todo
    });
  } catch (error) {
    console.error('Create todo error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/todos/:id
// @desc    Update a todo
// @access  Private
router.put('/:id', [
  auth,
  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Title cannot be empty')
    .isLength({ max: 200 })
    .withMessage('Title cannot exceed 200 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description cannot exceed 1000 characters'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Priority must be low, medium, or high'),
  body('completed')
    .optional()
    .isBoolean()
    .withMessage('Completed must be a boolean'),
  body('dueDate')
    .optional()
    .isISO8601()
    .withMessage('Due date must be a valid date')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { title, description, priority, completed, dueDate } = req.body;

    // Build update object
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (priority !== undefined) updateData.priority = priority;
    if (completed !== undefined) updateData.completed = completed;
    if (dueDate !== undefined) updateData.dueDate = dueDate ? new Date(dueDate) : null;

    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      updateData,
      { new: true, runValidators: true }
    );

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }

    res.json({
      success: true,
      message: 'Todo updated successfully',
      data: todo
    });
  } catch (error) {
    console.error('Update todo error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid todo ID'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PATCH /api/todos/:id/toggle
// @desc    Toggle todo completion status
// @access  Private
router.patch('/:id/toggle', auth, async (req, res) => {
  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }

    todo.completed = !todo.completed;
    await todo.save();

    res.json({
      success: true,
      message: `Todo marked as ${todo.completed ? 'completed' : 'incomplete'}`,
      data: todo
    });
  } catch (error) {
    console.error('Toggle todo error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid todo ID'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/todos/:id
// @desc    Delete a todo
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }

    res.json({
      success: true,
      message: 'Todo deleted successfully'
    });
  } catch (error) {
    console.error('Delete todo error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid todo ID'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/todos
// @desc    Delete all completed todos
// @access  Private
router.delete('/', auth, async (req, res) => {
  try {
    const result = await Todo.deleteMany({
      user: req.user._id,
      completed: true
    });

    res.json({
      success: true,
      message: `${result.deletedCount} completed todos deleted`
    });
  } catch (error) {
    console.error('Delete completed todos error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;


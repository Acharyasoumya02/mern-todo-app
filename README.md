# MERN Stack ToDo Application

A full-stack ToDo application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) demonstrating modern web development practices, user authentication, CRUD operations, and responsive UI design.

## 🚀 Features

### Core Functionality
- **User Authentication**: Secure sign-up and login using JWT and bcrypt
- **CRUD Operations**: Complete Create, Read, Update, Delete functionality for todos
- **Task Management**: Mark tasks as complete/incomplete
- **Persistent Storage**: All data stored in MongoDB Atlas
- **RESTful API**: Well-structured API built with Express.js and Node.js

### Frontend Features
- **Modern UI**: Built with React.js and styled using Tailwind CSS and shadcn/ui
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **State Management**: Efficient state management using React Context API
- **Real-time Updates**: Instant UI updates with optimistic rendering
- **Loading States**: Professional loading indicators and error handling
- **Toast Notifications**: User-friendly feedback for all actions

### Advanced Features
- **Priority Levels**: Low, Medium, High priority for tasks
- **Due Dates**: Set and track due dates for todos
- **Filtering**: Filter todos by status (All, Active, Completed)
- **Sorting**: Sort todos by date or priority
- **Search**: Quick search functionality
- **Animations**: Smooth animations and transitions

## 🛠️ Technology Stack

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT**: JSON Web Tokens for authentication
- **bcrypt**: Password hashing
- **CORS**: Cross-origin resource sharing
- **dotenv**: Environment variable management

### Frontend
- **React.js**: Frontend library
- **Vite**: Build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Modern UI component library
- **Lucide React**: Beautiful icons
- **Axios**: HTTP client
- **React Hot Toast**: Toast notifications
- **React Router**: Client-side routing

## 📁 Project Structure

```
mern-todo-app/
├── backend/
│   ├── config/
│   │   └── jwt.js              # JWT utility functions
│   ├── middleware/
│   │   └── auth.js             # Authentication middleware
│   ├── models/
│   │   ├── User.js             # User schema
│   │   └── Todo.js             # Todo schema
│   ├── routes/
│   │   ├── auth.js             # Authentication routes
│   │   └── todos.js            # Todo CRUD routes
│   ├── .env                    # Environment variables
│   ├── server.js               # Main server file
│   └── package.json            # Backend dependencies
├── frontend/
│   └── todo-frontend/
│       ├── src/
│       │   ├── components/
│       │   │   ├── auth/
│       │   │   │   ├── Login.jsx
│       │   │   │   └── Register.jsx
│       │   │   ├── todos/
│       │   │   │   ├── AddTodo.jsx
│       │   │   │   ├── TodoItem.jsx
│       │   │   │   └── TodoList.jsx
│       │   │   ├── Dashboard.jsx
│       │   │   └── ProtectedRoute.jsx
│       │   ├── contexts/
│       │   │   ├── AuthContext.jsx
│       │   │   └── TodoContext.jsx
│       │   ├── lib/
│       │   │   └── api.js
│       │   ├── App.jsx
│       │   ├── App.css
│       │   └── main.jsx
│       ├── index.html
│       └── package.json        # Frontend dependencies
└── README.md                   # This file
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mern-todo-app
   ```

2. **Set up the backend**
   ```bash
   cd backend
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the backend directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/mern-todo
   JWT_SECRET=your-super-secret-jwt-key-here
   NODE_ENV=development
   ```

4. **Set up the frontend**
   ```bash
   cd ../frontend/todo-frontend
   npm install
   ```

### Running the Application

1. **Start MongoDB** (if using local installation)
   ```bash
   sudo systemctl start mongod
   ```

2. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```
   The backend will run on `http://localhost:5000`

3. **Start the frontend development server**
   ```bash
   cd frontend/todo-frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

4. **Access the application**
   Open your browser and navigate to `http://localhost:5173`

## 📱 Usage

### Getting Started
1. **Register**: Create a new account with your name, email, and password
2. **Login**: Sign in with your credentials
3. **Dashboard**: Access your personal todo dashboard

### Managing Todos
1. **Add Todo**: Click "Add New Todo" and fill in the details
2. **Complete Todo**: Click the checkbox to mark as complete
3. **Edit Todo**: Click the edit icon to modify todo details
4. **Delete Todo**: Click the delete icon to remove a todo
5. **Filter**: Use All, Active, or Completed filters
6. **Sort**: Sort by date or priority

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Todos
- `GET /api/todos` - Get all todos for authenticated user
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo
- `PATCH /api/todos/:id/toggle` - Toggle todo completion status

## 🎨 UI Components

The application uses a modern design system with:
- **Cards**: Clean card-based layout for todos
- **Forms**: Well-designed forms with validation
- **Buttons**: Multiple button variants and states
- **Icons**: Lucide React icons throughout
- **Animations**: Smooth transitions and hover effects
- **Responsive**: Mobile-first responsive design

## 🔒 Security Features

- **Password Hashing**: bcrypt for secure password storage
- **JWT Authentication**: Stateless authentication with JSON Web Tokens
- **Protected Routes**: Frontend route protection
- **Input Validation**: Server-side validation for all inputs
- **CORS Configuration**: Proper cross-origin resource sharing setup

## 🚀 Deployment

### Backend Deployment
1. Set up a MongoDB Atlas cluster
2. Update the `MONGODB_URI` in your environment variables
3. Deploy to platforms like Heroku, Railway, or DigitalOcean

### Frontend Deployment
1. Build the production version:
   ```bash
   npm run build
   ```
2. Deploy the `dist` folder to platforms like Vercel, Netlify, or AWS S3

## 🐛 Known Issues

- Todo creation validation: There's a minor validation issue when creating todos that needs to be resolved
- Date formatting: The date picker may show formatting issues in some browsers

## 🔮 Future Enhancements

- **Categories**: Add todo categories and tags
- **Collaboration**: Share todos with other users
- **Reminders**: Email/push notifications for due dates
- **Dark Mode**: Toggle between light and dark themes
- **Drag & Drop**: Reorder todos with drag and drop
- **Bulk Actions**: Select and perform actions on multiple todos
- **Analytics**: Todo completion statistics and insights

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Created as a demonstration of full-stack web development skills using the MERN stack.

## 🙏 Acknowledgments

- React.js team for the amazing frontend library
- Express.js team for the robust backend framework
- MongoDB team for the flexible database solution
- Tailwind CSS team for the utility-first CSS framework
- shadcn/ui for the beautiful component library


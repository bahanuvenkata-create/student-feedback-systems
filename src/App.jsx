import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { ProtectedRoute } from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import StudentDashboard from './pages/StudentDashboard';
import ProfilePage from './pages/ProfilePage';
import FeedbackForm from './pages/FeedbackForm';
import AdminDashboard from './pages/AdminDashboard';
import Analytics from './pages/Analytics';
import './App.css';

function AppRoutes() {
  const { isAuthenticated, userRole, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Student Routes */}
        <Route 
          path="/student" 
          element={
            <ProtectedRoute 
              element={<StudentDashboard />}
              isAuthenticated={isAuthenticated}
              userRole={userRole}
            />
          } 
        />

        <Route 
          path="/profile" 
          element={
            <ProtectedRoute 
              element={<ProfilePage />}
              isAuthenticated={isAuthenticated}
              userRole={userRole}
            />
          } 
        />

        <Route 
          path="/feedback" 
          element={
            <ProtectedRoute 
              element={<FeedbackForm />}
              isAuthenticated={isAuthenticated}
              userRole={userRole}
            />
          } 
        />

        <Route 
          path="/analytics" 
          element={
            <ProtectedRoute 
              element={<Analytics />}
              isAuthenticated={isAuthenticated}
              userRole={userRole}
            />
          } 
        />

        {/* Protected Admin Routes */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute 
              element={<AdminDashboard />}
              isAuthenticated={isAuthenticated}
              userRole={userRole}
              requiredRole="admin"
            />
          } 
        />

        {/* Catch all - redirect to login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;

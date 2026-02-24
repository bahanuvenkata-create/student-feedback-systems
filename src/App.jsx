import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import StudentDashboard from './pages/StudentDashboard';
import FeedbackForm from './pages/FeedbackForm';
import AdminDashboard from './pages/AdminDashboard';
import Analytics from './pages/Analytics';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/feedback" element={<FeedbackForm />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

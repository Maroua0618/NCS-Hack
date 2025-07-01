import { useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import Welcome from "./components/Welcome";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import Quiz from './components/Quiz'; // Make sure this import exists
import Dashboard from './components/Dashboard';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic'
    });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} /> 
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/quiz" element={<Quiz />} /> 
        <Route path="/dashboard" element={ <Dashboard /> } /> 

        {/* Add more routes as needed */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
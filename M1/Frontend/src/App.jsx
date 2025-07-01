import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import LoginSign from "./components/LoginSign";
import Dashboard from "./components/Dashboard"; // Create this component

function App() {
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSign />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* Add Dashboard component */}
      </Routes>
    </Router>
  );
}

export default App;
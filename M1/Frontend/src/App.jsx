import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import LandingPage from "./components/LandingPage";
function App() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div>
      <LandingPage />
      {/* You can add more components here as needed */}
    </div>
  );
}

export default App;

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4" data-aos="fade-up">
        Hello with AOS!
      </h1>
      <div className="h-30 w-30 bg-blue-600">hi tailwind css</div>
      <p className="text-gray-600" data-aos="fade-right">
        This text will animate on scroll!
      </p>
    </div>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Nsms from "./pages/Nsms";
import Java2DGame from "./pages/Game2D";
import About from "./sections/Aboutme";
import Bookingweb from "./pages/Bookingweb";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  return (
    <ScrollToTop>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/P1" element={<Bookingweb />} />
        <Route path="/P2" element={<Nsms />} />
        <Route path="/P3" element={<Java2DGame />} />
        {/* Add more routes as needed */}
      </Routes>
    </ScrollToTop>
  );
};

export default App;

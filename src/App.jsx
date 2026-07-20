import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Home from "./pages/Home";
import Nsms from "./pages/Nsms";
import Java2DGame from "./pages/Game2D";
import About from "./sections/Aboutme";
import Bookingweb from "./pages/Bookingweb";
import ScrollToTop from "./components/ScrollToTop";
import Splento from "./pages/Splento";
import BadmintonQueue from "./pages/BadmintonQueue";

const App = () => {
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  // Deliberately short: this sits in front of every navigation, so anything
  // longer reads as latency rather than polish.
  const duration = reduceMotion ? 0 : 0.18;

  return (
    <ScrollToTop>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/P3" element={<Bookingweb />} />
            <Route path="/P2" element={<Nsms />} />
            <Route path="/P1" element={<Java2DGame />} />
            <Route path="/P4" element={<Splento />} />
            <Route path="/P5" element={<BadmintonQueue />} />
            {/* Add more routes as needed */}
          </Routes>
        </motion.div>
      </AnimatePresence>
    </ScrollToTop>
  );
};

export default App;

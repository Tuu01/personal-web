import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Visual from "./pages/Visual";
import BadmintonQueue from "./pages/BadmintonQueue";
import NailFairy from "./pages/Bookingweb";
import Splento from "./pages/Splento";
import Nsms from "./pages/Nsms";
import Game2D from "./pages/Game2D";
import { BadmintonClicker, NotFound } from "./pages/Placeholder";
import { LEGACY_REDIRECTS } from "./routes";

export const AppRoutes = ({ location }) => (
  <Routes location={location}>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/visual" element={<Visual />} />
    <Route path="/work/badminton-queue" element={<BadmintonQueue />} />
    <Route path="/work/nail-fairy" element={<NailFairy />} />
    <Route path="/work/splento" element={<Splento />} />
    <Route path="/work/nsms" element={<Nsms />} />
    <Route path="/work/2d-game" element={<Game2D />} />
    <Route path="/work/badminton-clicker" element={<BadmintonClicker />} />
    {Object.entries(LEGACY_REDIRECTS).map(([from, to]) => (
      <Route key={from} path={from} element={<Navigate to={to} replace />} />
    ))}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => {
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  // Deliberately short: this sits in front of every navigation.
  const duration = reduceMotion ? 0 : 0.18;

  return (
    <ScrollToTop>
      <AnimatePresence mode="wait">
        {/* Keyed by path only: the room's zones live in the hash and must not
            remount the page. */}
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration }}
        >
          <AppRoutes location={location} />
        </motion.div>
      </AnimatePresence>
    </ScrollToTop>
  );
};

export default App;

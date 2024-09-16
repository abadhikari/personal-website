import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Home from '../pages/Home/Home';
import About from '../pages/About/About';
import Projects from '../pages/Projects/Projects';
import Contact from '../pages/Contact/Contact';
import '../styles/global.css';

export default function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <div className="mainContent">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

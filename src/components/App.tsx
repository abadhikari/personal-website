import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header/Header';
import ScrollToTop from './Header/Navbar/ScrollToTop';
import Footer from './Footer/Footer';
import Home from '../pages/Home/Home';
import About from '../pages/About/About';
import Projects from '../pages/Projects/Projects';
import Contact from '../pages/Contact/Contact';
import Photos from '../pages/Photos/Photos';
import Upload from '../pages/Upload/Upload';
import Login from '../pages/Login/Login';
import '../styles/global.css';
import PrivateRoute from './common/PrivateRoute';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app">
        <Header />
        <div className="mainContent">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/photos" element={<Photos />} />
            <Route
              path="/upload"
              element={
                <PrivateRoute>
                  <Upload />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';

import About from '../pages/About/About';
import Contact from '../pages/Contact/Contact';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import LogoutHandler from '../pages/Logout/LogoutHandler';
import Photos from '../pages/Photos/Photos';
import Projects from '../pages/Projects/Projects';
import Reviews from '../pages/Reviews/Reviews';
import Upload from '../pages/Upload/Upload';

import PrivateRoute from './common/PrivateRoute';
import TrackPageViews from './common/TrackPageViews';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import ScrollToTop from './Header/Navbar/ScrollToTop';

import '../styles/global.css';

export default function App() {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#fff',
            color: '#333',
            fontFamily: "'Courier New', monospace",
            fontSize: '17px',
            fontWeight: '500',
            borderRadius: '8px',
            padding: '10px 16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            border: '1px solid #eee',
          },
        }}
      />
      <Router>
        <ScrollToTop />
        <TrackPageViews />
        <div className="app">
          <Header />
          <div className="mainContent">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/photos" element={<Photos />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route
                path="/upload"
                element={
                  <PrivateRoute>
                    <Upload />
                  </PrivateRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<LogoutHandler />} />
            </Routes>
          </div>
          <Footer />
          <Analytics />
        </div>
      </Router>
    </>
  );
}

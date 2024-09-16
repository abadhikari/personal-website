import NavBar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import '../styles/global.css';

export default function App() {
  return (
    <div className="app">
      <NavBar />
      <div className="mainContent">
        <h1>Hello World!</h1>
      </div>
      <Footer />
    </div>
  );
}

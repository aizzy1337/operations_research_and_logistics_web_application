import { Routes, Route } from 'react-router-dom';
import './App.css';
import Cpm from './components/cpm/Cpm';
import Home from './components/home/Home';
import Posrednik from './components/posrednik/Posrednik';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="cpm" element={ <Cpm/> } />
        <Route path="posrednik" element={ <Posrednik/> } />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

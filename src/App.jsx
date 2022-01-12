import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import AddProduct from './pages/AddProduct';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import MyProduct from './pages/MyProduct';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/my-product" element={<MyProduct />} />
      </Routes>
    </div>
  );
}

export default App;

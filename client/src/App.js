import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/header'
import Home from './pages/home'
import Cart from './pages/cart';
import ErrorPage from './pages/errorPage';
import Profile from './pages/profile';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='*' element={<ErrorPage />} />

      </Routes>
    </Router>
  );
}

export default App;

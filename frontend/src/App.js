import './App.css';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Account from './pages/Account';
import Orders from './pages/Orders';
import {Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar.js'

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />}/>
        <Route path='/cart' element={<Cart />}/>
        <Route path='/Account' element={<Account />}/>
        <Route path='/Orders' element={<Orders />}/>
      </Routes>
    </div>
  );
}

export default App;
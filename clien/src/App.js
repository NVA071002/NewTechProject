import './App.css';
import Login from './page/Authentication/Login';
import Register from './page/Authentication/Register';
import Home from './page/Home/Home';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
//phai su dung BrowserRouter as de fix cai reading pathname( multiple import --> conflict)
function App() {
  return (

    <div className="App">

      <Router>
        
        <Routes >
          <Route path="/" element={<Home />} />
          <Route path="auth/login" element={<Login />} />
          <Route path="auth/register" element={<Register />} />
        </Routes>

      </Router>
    </div>
  );
}

export default App;

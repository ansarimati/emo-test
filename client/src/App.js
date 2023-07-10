import './App.css';
import { Login } from './components/Login';
import { Register } from "./components/Register";
import { Home } from './components/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRouets } from './components/ProtectedRouets';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path='/login' element={ <Login /> } />
            <Route path='/register' element={ <Register /> } />
            <Route path='/' element={<ProtectedRouets Component={Home} />  } />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;

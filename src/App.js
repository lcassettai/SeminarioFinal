import './App.css';
import Login from './views/login/Login'
import Registro from './views/registro/Registro'
import {Route,Routes} from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <div className="">
          <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/registro" element={<Registro/>}/>
            <Route path="*" element={<h1>404 Not found</h1>}/>
          </Routes>
        </div>
    </div>
  );
}

export default App;

import "./App.css";
import Login from "./views/login/Login";
import Registro from "./views/registro/Registro";
import MenuHome from "./views/menuHome/MenuHome";
import Codigo from "./views/codigo/Codigo";
import Restaurantes from "./views/restaurantes/Restaurantes";
import Restaurante from "./views/restaurantes/Restaurante";
import Menu from "./views/restaurantes/Menu";
import { Route, Routes } from "react-router-dom";
import EscanearQR from "./views/escanearQR/EscanearQR";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Protected from "./components/protected";

function App() {

  return (
    <div className="App">
      <div className="">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route
            path="/restaurantes/:idRestaurante/menu"
            element={
              <Protected>
                <Menu />
              </Protected>
            }
          />
          <Route
            path="/menuHome"
            element={
              <Protected>
                <MenuHome />
              </Protected>
            }
          />
          <Route
            path="/escanearQR"
            element={
              <Protected>
                <EscanearQR />
              </Protected>
            }
          />
          <Route
            path="/codigo"
            element={
              <Protected>
                <Codigo />
              </Protected>
            }
          />
          <Route
            path="/restaurantes"
            element={
              <Protected>
                <Restaurantes />
              </Protected>
            }
          />
          <Route
            path="/restaurantes/:idRestaurante"
            element={
              <Protected>
                <Restaurante />
              </Protected>
            }
          />
          <Route path="*" element={<h1>404 Not found</h1>} />
        </Routes>
        <ToastContainer
          position="top-center"
          autoClose={800}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover={false}
          theme="colored"
        />
      </div>
    </div>
  );
}

export default App;

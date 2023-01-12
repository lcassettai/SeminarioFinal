import { useParams } from "react-router-dom";
import NavMenu from "../../layout/NavMenu";
import Producto from "../../components/menu/Producto";
import FiltroCategoriasMenu from "../../components/menu/FiltroCategoriasMenu";
import FooterResumen from "../../components/menu/FooterResumen";
import { useState } from "react";

const Menu = () => {
  const { codigoMesa } = useParams();
  const [cantidadPedido, cargarProductos] = useState([]);

  return (
    <>
      <NavMenu text="Menu" />
      <div className="contenedor">
        <div className="mb-4">
          <label className="form-label inline-block mb-2 text-lg text-gray-700 font-bold">
            Buscar productos :
          </label>
          <input
            type="text"
            className="input-text-md"
            placeholder="Producto"
          ></input>
        </div>
        <FiltroCategoriasMenu />
        <div className="mt-4">
          <h3 className="form-label inline-block mb-2 text-lg text-gray-700 font-bold">
            Productos
          </h3>
        </div>
        <div className="flex flex-col">
          <Producto
            nombre="Hamburguesa"
            estrellas="3"
            consumidores="1"
            precio="1200"
            imagen={`/img/demo-hamburguesa.png`}
            cargarProducto={cargarProductos}
          />
          <Producto
            nombre="Pizza"
            estrellas="4"
            consumidores="3"
            precio="1200"
            imagen={`/img/demo-pizza.png`}
            cargarProducto={cargarProductos}
          />
          <Producto
            nombre="Lomito"
            estrellas="5"
            consumidores="2"
            precio="1700"
            imagen={`/img/demo-lomito.png`}
            cargarProducto={cargarProductos}
          />
        </div>
      </div>
      <FooterResumen
        cantidad={
          cantidadPedido.length === 0
            ? 0
            : cantidadPedido.reduce(
                (acumulador, actual) => acumulador + actual.cantidad,
                0
              )
        }
        total={
          cantidadPedido.length === 0
            ? 0
            : cantidadPedido.reduce(
                (acumulador, actual) =>
                  acumulador + actual.cantidad * actual.precio,
                0
              )
        }
      />
    </>
  );
};

export default Menu;

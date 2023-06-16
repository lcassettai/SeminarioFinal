import { useParams } from "react-router-dom";
import NavMenu from "../../layout/NavMenu";
import Producto from "../../components/menu/Producto";
import FiltroCategoriasMenu from "../../components/menu/FiltroCategoriasMenu";
import FooterResumen from "../../components/menu/FooterResumen";
import ModalDetalle from "../../components/menu/ModalDetalle";
import { useState } from "react";

const Menu = () => {
  const { codigoMesa } = useParams();
  const [estadoModalDetalle,setEstadoModalDetalle] = useState(false);
  const [pedido, setProductos] = useState([]);

  const listadoProductos = [
    {
      id:1,
      nombre:"Hamburguesa",
      estrellas:3,
      consumidores:1,
      precio:1200,
      imagen:'/img/demo-hamburguesa.png',
      setProductos:{setProductos}
    },
    {
      id:2,
      nombre:"Pizza",
      estrellas:4,
      consumidores:2,
      precio:1000,
      imagen:'/img/demo-pizza.png',
      setProductos:{setProductos}
    },
    {
      id:3,
      nombre:"Lomito",
      estrellas:5,
      consumidores:1,
      precio:1900,
      imagen:'/img/demo-lomito.png',
      setProductos:{setProductos}
    },
  ];

  const [productosEjemplo,setProductoEjemplo] = useState(listadoProductos);

  let productos = productosEjemplo.map((producto) => {
    //TODO la key debe ser el id del producto
    return (<Producto
      key={producto.id}
      idProducto={producto.id}
      nombre={producto.nombre}
      estrellas={producto.estrellas}
      consumidores={producto.consumidores}
      precio={producto.precio}
      imagen={producto.imagen}
      setProductos={setProductos}
    />);
  });

  const productosFilter = (event) => {
    let productosFiltrados = listadoProductos.filter(({nombre}) => {
        return nombre.toLowerCase().includes(event.target.value.toLowerCase())
    })

    setProductoEjemplo(productosFiltrados);
}


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
            onChange={productosFilter}
          ></input>
        </div>
        <FiltroCategoriasMenu />
        <div className="mt-4">
          <h3 className="form-label inline-block mb-2 text-lg text-gray-700 font-bold">
            Productos
          </h3>
        </div>
        <div className="flex flex-col">
            {productos}
        </div>
      </div>
      <FooterResumen
        setEstadoModalDetalle={setEstadoModalDetalle}
        cantidad={
          pedido.length === 0
            ? 0
            : pedido.reduce(
                (acumulador, actual) => acumulador + actual.cantidad,
                0
              )
        }
        total={
          pedido.length === 0
            ? 0
            : pedido.reduce(
                (acumulador, actual) =>
                  acumulador + actual.cantidad * actual.precio,
                0
              )
        }
      />
      <ModalDetalle 
        estado={estadoModalDetalle}
        cambiarEstado={setEstadoModalDetalle}
        setProductos={setProductos}
        pedido={pedido}
        total={
          pedido.length === 0
            ? 0
            : pedido.reduce(
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

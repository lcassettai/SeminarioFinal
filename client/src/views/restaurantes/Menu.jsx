import { useParams } from "react-router-dom";
import NavMenu from "../../layout/NavMenu";
import Producto from "../../components/menu/Producto";
import FiltroCategoriasMenu from "../../components/menu/FiltroCategoriasMenu";
import FooterResumen from "../../components/menu/FooterResumen";
import FooterIniciarPedido from "../../components/menu/FooterIniciarPedido";
import ModalDetalle from "../../components/menu/ModalDetalle";
import { useEffect, useState } from "react";
import { getMenu,getRestaurante } from "../../api/restaurantes";

const Menu = () => {
  const { idRestaurante } = useParams();
  const [estadoModalDetalle, setEstadoModalDetalle] = useState(false);
  const [pedido, setProductos] = useState([]);
  const [listadoProductos, setListadoProductos] = useState([]);
  const [listadoProductosInicial, setListadoProductosInicial] = useState([]);
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);
  const [nuevoPedido, setNuevoPedido] = useState(false);
  const [restaurante, setRestaurante] = useState("");

  useEffect(() => {
    const getMenuSucursal = async () => {
      try {
        const data = await getMenu(idRestaurante);
        const restaurante = await getRestaurante(idRestaurante);

        setRestaurante(restaurante);
        setListadoProductos(data);
        setListadoProductosInicial(data);
      } catch (error) {
        console.error(error);
      }
    };

    const pedido = localStorage.getItem('pedido');

    if(pedido){
      let pedidoNuevo = JSON.parse(localStorage.getItem('pedido'));
      const fechaActual = new Date();
      const fechaPedido = new Date(pedidoNuevo.created_at);
      const diferenciaTiempo = fechaPedido - fechaActual;
      const horasTranscurridas = diferenciaTiempo / (1000 * 60 * 60);

      if (horasTranscurridas >= 1) {
        localStorage.removeItem('pedido');
      }else{
        setNuevoPedido(true);
      }  
    }

    getMenuSucursal();
  }, []);

  const productosFilter = (event) => {
    let productosFiltrados = listadoProductosInicial.filter(
      ({ descripcion }) => {
        return descripcion
          .toLowerCase()
          .includes(event.target.value.toLowerCase());
      }
    );

    setListadoProductos(productosFiltrados);
  };

  const productosFilterCategorias = (categorias) => {
    if (categorias.length === 0) {
      setListadoProductos(listadoProductosInicial);
      return;
    }

    let productosFiltrados = listadoProductosInicial.filter(
      ({ id_categoria }) => {
        return categorias.includes(id_categoria.toString());
      }
    );

    setListadoProductos(productosFiltrados);
  };

  const categoriaSeleccionada = (elemento) => {
    if (categoriasSeleccionadas.includes(elemento)) {
      let cat = categoriasSeleccionadas.filter((categoria) => {
        return categoria != elemento;
      });
      setCategoriasSeleccionadas(cat);
    } else {
      setCategoriasSeleccionadas((ele) => {
        return [...ele, elemento];
      });
    }
  };

  const handleEstadoPedido = (estado) =>{
    setNuevoPedido(estado);
    setProductos([]);
  }

  useEffect(() => {
    productosFilterCategorias(categoriasSeleccionadas);
  }, [categoriasSeleccionadas]);

  return (
    <>
      <NavMenu text="Menu" />
      <div className="contenedor">
        <div className="mb-4">
        <div className="text-2xl text-center mb-2 font-bold text-teal-700">
          {restaurante ? restaurante.nombre_establecimiento : ''}
        </div>
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
        <FiltroCategoriasMenu
          setOnCategoriaSeleccionada={categoriaSeleccionada}
        />
        <div className="mt-4">
          <h3 className="form-label inline-block mb-2 text-lg text-gray-700 font-bold">
            Productos
          </h3>
        </div>
        <div className="flex flex-col">
          {listadoProductos
            ? listadoProductos.map((producto) => {
                return (
                  <Producto
                    key={producto.id_producto}
                    idProducto={producto.id_producto}
                    nombre={producto.descripcion}
                    estrellas={producto.valoracion}
                    consumidores={producto.cantidad_comen}
                    precio={producto.precio}
                    imagen={producto.imagen}
                    detalle={producto.detalle}
                    nuevoPedido={nuevoPedido}
                    setProductos={setProductos}
                  />
                );
              })
            : "Cargando..."}
        </div>
      </div>

      {!nuevoPedido ? (
        <FooterIniciarPedido setNuevoPedido={handleEstadoPedido} />
      ) : (
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
      )}

      <ModalDetalle
        estado={estadoModalDetalle}
        cambiarEstado={setEstadoModalDetalle}
        cambiarEstadoPedido={setNuevoPedido}
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

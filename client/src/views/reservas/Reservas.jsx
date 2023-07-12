import { getReservasCliente } from '../../api/reservas';
import { useEffect,useState } from 'react';
import NavMenu from "../../layout/NavMenu";
import Reserva from './Reserva';

const Reservas = () => {
    const [reservas,setReservas] = useState(null);

    useEffect(() => {
        const getReservas = async () => {
            try {
                const data = await getReservasCliente();
                setReservas(data);
            } catch (error) {
                console.log(error);
            }
        }

        getReservas();
    },[]);

    return <>
        <NavMenu text="Reservas" />
        <div className="contenedor">
        <div className="font-bold pt-2 px-2 text-xl">Listado de Reservas</div>
            {reservas
            ? reservas.map((reserva) => {
                return <Reserva key={reserva.id_reserva} reserva={reserva} />;
                })
            : "Cargando"}
        </div>
    </>
}

export default Reservas;
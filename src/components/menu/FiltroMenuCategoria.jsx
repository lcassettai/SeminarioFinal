import { useState } from 'react';
import './Filtro.css';

const FiltroMenuCategoria = (props) => {
    const [isSelected, setSelected] = useState(false);
    const [bgColor, setBgColor] = useState("bg-white");
    const [textColor, setTextColor] = useState("text-teal-700");

    const handleSelected = (event) => {
        if(isSelected){
            setSelected(false);
            setBgColor("bg-white");
            setTextColor("text-teal-700");
        }else{
            setSelected(true);
            setBgColor("bg-teal-700");
            setTextColor("text-white");
        }

        props.setOnSelected(event.currentTarget.id);
    }

    return (<>
        <div id={props.identificador} className={`p-2 mr-2 rounded shadow-md flex flex-justify-center justify-items-center flex-col border filtro-item ${bgColor}`} onClick={handleSelected}>
            <div className={`text-center m-auto p-1 text-2xl ${textColor}`}>
                {props.children}
            </div>
            <div className={`text-center font-bold ${textColor}`}>
                {props.text.toUpperCase()}
            </div>
        </div>
    </>);
}

export default FiltroMenuCategoria;
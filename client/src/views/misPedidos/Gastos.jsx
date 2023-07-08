import {formatearEnPesos} from "../../utils/moneda";

const Gastos = ({ texto, monto }) => {
  return (
    <>
      <div>
        <div className="shadow border border-gray-100 w-full mt-4 flex rounded-md flex-row py-2 items-center">
          <div className="flex flex-row w-full  justify-between px-3 ">
            <div className="text-center">
              <span className="font-bold">{texto}</span>
            </div>
          </div>
          <div className="text-md px-2">{formatearEnPesos(monto)}</div>
        </div>
      </div>
    </>
  );
};

export default Gastos;

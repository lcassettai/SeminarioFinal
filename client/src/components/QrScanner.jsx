import { useState } from "react";
import {QrReader} from "react-qr-reader";

const QrScanner = (props) => {
  const [startScan, setStartScan] = useState(false);
  const [data, setData] = useState("");

  const handleScan = async (scanData) => {

    if (scanData && scanData !== "") {
      console.log(`loaded >>>`, scanData);
      setData(scanData);
      setStartScan(false);

      //Devolvemos el dato escaneado al padre
      props.onScann(scanData);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div className="App">
      <div className="text-center mt-4 text-red-700 font-bold animate-pulse">
        {startScan ? "Escanenado" : ""}
      </div>
      {startScan && (
        <>
          <QrReader
            constraints={ {facingMode: 'environment'} }
            delay={1000}
            onError={handleError}
            onScan={handleScan}
            containerStyle={{ width: "450px"}}
            onResult={handleScan}
          />
        </>
      )}
      <br></br>
      <button
        className="button-lg text-2xl uppercase"
        onClick={() => {
          setStartScan(!startScan);
        }}
      >
        {startScan ? "Detener Escaner" : "Comenzar a escanear"}
      </button>
    </div>
  );
};

export default QrScanner;

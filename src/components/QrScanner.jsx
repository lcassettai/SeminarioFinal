import { useState } from "react";
import QrReader from "react-qr-scanner";

const QrScanner = (props) => {
  const [startScan, setStartScan] = useState(false);
  const [loadingScan, setLoadingScan] = useState(false);
  const [data, setData] = useState("");

  const handleScan = async (scanData) => {
    setLoadingScan(true);
    if (scanData && scanData !== "") {
      console.log(`loaded >>>`, scanData);
      setData(scanData);
      setStartScan(false);
      setLoadingScan(false);

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
            delay={1000}
            onError={handleError}
            onScan={handleScan}
            style={{ width: "300px" }}
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
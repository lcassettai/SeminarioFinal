const BtnSolicitarCuenta = () => {
    const handleSolicitarCuenta = () => {
        alert('Cuenta solicitada');
    }

    return (   <>
        <div className="fixed bottom-0 bg-teal-800 w-full px-4 py-3 text-white text-center">
          <div className="text-xl font-bold" onClick={handleSolicitarCuenta}>Solicitar la Cuenta</div>
        </div>
      </>);
}

export default BtnSolicitarCuenta;
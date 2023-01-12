const FooterResumen = (props) => {
  return (
    <>
      <div className="fixed bottom-0 bg-teal-800 w-full px-4 py-2 flex flex-row justify-between text-white">
        <div className="text-center text-sm">
          <span className="font-bold">Productos</span>
          <br></br> {props.cantidad}
        </div>
        <div className="flex items-center text-lg font-bold" >Ver pedido</div>
        <div className="text-center text-sm">
          <span className="font-bold">Total</span>
          <br></br> ${props.total}
        </div>
      </div>
    </>
  );
};

export default FooterResumen;

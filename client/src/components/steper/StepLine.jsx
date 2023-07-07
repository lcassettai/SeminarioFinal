const StepLine = ({ activo }) => {
  return (
    <div className="flex w-full py-2 px-2  min-w-[20px]">
      {activo ? (
        <span
          className={`w-full border-2 rounded-full	 h-0 border-green-700 `}
        ></span>
      ) : (
        <span
          className={`w-full border-dashed rounded-full	 border-2  border-gray-200`}
        ></span>
      )}
    </div>
  );
};

export default StepLine;

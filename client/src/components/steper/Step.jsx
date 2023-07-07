import { BsCheckLg } from "react-icons/bs";

const Step = ({ text,activo}) => {
  return (
    <div className="flex flex-col">
      <div className={`flex h-5 w-5 items-center justify-center rounded-full m-auto  ${activo? 'bg-green-700 ' : 'bg-gray-200'} `}>
        <span className="text-white relative  ">
          {activo ? <BsCheckLg/>: <BsCheckLg className="text-gray-200"/> }
          <span className="absolute text-black -left-8 -bottom-7  ">{text}</span>
        </span>
      </div>  
    </div>
  );
};

export default Step;

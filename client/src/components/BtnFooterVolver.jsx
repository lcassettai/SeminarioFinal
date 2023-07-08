import { useNavigate } from "react-router-dom";
import { BsArrowLeftShort   } from "react-icons/bs";

const BtnFooterVolver = ({navigateTo}) => {
  let navigate = useNavigate();

  const handleNavigate = () => {
    if(navigateTo){
        navigate(navigateTo);
    }else{
        navigate(-1);
    }
  };

  return (
    <div className="fixed bottom-20 left-5 bg-red-500 rounded-full text-white text-center">
      <div className="text-2xl font-bold" onClick={handleNavigate}>
        <span> <BsArrowLeftShort className="inline-block text-4xl"/></span>
      </div>
    </div>
  );
};

export default BtnFooterVolver;

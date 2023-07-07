import StepLine from  "./StepLine";
import React from "react";

const EstadosSteper = (props) => {  
  return (
    <div className="flex flex-row justify-around pt-6 pb-10 px-6 text-center">
      {React.Children.map(props.children, (child, index) => {
        const isFirstChild = index === 0;
        const isLastChild = index === props.children.length  ;
        const isStepActive = index <= props.estadoActivo;
        const isLineActive = props.estadoActivo === 2;
        
        return (
          <>
            {isFirstChild ? (
              React.cloneElement(child, { activo: true })             
            ) : (
              <>
                <StepLine
                  key={`step-line-${index}`}
                  activo={isLastChild ? isLineActive : isStepActive}
                />
                {React.cloneElement(child, { activo: isStepActive })}
              </>
            )}
          </>
        );
      })}
    </div>
  );
};

export default EstadosSteper;
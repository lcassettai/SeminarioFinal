export default function Titulo(props){
    return (
        <h1 className="text-3xl text-center mt-4 mb-4 font-bold text-teal-700">
            {props.text}
        </h1>
    );
}
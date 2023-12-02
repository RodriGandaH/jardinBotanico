import { useParams } from "react-router-dom";

const Planta = () => {
  const routeParams = useParams();
  console.log(routeParams);
  return (
    <h1>Hola</h1>
  );
};

export default Planta;
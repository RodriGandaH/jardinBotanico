import { useParams } from "react-router-dom";
import Carrusel from "./Carrusel";
import { useEffect, useState } from "react";
import axios from "axios";

const Planta = () => {

  const idPlanta = useParams();
  const [planta, setPlanta] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/plants/" + idPlanta.id).then(response => {
      console.log(response.data);
      setPlanta(response.data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {isLoading ? (
        <h4 className="text-center">Cargando planta...</h4>
      ) : (
        <>
          <h3 className="text-center">{planta.name}</h3>
          <div className="d-flex justify-content-center">
            <Carrusel imagenes={planta.images} height={"400px"} heightCont={"450px"} width={"600px"} />
          </div>
          <h4 className="text-center mt-2 border-bottom pb-3">
            Nombre científico: <i>{planta.scientific_name}</i>
          </h4>
          <h5 className="mt-3">Descripción</h5>
          <div className="my-3" style={{ whiteSpace: "pre-wrap" }}>
            {planta.description}
          </div>
          <h5 className="mt-3 border-top pt-3" hidden={planta.medicinal_properties.length == 0}>
            Propiedades medicinales
          </h5>
          {planta.medicinal_properties.map(property => (
            <div key={property.id} className="ms-4 mt-3" style={{ whiteSpace: "pre-wrap" }}>
              &#x2022; {property.description}
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default Planta;
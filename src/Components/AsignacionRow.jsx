import axios from "axios";
import { useState, useEffect } from "react";

// eslint-disable-next-line react/prop-types
export default function AsignacionRow({ id }) {
  const [asignacion, setAsignacion] = useState({});
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8090/api/v1/asignaciones/${id}`
      );
      setAsignacion(response.data);
      //console.log(asignacion);
    } catch (err) {
      setError(err.toString());
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div>
      {asignacion.docente ? (
        <div className="flex border p-2 gap-2">
            <h6 className="text-sm font-semibold">{asignacion.docente.nombre} {asignacion.docente.apellidos} --{">"} </h6>
            <h6 className="text-sm font-semibold">{asignacion.materia.materia}</h6>
        </div>
      ) : (
        <p>......</p>
      )}
    </div>
  );
}

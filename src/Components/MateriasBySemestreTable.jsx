import axios from "axios";
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
export default function MateriasBySemestreTable({ semestre, onMateriasLoaded, handleRowMateria,}) {
  const [materias, setMaterias] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    if (semestre) {
      fetchData();
    }
  }, [semestre]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8090/api/v1/materias/semestre?semestreId=${semestre}`
      );
      setMaterias(response.data);
      onMateriasLoaded(response.data);
      if (response.data.length > 0) {
        setSelectedRow(response.data[0]);
        handleRowMateria(response.data[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRowClick = (materia) => {
    setSelectedRow(materia);
    handleRowMateria(materia); // Llama a la función de callback con la materia seleccionada
  };

  return (
    <div className="flex flex-col border rounded-md p-2">
      <h2 className="w-full flex justify-center font-bold">
        Materias del Grupo
      </h2>
      <table className="table-auto w-full">
        <thead className="bg-amber-400 text-white">
          <tr>
            <th className="px-4 py-2">Materia</th>
            <th className="px-4 py-2">Clave</th>
            <th className="px-4 py-2">Horas</th>
          </tr>
        </thead>
        <tbody>
          {materias.map((materia) => (
            <tr
              className={`hover:bg-amber-100 cursor-pointer ${
                selectedRow === materia ? "bg-amber-300" : ""
              }`}
              key={materia.materiaId}
              onClick={() => handleRowClick(materia)}
            >
              <td className="text-sm border px-1 py-1">{materia.materia}</td>
              <td className="text-sm border px-1 py-1">{materia.clave}</td>
              <td className="text-sm border px-1 py-1">{materia.horas}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import axios from "axios";
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
export default function MateriasBySemestreTable({ semestre }) {
  
    //Ruta: api/v1/materias/semestre?semestreId=S0001
    const  [materias, setMaterias] = useState([]);

    useEffect(() => {
        fetchData();
    },[semestre] );

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8090/api/v1/materias/semestre?semestreId=${semestre}`);
            setMaterias(response.data);
            console.log(materias);
        } catch (error) {
            console.error(error);
        }
    }   
  
    return(
        <div className="flex flex-col border rounded-md p-2">
        <h2 className="w-full flex justify-center font-bold">Materias del Semestre</h2>
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
              <tr key={materia.id}>
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

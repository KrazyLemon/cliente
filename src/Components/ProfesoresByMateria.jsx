import axios from "axios";
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
export default function ProfesoresByMateria({materia, onAsignacionId}) {
    const [profesores, setProfesores] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);

    const handleAsignacion = (id, row) => {
        if (onAsignacionId) {
            setSelectedRow(row);
          onAsignacionId(id);
        }
      };

    useEffect(() => {
        if (materia) {
            fetchData();
        }
    }, [materia]);

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8090/api/v1/asignaciones/materia?materiaId=${materia}`
            );
            setProfesores(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col border rounded-md p-2">
            <h2 className="w-full flex justify-center font-bold">
                Profesores que imparten la materia
            </h2>
            <table className="table-auto w-full">
                <thead className="bg-rose-500 text-white">
                    <tr>
                        <th className="px-4 py-2">Nombre</th>
                        <th className="px-4 py-2">Apellido</th>
                        <th className="px-4 py-2">Entrada</th>
                        <th className="px-4 py-2">Salida</th>
                        <th className="px-4 py-2">Horas</th>
                        <th className="px-4 py-2">Prioridad</th>
                    </tr>
                </thead>
                <tbody>
                    {profesores.map((asignacion) => (
                        <tr
                            key={asignacion.docente.docenteId}
                            className={`hover:bg-rose-100 cursor-pointer ${
                                selectedRow === asignacion ? "bg-rose-300" : ""
                                }`}
                            onClick={() => handleAsignacion(asignacion.asignacionId, asignacion)}
                        >
                            <td className="text-sm border px-2 py-1">
                                {asignacion.docente.nombre}
                            </td>
                            <td className="text-sm border px-2 py-1">
                                {asignacion.docente.apellidos}
                            </td>
                            <td className="text-sm border px-2 py-1">
                                {asignacion.docente.entrada}
                            </td>
                            <td className="text-sm border px-2 py-1">
                                {asignacion.docente.salida}
                            </td>
                            <td className="text-sm border px-2 py-1">
                                {asignacion.docente.horas}
                            </td>
                            <td className="text-sm border px-2 py-1">
                                {asignacion.docente.bandera.bandera}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

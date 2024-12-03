import SidePanel from "../Components/SidePanel";
import SelectGrupos from "../Components/SelectGrupos";
import Horario from "../Components/Horario";
import { useState, useEffect } from "react";
import MateriasBySemestreTable from "../Components/MateriasBySemestreTable";
import ProfesoresByMateria from "../Components/ProfesoresByMateria";
import AsignacionRow from "../Components/AsignacionRow";

export default function HomePage() {
  const [grupo, setGrupo] = useState(null);
  const [materias, setMaterias] = useState([]);
  const [selectedMateria, setSelectedMateria] = useState(null);
  const [asignacionId, setAsignacionId] = useState(null);
  const [asignaciones, setAsignaciones] = useState([]);

  const handleSelect = (grupoSeleccionado) => {
    setGrupo(grupoSeleccionado);
  };

  const handleSelectMateria = (materia) => {
    setSelectedMateria(materia);
  };

  const handleAsignacionId = (id) => {
    setAsignacionId(id);
    addAsignacion(id);
  };

  const handleMateriasLoaded = (materiasCargadas) => {
    setMaterias(materiasCargadas);
  };

  const addAsignacion = (asignacionId) => {
    setAsignaciones((prevAsignaciones) => {
      const exists = prevAsignaciones.some(
        (asignacion) => asignacion.asignacionId === asignacionId
      );

      if (exists) {
        alert(`La asignación con ID ${asignacionId} ya existe.`);
        return prevAsignaciones; // No cambia el estado
      }

      // Agrega la nueva asignación si no existe
      return [...prevAsignaciones, { asignacionId }];
    });
  };

  const isAsignacionesNotEmpty = () => {
    return asignaciones.length > 0;
  };

  useEffect(() => {
    console.log(asignacionId);
  }, [asignacionId]);

  useEffect(() => {}, [materias]);

  useEffect(() => {}, [selectedMateria]);

  useEffect(() => {
    console.log(asignaciones);
  }, [asignaciones]);

  return (
    <>
      <div className="flex pt-14">
        <SidePanel />
        <div className="flex-col w-full bg-gray-200 overflow-y-auto h-screen">
          <div className="flex w-1/3 justify-between items-center mx-3 mt-4 bg-white  rounded-md border shadow-md p-2 ">
            <h1 className="text-2xl">Elige un grupo para comenzar</h1>
            <form className="flex items-center space-x-2">
              <SelectGrupos
                handleSelect={handleSelect}
                disabled={isAsignacionesNotEmpty()}
              />
            </form>
          </div>
          <div className="flex justify-between items-center mx-3 mt-4 bg-white  rounded-md border shadow-md p-2 ">
            {grupo && (
              <div className="flex justify-between w-full items-center">
                <div className="flex gap-4">
                  <h2 className="font-bold">Grupo:</h2>
                  <h4>{grupo.grupo}</h4>
                  <h2 className="font-bold">Turno:</h2>
                  <h4>
                    {grupo.turno === "M"
                      ? "Matutino"
                      : grupo.turno === "V"
                      ? "Vespertino"
                      : grupo.turno}
                  </h4>
                  <h2 className="font-bold">Semestre:</h2>
                  <h4>{grupo.semestre.semestre}</h4>
                </div>
                <div className="flex gap-2">
                  <button className="bg-green-500 hover:bg-green-800 text-white rounded-md p-2 flex gap-1">
                    <img
                      src="src/assets/teacherIcon.svg"
                      alt="genHorario"
                      height={"28px"}
                      width={"28px"}
                    />
                    Crear Relacion Profesor -- Materia
                  </button>
                  
                  <button className="bg-rose-500 hover:bg-rose-800 text-white rounded-md p-2 flex gap-1">
                    <img
                      src="src/assets/deleteIcon.svg"
                      alt="delete"
                      height={"28px"}
                      width={"28px"}
                    />
                    Deshacer Cambios
                  </button>
                  <button className="bg-blue-500 hover:bg-blue-800 text-white rounded-md p-2 flex gap-1">
                    <img
                      src="src/assets/editIcon.svg"
                      alt="edit"
                      height={"28px"}
                      width={"28px"}
                    />
                    Elegir Otro Grupo
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-center gap-3 mx-3 mt-4 bg-white rounded-md border shadow-md p-2">
            {grupo && (
              <MateriasBySemestreTable
                semestre={grupo.semestre.semestreId}
                onMateriasLoaded={handleMateriasLoaded}
                handleRowMateria={handleSelectMateria}
              />
            )}
            {selectedMateria && (
              <ProfesoresByMateria
                materia={selectedMateria.materiaId}
                onAsignacionId={handleAsignacionId}
              />
            )}
            <div className="p-2 rounded-md border">
              <h2 className="w-full flex justify-center font-bold">
                {asignaciones.length === 0
                  ? "No hay asignaciones"
                  : "Asignaciones"}
              </h2>
              <h2 className="w-full bg-blue-400 text-md p-2 text-white flex justify-center font-bold">
                Docente --{">"} Materia
              </h2>
              {asignaciones.map((asignacion) => (
                // eslint-disable-next-line react/jsx-key
                <AsignacionRow id={asignacion.asignacionId} />
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-3 mx-3 mt-4 bg-white rounded-md border shadow-md p-2">
          <button className="bg-amber-500 hover:bg-amber-800 text-white rounded-md p-2 flex gap-1">
                    <img
                      src="src/assets/genHorarioIcon.svg"
                      alt="genHorario"
                      height={"28px"}
                      width={"28px"}
                    />
                    Generar Horario
                  </button>
          </div>
          <div className="flex justify-center gap-3 mx-3 mt-4 bg-white rounded-md border shadow-md p-2">
            <Horario />
          </div>
          <h1 className="pt-32">jksjj</h1>
        </div>
      </div>
    </>
  );
}

import SidePanel from "../Components/SidePanel";
import SelectGrupos from "../Components/SelectGrupos";
//import Horario from "../Components/Horario";
import { useState } from "react";
import MateriasBySemestreTable from "../Components/MateriasBySemestreTable";

export default function HomePage() {
  const [grupo, setGrupo] = useState(null);

  const handleSelect = (grupoSeleccionado) => {
    setGrupo(grupoSeleccionado);
    console.log(grupo);
  };

  return (
    <>
      <div className="flex pt-14">
        <SidePanel />
        <div className="flex-grow bg-gray-200">
          <div className="flex justify-between items-center ms-4 mt-4 bg-white  w-11/12 rounded-md border shadow-md p-2">
            <h1 className="text-2xl">Sistema de Control de horarios</h1>
            <form className="flex items-center space-x-2">
              <SelectGrupos handleSelect={handleSelect} />
              <button className="bg-amber-500 text-white rounded-md p-2 flex gap-1">
                <img
                  src="src/assets/genHorarioIcon.svg"
                  alt="delete"
                  height={"28px"}
                  width={"28px"}
                />
                Generar Horario
              </button>
            </form>
          </div>
          <div className="flex justify-between items-center ms-4 mt-4 bg-white w-11/12 rounded-md border shadow-md p-2">
            {grupo && (
              <div className="flex gap-4">
                <h2 className="font-bold">Grupo:</h2><h4>{grupo.grupo}</h4>
                <h2 className="font-bold">Turno:</h2><h4>{grupo.turno === "M" ? "Matutino" : grupo.turno === "V" ? "Vespertino" : grupo.turno}</h4>
                <h2 className="font-bold">Grupo:</h2><h4>{grupo.semestre.semestre}</h4>
              </div>
            )}
          </div>
          <div className="flex justify-between items-center ms-4 mt-4 bg-white w-11/12 rounded-md border shadow-md p-2">
            {grupo && (
              <div className="border p-3 rounded-md items-start flex justify-between w-full">
                <MateriasBySemestreTable semestre={grupo.semestre.semestreId} />
              </div>
            )}
          </div>

          {/* <div className="flex justify-between items-center ms-4 mt-4 bg-white  w-11/12 rounded-md border shadow-md p-2">
          <Horario />
        </div> */}
        </div>
      </div>
    </>
  );
}

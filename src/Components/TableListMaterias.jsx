import axios from "axios";
import { useEffect, useState } from "react";

export default function TableListMaterias() {
  const [materias, setMaterias] = useState([]);
  const [error, setError] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isEditMode, setIsEditMode] = useState(false); // Nuevo estado para el modo del modal
  // const [editData, setEditData] = useState({
  //   materiaId: "",
  //   clave: "",
  //   materia: "",
  //   horas: "",
  //   semestre: "",
  // });

  const axiosInstance = axios.create({
    baseURL: "http://localhost:8090/api/v1",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", // Esto no siempre es necesario, depende de tu backend
    },
    withCredentials: true, // Solo si necesitas enviar cookies
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/materias");
      setMaterias(response.data);
    } catch (err) {
      setError(err.message);
      console.log(error);
    }
  };

  const handleRowClick = (materia) => {
    setSelectedRow(materia);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredMaterias = materias.filter(
    (docente) =>
      docente.materia.toLowerCase().includes(searchTerm.toLowerCase()) ||
      docente.clave.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <>
      <div className="flex flex-col overflow-y-auto pt-2">
        <div className="flex flex-col w-11/12 m-auto">
          <form className="flex items-center justify-between ">
            <div className="flex w-2/3">
              <input
                type="text"
                placeholder="Buscar Docente"
                className="border-2 border-blue-500 rounded-md p-2 m-2 w-3/6 "
                onChange={handleSearchChange}
              />
            </div>
            <div className="flex">
              <button
                className="bg-blue-500 text-white rounded-md p-2 m-2 flex items-center"
                type="button"
              >
                <img
                  src="src/assets/editIcon.svg"
                  alt="delete"
                  height={"28px"}
                  width={"28px"}
                />
                Editar
              </button>
              <button
                className="bg-red-500 text-white rounded-md p-2 m-2 flex items-center"
                type="button"
              >
                <img
                  src="src/assets/deleteIcon.svg"
                  alt="delete"
                  height={"28px"}
                  width={"28px"}
                />
                Eliminar
              </button>
              <button
                type="button"
                className="bg-green-500 text-white rounded-md p-2 m-2 flex items-center"
              >
                <img
                  src="src/assets/addIcon.svg"
                  alt="delete"
                  height={"28px"}
                  width={"28px"}
                />
                Agregar
              </button>
            </div>
          </form>
        </div>
        <div className="flex m-auto w-11/12">
          <div className="h-100 w-full">
            <table className="table-auto bg-white rounded-md border-2 w-full">
              <thead className="bg-rose-500 border-3 border-slate-500 text-white">
                <tr>
                  <th className="px-4 py-2">semestre</th>
                  <th className="px-4 py-2">Materia</th>
                  <th className="px-4 py-2">clave</th>
                  <th className="px-4 py-2">horas</th>
                </tr>
              </thead>
              <tbody>
                {filteredMaterias.map((materia) => (
                  <tr
                    className={`hover:bg-rose-100 cursor-pointer ${
                      selectedRow === materia ? "bg-rose-300" : ""
                    }`}
                    key={materia.docenteId}
                    onClick={() => handleRowClick(materia)}
                  >
                    <td className="border px-4 py-1">
                      {materia.semestre.semestre}
                    </td>
                    <td className={`border px-4 py-1 `}>
                      {materia.materia}
                    </td>
                    <td className="border px-4 py-1">{materia.clave}</td>
                    <td className="border px-4 py-1">{materia.horas}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h1 className="pt-1 text-gray-100 ">holajhsjd</h1>
          </div>
        </div>
      </div>
    </>
  );
}

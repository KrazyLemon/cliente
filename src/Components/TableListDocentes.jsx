import axios from "axios";
import { useEffect, useState } from "react";
import EditDocenteModal from "./EditDocenteModal"; // Importa el nuevo componente del modal

export default function TableListDocentes() {
  const [docentes, setDocentes] = useState([]);
  const [error, setError] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // Nuevo estado para el modo del modal
  const [editData, setEditData] = useState({
    docenteId: "",
    nombre: "",
    apellidos: "",
    antiguedad: "",
    entrada: "",
    salida: "",
    horas: "",
    banderaId: "",
  });

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
      const response = await axiosInstance.get("/docentes");
      setDocentes(response.data);
    } catch (err) {
      setError(err.message);
      console.log(error);
    }
  };

  const getBanderaClass = (bandera) => {
    switch (bandera) {
      case "B0001":
        return "bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300";
      case "B0002":
        return "bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300";
      case "B0003":
        return "bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300";
      default:
        return "bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const handleRowClick = (docente) => {
    setSelectedRow(docente);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleEdit = () => {
    if (selectedRow) {
      setEditData({
        ...selectedRow,
        banderaId: selectedRow.bandera.banderaId,
      });
      setIsEditMode(true);
      setIsModalOpen(true);
    } else {
      alert("Por favor, selecciona un docente primero.");
    }
  };

  const handleDelete = () => {
    if (selectedRow) {
      const confirmDelete = window.confirm(
        `¿Deseas eliminar al docente : ${selectedRow.nombre} ${selectedRow.apellidos}?`
      );
      if (confirmDelete) {
        try {
          deleteData(selectedRow);
          setSelectedRow(null);
        } catch (err) {
          console.error("Hubo error en el Handle", err);
        }
      }
    } else {
      alert("Por favor, selecciona un docente primero.");
    }
  };

  const handleAdd = () => {
    setEditData({
      nombre: "",
      apellidos: "",
      antiguedad: "",
      entrada: "",
      salida: "",
      horas: "",
      banderaId: "",
    });
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleSubmit = () => {
    if (!isEditMode) {
      const newId = `D00${docentes.length + 1}`; // Genera un nuevo ID basado en el tamaño del array
      editData.docenteId = newId;
    }
    //console.log("Datos Guardados:", editData);
    
    postData(editData);
    setIsModalOpen(false);
  };

  const postData = async (editData) => {
    try {
      const response = await axiosInstance.post("/docentes", editData);
      console.log(response.data);
      fetchData();
    } catch (err) {
      setError(err.message);
      console.log(error);
    }
  };

  const deleteData = async (selectedRow) => {
    const id = selectedRow.docenteId;
    try {
      const response = await axiosInstance.delete(`/docentes/${id}`);
      fetchData();
      console.log(response.data);
    } catch (err) {
      console.error("Hubo error en el DeleteData", err.message);
    }
  };

  const filteredDocentes = docentes.filter(
    (docente) =>
      docente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      docente.apellidos.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-col overflow-y-auto pt-2">
        <div className="flex bg-white rounded-md shadow-md my-1 flex-col w-11/12 m-auto">
          <form className="flex items-center justify-between ">
            <div className="flex w-2/3">
              <input
                type="text"
                placeholder="Buscar Docente"
                value={searchTerm}
                onChange={handleSearchChange}
                className="border-2 border-gray-200 rounded-md p-2 m-2 w-3/6 "
              />
            </div>
            <div className="flex">
              <button
                className="bg-blue-500 hover:bg-blue-800 text-white rounded-md p-2 m-2 flex items-center"
                type="button"
                onClick={handleEdit}
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
                className="bg-red-500 hover:bg-red-800 text-white rounded-md p-2 m-2 flex items-center"
                type="button"
                onClick={handleDelete}
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
                className="bg-green-500 hover:bg-green-800 text-white rounded-md p-2 m-2 flex items-center"
                onClick={handleAdd}
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
              <thead className="bg-amber-500 border-3 border-slate-500 text-white">
                <tr>
                  <th className="px-4 py-2">Nombre</th>
                  <th className="px-4 py-2">Apellido</th>
                  <th className="px-4 py-2">Antiguedad</th>
                  <th className="px-4 py-2">Entrada</th>
                  <th className="px-4 py-2">Salida</th>
                  <th className="px-4 py-2">Horas</th>
                  <th className="px-4 py-2">Bandera</th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {filteredDocentes.map((docente) => (
                  <tr
                    className={`hover:bg-amber-100 cursor-pointer ${
                      selectedRow === docente ? "bg-amber-300" : ""
                    }`}
                    key={docente.docenteId}
                    onClick={() => handleRowClick(docente)}
                  >
                    <td className="border px-4 py-1">{docente.nombre}</td>
                    <td className="border px-4 py-1">{docente.apellidos}</td>
                    <td className="border px-4 py-1">{docente.antiguedad}</td>
                    <td className="border px-4 py-1">{docente.entrada}</td>
                    <td className="border px-4 py-1">{docente.salida}</td>
                    <td className="border px-4 py-1">{docente.horas}</td>
                    <td className="border px-4 py-1">
                      <span
                        className={`${getBanderaClass(
                          docente.bandera.banderaId
                        )}`}
                      >
                        {docente.bandera.bandera}
                      </span>
                    </td>
                    <td className="border px-3 py-1">
                      <a
                        href={`/docentes/detail?id=${docente.docenteId}`}
                        className="flex items-center justify-center hover:bg-amber-400 rounded-md p-1"
                      >
                        <img src="src\assets\openIcon.svg" alt="Ver mas" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h1 className="pt-1 text-gray-100 ">holajhsjd</h1>
          </div>
        </div>
        <EditDocenteModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          editData={editData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isEditMode={isEditMode} // Pasa el estado del modo del modal
        />
      </div>
    </>
  );
}


import Modal from "react-modal";

Modal.setAppElement("#root");

// eslint-disable-next-line react/prop-types
export default function EditDocenteModal({ isOpen, onRequestClose, editData, handleInputChange, handleSubmit, isEditMode }) {

  const validateForm = () => {
    // eslint-disable-next-line react/prop-types
    const { nombre, apellidos, antiguedad, entrada, salida, horas, banderaId } = editData;
    return nombre && apellidos && antiguedad && entrada && salida && horas && banderaId;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleSubmit();
    } else {
      alert("Por favor, complete todos los campos.");
    }
  };

  
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={isEditMode ? "Editar Docente" : "Agregar Docente"}
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h2 className="block text-gray-700 text-xl font-bold mb-2">{isEditMode ? "Editar Docente" : "Agregar Docente"}</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
            Nombre
          </label>
          <input
            type="text"
            name="nombre"
            // eslint-disable-next-line react/prop-types
            value={editData.nombre}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellidos">
            Apellidos
          </label>
          <input
            type="text"
            name="apellidos"
            // eslint-disable-next-line react/prop-types
            value={editData.apellidos}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="antiguedad">
            Antiguedad
          </label>
          <input
            type="date"
            name="antiguedad"
            // eslint-disable-next-line react/prop-types
            value={editData.antiguedad}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="entrada">
            Entrada
          </label>
          <input
            type="time"
            name="entrada"
            // eslint-disable-next-line react/prop-types
            value={editData.entrada}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="salida">
            Salida
          </label>
          <input
            type="time"
            name="salida"
            // eslint-disable-next-line react/prop-types
            value={editData.salida}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="horas">
            Horas
          </label>
          <input
            type="number"
            name="horas"
            // eslint-disable-next-line react/prop-types
            value={editData.horas}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="banderaId">
            Bandera
          </label>
          <select
            name="banderaId"
            // eslint-disable-next-line react/prop-types
            value={editData.banderaId}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="B0001">Definitividad</option>
            <option value="B0002">PTC</option>
            <option value="B0003">Materias</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {isEditMode ? "Guardar" : "Agregar"}
          </button>
          <button
            type="button"
            onClick={onRequestClose}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancelar
          </button>
        </div>
      </form>
    </Modal>
  );
}
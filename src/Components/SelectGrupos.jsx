import axios from "axios";
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
export default function SelectGrupos({ handleSelect }) {
  const [grupos, setGrupos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8090/api/v1/grupos");
        setGrupos(response.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <select
        className="border-2 border-gray-300 rounded-md p-2"
        onChange={(e) =>
          handleSelect(grupos.find((grupo) => grupo.grupoId === e.target.value))
        }
      >
        {grupos.map((grupo) => (
          <option key={grupo.grupoId} value={grupo.grupoId}>
            {grupo.grupo}
          </option>
        ))}
      </select>
    </>
  );
}

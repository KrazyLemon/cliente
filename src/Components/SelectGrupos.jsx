import axios from "axios";
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
export default function SelectGrupos({ handleSelect, disabled }) {
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

  const setColor = (disabled) => {
    return disabled ? "border-red-300" : "border-green-300";
  }

  return (
    <>
      <select
      disabled={disabled}
        className={`${setColor(disabled)} border-2 rounded-md p-2`}
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

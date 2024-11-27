import { useLocation } from "react-router-dom";
import SidePanel from "../Components/SidePanel";

export default function DocenteDetailPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const docenteId = queryParams.get("id");

  return (
    <div className="flex pt-14">
        <SidePanel />
        <div className="w-full h-screen bg-gray-200">
          <h1>Detalle del docente con id: {docenteId}</h1>
      </div>
    </div>
  );
}
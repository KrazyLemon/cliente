
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import DocentesPage from "./pages/DocentesPage";
import MateriasPage from "./pages/MateriasPage";
import NavBar from "./Components/NavBar";
import DocenteDetailPage from "./pages/DocenteDetailPage"; // Importa el nuevo componente
import GruposPage from "./pages/GruposPage";
import SalonesPage from "./pages/SalonesPage";

export default function AppRouter() {
    return (
        <>
            <Routes>
                <Route path="/" element={<NavBar />} >
                    <Route index element={<HomePage />} />
                    <Route path="/docentes" element={<DocentesPage />} />
                    <Route path="/docentes/detail" element={<DocenteDetailPage />} />
                    <Route path="/materias" element={<MateriasPage />} />
                    <Route path="/grupos" element={<GruposPage />} />
                    <Route path="/salones" element={<SalonesPage />} />
                    <Route path="*" element={<h1>Not Found</h1>} />
                </Route>
            </Routes>
        </>
    );
}
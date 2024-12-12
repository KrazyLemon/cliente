import axios from 'axios';

async function obtenerDatosDeAPI(id) {
    try {
        const response = await axios.get(`http://localhost:8090/api/v1/asignaciones/${id}`);
        return response.data; // Se asume que la API devuelve datos en JSON
    } catch (error) {
        console.error(`Error al obtener datos del ID ${id}:`, error.response?.status || error.message);
        throw error;
    }
}

async function obtenerHorarioDesdeAPI(docenteId) {
    try {
        const response = await axios.get(`http://localhost:9000/api/v2/hdocentes/${docenteId}`);
        return response.data.horario || []; // Se asume que el horario está en la propiedad "horario"
        // eslint-disable-next-line no-unused-vars
    } catch (error) {
        console.warn(`No se pudo obtener el horario para docenteId=${docenteId}. Asignando horario vacío.`);
        return Array(5).fill(null).map(() => Array(8).fill(null));; // Si falla la solicitud, retorna un arreglo vacío
    }
}

async function agregarAsignacion(jsonData, id) {
    try {
        // Obtener los datos desde la API
        const datos = await obtenerDatosDeAPI(id);

        if (!datos.docente.docenteId) {
            console.error(`El docente id no está presente en los datos obtenidos para el ID ${id}`);
            return;
        }

        // Obtener el horario del docente desde la API
        datos.horario = await obtenerHorarioDesdeAPI(datos.docenteId);

        // Crear la nueva asignación
        const nuevaAsignacion = {
            asignacion: String(datos.asignacionId),
            docente_id: String(datos.docente.docenteId),
            horas: String(datos.materia.horas),
            horario: datos.horario || [] // Si el horario no existe, asignar un arreglo vacío
        };

        // Agregar la nueva asignación al JSON
        jsonData.content.push(nuevaAsignacion);
    } catch (error) {
        console.error(`No se pudo agregar la asignación del ID ${id}:`, error.message);
    }
}

async function construirJSONConIDs(ids) {
    const jsonData = { content: [] };
    for (const id of ids) {
        await agregarAsignacion(jsonData, id.asignacionId); // Llamada asíncrona por cada ID
    }
    return jsonData;
}

function transponerMatriz(matriz) {
    return matriz[0].map((_, colIndex) => matriz.map(row => row[colIndex]));
}

export async function genHorarios(asignaciones) {
    console.log("Asignaciones:", asignaciones);
    const hgrupo = Array(5).fill(null).map(() => Array(8).fill(null)); //Horario de Grupo (5 días, 8 horas)
    try {
        const json = await construirJSONConIDs(asignaciones);
        // console.log("JSON completo:", JSON.stringify(json, null, 2));

        const row = Array(8).fill(null);
        let siExiste = true;

        for (const item of json.content) {

            const asignacion = item.asignacion;
            //const docenteId = item.docente_id;
            let horas = item.horas; //horas de materia
            const hp = item.horario; //horario de profesor
            let hd = 1; // horas diarias

            for (let j = 0; j < 5; j++) { // Recorremos el horario de Grupo empezando por días y luego horas
                hd = 1;
                for (let k = 0; k < 8; k++) {
                    if (horas > 0) {
                        if (hd < 3) {
                            if (j > 0) {
                                for (let l = 0; l < 8; l++) {
                                    if (row[l] !== null && row[l] === asignacion) {
                                        siExiste = false;
                                    }
                                }
                            }
                            if (siExiste) {
                                if (hp[j][k] === null && hgrupo[j][k] === null) {
                                    hgrupo[j][k] = asignacion;
                                    hp[j][k] = asignacion;
                                    horas -= 1;
                                    hd += 1;
                                }
                            } else {
                                if (j === 4) {
                                    if ((!hp[j][k] || hp[j][k] === "") && (!hgrupo[j][k] || hgrupo[j][k] === "")) {
                                        hgrupo[j][k] = asignacion;
                                        hp[j][k] = asignacion;
                                        horas -= 1;
                                        hd += 1;
                                    }
                                }
                                siExiste = true;
                            }
                        }
                    }
                }
                for (let k = 0; k < 8; k++) {
                    row[k] = hp[j][k];
                }
            }
        }
        const hgrupoTranspuesto = transponerMatriz(hgrupo);
        console.log("Horario de Grupo:");
        console.log(hgrupoTranspuesto);

    } catch (e) {
        console.error("Error al obtener datos de la API:", e.message);
    }



}

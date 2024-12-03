
export function genHorario() {
    const horario = [];
    const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']; 
    const horas = ['7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00','14:00'];
    for (let i = 0; i < horas.length; i++) {
        const row = [];
        row.push(horas[i]);
        for (let j = 0; j < dias.length; j++) {
            row.push('Materia');
        }
        horario.push(row);
    }
    return horario;
}
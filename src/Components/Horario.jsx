export default function Horario() {
  const horario = [
    {
      grupo_id: "G0001",
      horario: [
        {
          dia: "Lunes",
          horas: [
            {
              hora: "07:00",
              Asignacion_id: "A0001",
            },
            {
              hora: "08:00",
              Asignacion_id: "A0002",
            },
            {
              hora: "09:00",
              Asignacion_id: "A0003",
            },
            {
              hora: "10:00",
              Asignacion_id: "A0004",
            },
            {
              hora: "11:00",
              Asignacion_id: "A0005",
            },
            {
              hora: "12:00",
              Asignacion_id: "A0006",
            },
            {
              hora: "13:00",
              Asignacion_id: "A0007",
            },
            {
              hora: "14:00",
              Asignacion_id: "A0008",
            },
          ],
        },
        {
          dia: "Martes",
          horas: [
            {
              hora: "07:00",
              Asignacion_id: "A0001",
            },
            {
              hora: "08:00",
              Asignacion_id: "A0002",
            },
            {
              hora: "09:00",
              Asignacion_id: "A0003",
            },
            {
              hora: "10:00",
              Asignacion_id: "A0004",
            },
            {
              hora: "11:00",
              Asignacion_id: "A0005",
            },
            {
              hora: "12:00",
              Asignacion_id: "A0006",
            },
            {
              hora: "13:00",
              Asignacion_id: "A0007",
            },
            {
              hora: "14:00",
              Asignacion_id: "A0008",
            },
          ],
        },
        {
          dia: "Miercoles",
          horas: [
            {
              hora: "07:00",
              Asignacion_id: "A0001",
            },
            {
              hora: "08:00",
              Asignacion_id: "A0002",
            },
            {
              hora: "09:00",
              Asignacion_id: "A0003",
            },
            {
              hora: "10:00",
              Asignacion_id: "A0004",
            },
            {
              hora: "11:00",
              Asignacion_id: "A0005",
            },
            {
              hora: "12:00",
              Asignacion_id: "A0006",
            },
            {
              hora: "13:00",
              Asignacion_id: "A0007",
            },
            {
              hora: "14:00",
              Asignacion_id: "A0008",
            },
          ],
        },
        {
          dia: "Jueves",
          horas: [
            {
              hora: "07:00",
              Asignacion_id: "A0001",
            },
            {
              hora: "08:00",
              Asignacion_id: "A0002",
            },
            {
              hora: "09:00",
              Asignacion_id: "A0003",
            },
            {
              hora: "10:00",
              Asignacion_id: "A0004",
            },
            {
              hora: "11:00",
              Asignacion_id: "A0005",
            },
            {
              hora: "12:00",
              Asignacion_id: "A0006",
            },
            {
              hora: "13:00",
              Asignacion_id: "A0007",
            },
            {
              hora: "14:00",
              Asignacion_id: "A0008",
            },
          ],
        },
        {
          dia: "Viernes",
          horas: [
            {
              hora: "07:00",
              Asignacion_id: "A0001",
            },
            {
              hora: "08:00",
              Asignacion_id: "A0002",
            },
            {
              hora: "09:00",
              Asignacion_id: "A0003",
            },
            {
              hora: "10:00",
              Asignacion_id: "A0004",
            },
            {
              hora: "11:00",
              Asignacion_id: "A0005",
            },
            {
              hora: "12:00",
              Asignacion_id: "A0006",
            },
            {
              hora: "13:00",
              Asignacion_id: "A0007",
            },
            {
              hora: "14:00",
              Asignacion_id: "A0008",
            },
          ],
        },
      ],
    },
  ];

  return (
    <>
      <div className="flex m-auto w-11/12">
        <div className="h-96 w-full">
          <table className="table-auto bg-white rounded-md border-2 w-full">
            <thead>
              <tr className="bg-cyan-500 text-white">
                <th className="border px-2 py-1">Hora</th>
                <th className="border px-2 py-1">7:00</th>
                <th className="border px-2 py-1">8:00</th>
                <th className="border px-2 py-1">9:00</th>
                <th className="border px-2 py-1">10:00</th>
                <th className="border px-2 py-1">11:00</th>
                <th className="border px-2 py-1">12:00</th>
                <th className="border px-2 py-1">13:00</th>
                <th className="border px-2 py-1">14:00</th>
              </tr>
            </thead>
            <tbody>
              {horario[0].horario.map((dia) => {
                return (
                  <tr key={dia.dia}>
                    <td className="border px-2 py-1">{dia.dia}</td>
                    {dia.horas.map((hora) => {
                      return (
                        <td key={hora.hora} className="border px-2 py-1">
                          {hora.Asignacion_id}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

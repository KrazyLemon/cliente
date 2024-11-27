export default function SidePanel() {
  return (
    <>
      <div className="relative flex h-screen w-full max-w-[20rem] flex-col rounded-xl  p-4 border">
        <div className="p-4 mb-2"></div>
        <nav className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
          <a className="flex justify-between hover:bg-slate-200 rounded-md p-1" href="/">
            Horarios 
            <img src="src\assets\horarioIcon.svg" height={"30px"} width={"30px"}/>
          </a> 
          <a className="flex justify-between hover:bg-slate-200 rounded-md p-1" href="/docentes">
            Profesores 
            <img src="src\assets\teacherIcon.svg" height={"30px"} width={"30px"}/>
          </a> 
          <a className="flex justify-between hover:bg-slate-200 rounded-md p-1" href="/materias">
            Materias 
            <img src="src\assets\materiaIcon.svg" height={"30px"} width={"30px"}/>
          </a> 
          <a className="flex justify-between hover:bg-slate-200 rounded-md p-1" href="/grupos">
            Grupos 
            <img src="src\assets\groupIcon.svg" height={"30px"} width={"30px"}/>
          </a> 
          <a className="flex justify-between hover:bg-slate-200 rounded-md p-1" href="/salones">
            Salones 
            <img src="src\assets\roomIcon.svg" height={"30px"} width={"30px"}/>
          </a> 
        </nav>
      </div>
    </>
  );
}

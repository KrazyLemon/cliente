import { Outlet } from "react-router-dom";

export default function NavBar() {
  return (
    <>
       <nav className="flex fixed w-full z-10 justify-between p-2 items-center bg-pink-600 text-white  font-Raleway ">
        <a className="flex items-center gap-4" href="/"><img src="/logo.svg" height={"44px"} width={"44px"} alt=""/>Sistema de Control de Horarios</a>
          <a href="" className="flex items-center px-1 gap-1" >
            Angel Eduardo Velazquez Morales
            <img src="public\avatar.jpeg" alt="user_pic" className="w-11 h-11 rounded-full object-cover object-center" />
          </a>
       </nav>
      
      <Outlet />
    </>
  );
}

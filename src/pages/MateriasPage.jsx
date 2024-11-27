import TableListMaterias from "../Components/TableListMaterias";
import SidePanel from "../Components/SidePanel";

export default function MateriasPage() {
  return (
    <>
      <div className="flex pt-14">
        <SidePanel />
        <div className="w-full h-screen bg-gray-200">
            <TableListMaterias />
        </div>
      </div>
    </>
  );
}

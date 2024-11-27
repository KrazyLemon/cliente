import TableListDocentes from "../Components/TableListDocentes";
import SidePanel from "../Components/SidePanel";

export default function DocentesPage() {
  return (
    <>
      <div className="flex pt-14">
        <SidePanel />
        <div className="w-full h-screen bg-gray-200">
          <TableListDocentes />
        </div>
      </div>
    </>
  );
}

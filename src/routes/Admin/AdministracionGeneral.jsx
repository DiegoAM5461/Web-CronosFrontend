import { MainContentAdmin } from "../../components/MainContentAdmin/MainContentAdmin";
import { Sidebar } from "../../components/Sidebar/Sidebar";

export const AdministracionGeneral = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          {/* Sidebar */}
          <Sidebar />
          {/* Contenido */}
          <MainContentAdmin />
        </div>
      </div>
    </>
  );
};

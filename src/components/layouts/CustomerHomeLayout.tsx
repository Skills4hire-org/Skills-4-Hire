import { Outlet } from "react-router-dom";
import DesktopHomeHeader from "../header/DesktopHomeHeader";
import Container from "../global/Container";
import CustomerHomeNavbar from "../navbars/CustomerHomeNavbar";
import CustomerRightSidebar from "../sidebars/CustomerRightSidebar";

export default function CustomerHomeLayout() {
  return (
    <>
      <Container className="bg-white">
        <DesktopHomeHeader />
      </Container>
      <CustomerHomeNavbar />
      <Container>
        <div className="flex">
          <main className="lg:w-[65%] max-w-4xl py-8 px-4">
            <Outlet />
          </main>

          {/* Right Sidebar */}
          <aside className="hidden lg:block lg:w-[30%] lg:ml-8">
            <CustomerRightSidebar />
          </aside>
        </div>
      </Container>
    </>
  );
}

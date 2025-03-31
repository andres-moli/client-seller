import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { Outlet, useLocation, useNavigate } from "react-router";
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";
import AppSidebar from "./AppSidebar";
import { useValidateUserTokenQuery } from "../domain/graphql";
import Cookies from 'js-cookie'

const LayoutContent: React.FC = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  return (
    <div className="min-h-screen xl:flex">
      <div>
        <AppSidebar />
        <Backdrop />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
        } ${isMobileOpen ? "ml-0" : ""}`}
      >
        <AppHeader />
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const AppLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { loading } = useValidateUserTokenQuery({
    variables: {
      validateTokenInput: {
        token: Cookies.get(import.meta.env.VITE_APP_KEY_COOKIE_SESSION) ?? "",
      },
    },
    onError: (error) => {
      console.log("error", error);
      navigate("/signin");
    },
    fetchPolicy: "network-only",
  });

  if (loading)
    return (
      <div className="h-screen w-screen flex justify-center items-center flex-col">
        <img src="/loading.svg" alt="" />
        <span>Cargando recursos</span>
      </div>
    );

  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
};

export default AppLayout;

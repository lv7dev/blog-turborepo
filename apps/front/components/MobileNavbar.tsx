import { PropsWithChildren } from "react";
import { Bars3Icon } from "@heroicons/react/16/solid";
import { Sidebar, SidebarProvider, SidebarTrigger } from "./ui/sidebar";

type Props = PropsWithChildren;
const MobileNavbar = (props: Props) => {
  return (
    <div className="md:hidden">
      <SidebarProvider className="absolute top-2 left-2">
        <SidebarTrigger>
          <Bars3Icon />
        </SidebarTrigger>
        <Sidebar>{props.children}</Sidebar>
      </SidebarProvider>
    </div>
  );
};

export default MobileNavbar;

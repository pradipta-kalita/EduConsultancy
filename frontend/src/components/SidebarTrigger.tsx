import { useSidebar } from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import {ChevronLeftIcon, ChevronRightIcon} from 'lucide-react'

export const SidebarTrigger = () => {
  const { toggleSidebar,open } = useSidebar();

  return (
    <Button onClick={toggleSidebar} variant={'ghost'} className="border bg-white">
      {open?<ChevronLeftIcon className="h-4 w-4"/>:<ChevronRightIcon className="h-4 w-4"/>}
    </Button>
  );
};

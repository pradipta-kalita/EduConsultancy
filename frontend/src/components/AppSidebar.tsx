import { 
  Sidebar,
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarHeader,
  SidebarFooter ,
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  useSidebar } from "./ui/sidebar";
  import {
  LayoutDashboard,
  Home,
  CircleUserRound,
  LogOut,
  SquarePen,
  Tag,
  GraduationCap,
  Folder,
  MessageCircle,
  Phone,
  School2,
    Wallet
} from "lucide-react";
import { Link,useNavigate } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { useAuth } from "@/auth/authContext";

const sidebarData = [
  {
    label: "",
    items: [
      { to: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
      { to: "/profile", icon: CircleUserRound, label: "Profile" },
      { to: "/", icon: Home, label: "Home" },
      {
        to: "/admin/payments",
        icon: Wallet,
        label: "Payments",
      }
    ],
  },
  {
    label: "Blogs",
    items: [
      { to: "/admin/blogs", icon: SquarePen, label: "Posts" },
      { to: "/admin/tags", icon: Tag, label: "Tags" },
    ],
  },
  {
    label: "Courses",
    items: [
      { to: "/admin/courses", icon: GraduationCap, label: "Courses" },
      { to: "/admin/categories", icon: Folder, label: "Categories" },
    ],
  },
  {
    label: "User Insights",
    items: [
      { to: "/admin/feedback", icon: MessageCircle, label: "Feedbacks" }, // Feedback details
      { to: "/admin/contact-us", icon: Phone, label: "Contact Us" }, // Contact us details
    ],
  },
];

export default function AppSidebar() {
  const {logout} = useAuth();
  const { open } = useSidebar();

  return (
    <Sidebar collapsible={"icon"}>
      {/* Sidebar Header */}
      <SidebarHeader className="p-4 flex items-center justify-between bg-gradient-to-b from-gray-50 via-gray-100 to-gray-50">
      <h1 className="text-xl text-gray-800 font-bold flex items-center space-x-2">
        <span className="inline-block align-middle">
          <School2 className="h-4 w-4" /></span>
        {open ? <span>EduConsultancy</span>:null}
      </h1>

        {/* Optional collapsible toggle button */}
        <button
          className="text-gray-400 hover:text-white"
          aria-label="Toggle Sidebar"
        >
          {/* Add a toggle icon here */}
        </button>
      </SidebarHeader>

      {/* Sidebar Content */}
      <SidebarContent className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50 via-gray-100 to-gray-50">
        {
          sidebarData.map(group=>{
            return (
              <SidebarGroup key={group.label}>
                <SidebarGroupLabel className="px-4 py-2 text-gray-500 text-sm">
                      {group.label}
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map((route) => (
                      <SidebarMenuItem key={route.to}>
                        <SidebarMenuButton
                          asChild
                          className="flex items-center text-base font-medium gap-3 text-gray-800 bg-transparent hover:bg-gray-200 hover:text-gray-900 p-2 rounded-md transition-all duration-300 ease-in-out"
                        >
                          <Link
                            to={route.to}
                            activeProps={{
                              className: "bg-gray-100 font-bold",
                            }}
                            className="flex items-center space-x-2 p-5 rounded"
                          >
                            <route.icon className="h-5 w-5" />
                            <span>{route.label}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            )
          })
        }
      </SidebarContent>

      {/* Sidebar Footer */}
      <SidebarFooter className="sticky bg-gradient-to-b from-gray-50 via-gray-100 to-gray-50">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="flex items-center hover:bg-gray-200 gap-3">
              <Button onClick={()=>{
                  logout()
                  navigate({to:"/"});
                  }
              }variant={'ghost'} className="p-5 text-gray-800 text-md border border-gray-300">
                <LogOut className="h-4 w-4"/>
                {open?`Sign out`:""}
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

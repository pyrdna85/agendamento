import { NavLink, useLocation } from "react-router-dom"
import {
  Calendar,
  Users,
  BookOpen,
  MapPin,
  Settings,
  LayoutDashboard,
  Plus,
  List,
  GraduationCap
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

interface AppSidebarProps {
  userRole: 'admin' | 'user'
}

const adminItems = [
  { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
  { title: "Professores", url: "/admin/professores", icon: Users },
  { title: "Matérias", url: "/admin/materias", icon: BookOpen },
  { title: "Salas", url: "/admin/salas", icon: MapPin },
  { title: "Equipamentos", url: "/admin/equipamentos", icon: Settings },
  { title: "Agendamentos", url: "/admin/agendamentos", icon: Calendar },
]

const userItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Meus Agendamentos", url: "/agendamentos", icon: List },
  { title: "Novo Agendamento", url: "/novo-agendamento", icon: Plus },
]

export function AppSidebar({ userRole }: AppSidebarProps) {
  const location = useLocation()
  const currentPath = location.pathname

  const items = userRole === 'admin' ? adminItems : userItems
  const isActive = (path: string) => currentPath === path

  const getNavClass = (itemUrl: string) => {
    const active = isActive(itemUrl)
    return `w-full justify-start transition-smooth ${
      active 
        ? "bg-primary text-primary-foreground shadow-md" 
        : "hover:bg-muted/60 text-muted-foreground hover:text-foreground"
    }`
  }

  return (
    <Sidebar className="border-r">
      <SidebarContent className="bg-gradient-card">
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-sm">EduSchedule</h2>
              <p className="text-xs text-muted-foreground">
                {userRole === 'admin' ? 'Administrador' : 'Professor'}
              </p>
            </div>
          </div>
        </div>

        <SidebarGroup className="px-2">
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground px-2 py-2">
            {userRole === 'admin' ? 'Administração' : 'Menu Principal'}
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClass(item.url)}>
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      <span className="ml-3">{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
import { Link, useRouteContext } from '@tanstack/react-router'

import { Home, ListTree } from 'lucide-react'
import { Logo } from '~/shared/ui/logo'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '~/shared/ui/sidebar'
import { NavUser } from './nav-user'

const items = [
  {
    title: 'Подписки',
    url: '/dashboard',
    icon: Home,
  },
  {
    title: 'Категории',
    url: '/dashboard/categories',
    icon: ListTree,
  },
]

export function AppSidebar() {
  const { user } = useRouteContext({
    from: '/dashboard',
  })

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarHeader>
            <Logo />
          </SidebarHeader>

          <SidebarGroupContent className="mt-4">
            <SidebarMenu>
              {items.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.url}
                      activeProps={{
                        className: 'bg-sidebar-accent text-sidebar-accent-foreground',
                      }}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user!} />
      </SidebarFooter>

      {/* <SidebarRail /> */}
    </Sidebar>
  )
}

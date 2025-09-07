import { Link, useRouteContext } from '@tanstack/react-router'

import { ChevronRight, Home, ListTree } from 'lucide-react'
import { useActiveCategoriesQuery } from '~/shared/api'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '~/shared/ui/collapsible'
import { Logo } from '~/shared/ui/logo'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '~/shared/ui/sidebar'
import { NavUser } from './nav-user'

export function AppSidebar() {
  const { user } = useRouteContext({
    from: '/dashboard',
  })

  const { data: categories } = useActiveCategoriesQuery()

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
      items: categories?.payload.map(category => ({
        title: category.name,
        url: `/dashboard/categories/${category.id}`,
      })),
    },
  ]

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarHeader>
            <Logo />
          </SidebarHeader>

          <SidebarGroupContent className="mt-4">
            <SidebarMenu>
              {/* {items.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.url}
                      activeOptions={{
                        exact: true,
                      }}
                      activeProps={{
                        className: 'bg-sidebar-accent text-sidebar-accent-foreground',
                      }}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                  {item.items?.length
                    ? (
                        <SidebarMenuSub>
                          {item.items.map(item => (
                            <SidebarMenuSubItem key={item.title}>
                              <SidebarMenuSubButton asChild>
                                <Link
                                  to={item.url}
                                  activeOptions={{ exact: true }}
                                  activeProps={{
                                    className: 'bg-sidebar-accent text-sidebar-accent-foreground',
                                  }}
                                >
                                  {item.title}
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      )
                    : null}
                </SidebarMenuItem>
              ))} */}

              {items.map(item => (
                <Collapsible key={item.title} asChild defaultOpen={true}>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <Link
                        to={item.url}
                        activeOptions={{
                          exact: true,
                        }}
                        activeProps={{
                          className: 'bg-sidebar-accent text-sidebar-accent-foreground',
                        }}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                    {item.items?.length
                      ? (
                          <>
                            <CollapsibleTrigger asChild>
                              <SidebarMenuAction className={`
                                data-[state=open]:rotate-90
                              `}
                              >
                                <ChevronRight />
                                <span className="sr-only">Toggle</span>
                              </SidebarMenuAction>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                              <SidebarMenuSub>
                                {item.items?.map(subItem => (
                                  <SidebarMenuSubItem key={subItem.title}>
                                    <SidebarMenuSubButton asChild>
                                      <Link
                                        to={subItem.url}
                                        activeOptions={{ exact: true }}
                                        activeProps={{
                                          className: 'bg-sidebar-accent text-sidebar-accent-foreground',
                                        }}
                                      >
                                        {subItem.title}
                                      </Link>
                                    </SidebarMenuSubButton>
                                  </SidebarMenuSubItem>
                                ))}
                              </SidebarMenuSub>
                            </CollapsibleContent>
                          </>
                        )
                      : null}
                  </SidebarMenuItem>
                </Collapsible>
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

import type { IUser } from '~/shared/types'
import { useQueryClient } from '@tanstack/react-query'

import { useNavigate } from '@tanstack/react-router'
import {
  BadgeCheck,
  ChevronsUpDown,
  LogOut,
} from 'lucide-react'
import {
  Avatar,
  AvatarFallback,
} from '~/shared/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/shared/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '~/shared/ui/sidebar'

export function NavUser({
  user,
}: { user: IUser }) {
  const { isMobile } = useSidebar()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  function handleLogout() {
    localStorage.removeItem('token')
    queryClient.resetQueries()
    navigate({
      to: '/',
    })
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className={`
                data-[state=open]:bg-sidebar-accent
                data-[state=open]:text-sidebar-accent-foreground
              `}
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarFallback className="rounded-lg">{user.username.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.username}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className={`
              w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg
            `}
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className={`
                flex items-center gap-2 px-1 py-1.5 text-left text-sm
              `}
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarFallback className="rounded-lg">{user.username.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="flex items-center gap-2 truncate font-medium">
                    {user.username}
                    {' '}
                    {user.is_active && <BadgeCheck className="size-4" />}
                  </span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={handleLogout}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

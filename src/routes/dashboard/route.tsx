import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { SidebarProvider } from '~/shared/ui/sidebar'
import { AppSidebar } from '~/widgets/app-sidebar'

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
  ssr: false,
  beforeLoad: ({ context }) => {
    if (!context.user) {
      throw redirect({
        to: '/auth/signin',
      })
    }
  },
})

function RouteComponent() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full p-5">
        <Outlet />
      </main>
    </SidebarProvider>
  )
}

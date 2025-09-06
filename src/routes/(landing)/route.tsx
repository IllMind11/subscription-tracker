import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Navbar } from '~/widgets/navbar/navbar'

export const Route = createFileRoute('/(landing)')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

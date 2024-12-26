import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_admin/admin/tags/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_admin/admin/tags/edit"!</div>
}

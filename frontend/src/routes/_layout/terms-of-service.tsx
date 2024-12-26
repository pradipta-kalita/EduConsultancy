import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/terms-of-service')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/terms-of-service"!</div>
}

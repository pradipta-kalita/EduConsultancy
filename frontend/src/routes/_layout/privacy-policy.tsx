import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/privacy-policy')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/privacy-policy"!</div>
}
